import {Model} from '../src';

const payload = {
  'id': '123',
  'author': {
    'id': '1',
    'name': 'Paul'
  },
  'title': 'My awesome blog post',
  'comments': [
    {
      'id': '324',
      'commenter': {
        'id': '2',
        'name': 'Nicole'
      }
    }
  ]
};

describe('Model with nested models', () => {
  let userModel;
  let commentModel;
  let articleModel;

  beforeAll(() => {
    userModel = new Model({
      namespace: 'users',
      scopes: [],
      fields: {},
    });

    commentModel = new Model({
      namespace: 'comments',
      scopes: [],
      fields: {
        commenter: userModel
      },
    });

    articleModel = new Model({
      namespace: 'articles',
      scopes: ['byPage'],
      fields: {
        author: userModel,
        comments: [commentModel]
      },
    });
  });

  describe('selectors', () => {
    let reducedData;

    beforeAll(() => {
      const action = articleModel.actions().set('byPage', 1, [payload]);
      reducedData = articleModel.reducers()({}, action);
    });

    it('returns expected article for defaultScope.providedId when using the articleModel', () => {
      const byPageArticleSelector = articleModel.selectors(articleModel.defaultScope, payload.id);
      expect(byPageArticleSelector(reducedData)).toEqual(payload);
    });

    it('returns expected comment for defaultScope.providedId when using the commentModel', () => {
      const byPageCommentSelector = commentModel.selectors(commentModel.defaultScope, payload.comments[0].id);
      expect(byPageCommentSelector(reducedData)).toEqual(payload.comments[0]);
    });

    it('returns expected user for defaultScope.providedId when using the userModel', () => {
      const byPageUserSelector = userModel.selectors(userModel.defaultScope, payload.comments[0].commenter.id);
      expect(byPageUserSelector(reducedData)).toEqual(payload.comments[0].commenter);
    });
  });

  describe('reducers', () => {
    it('set action sets the normalized nested data in the respective scopes', () => {
      const action = articleModel.actions().set(articleModel.defaultScope, payload.id, [payload]);
      const reducedData = articleModel.reducers()({}, action);
      expect(reducedData).toEqual({
        [articleModel.namespace]: {
          [articleModel.defaultScope]: {
            123: {
              id: '123',
              author: '1',
              title: 'My awesome blog post',
              comments: ['324']
            }
          }
        },
        [userModel.namespace]: {
          [userModel.defaultScope]: {
            1: {'id': '1', 'name': 'Paul'},
            2: {'id': '2', 'name': 'Nicole'}
          }
        },
        [commentModel.namespace]: {
          [commentModel.defaultScope]: {
            324: {id: '324', 'commenter': '2'}
          }
        }
      });
    });
  });
});
