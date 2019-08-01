import {Data, Model} from '../src';

const page1Payload = {
  'id': '123',
  'title': 'My awesome blog post',
};

const page2Payload = {
  'id': '321',
  'title': 'My other blog post',
};

const customScope = 'byPage';

describe('Data', () => {
  let articleModel;
  let actions;
  let reducers;
  let dispatch;
  let data;
  let scopeId;

  beforeAll(() => {
    articleModel = new Model({
      namespace: 'articles',
      scopes: [customScope],
      fields: {},
      views: {
        asOption: article => ({
          value: article.id, label: `${article.id}. ${article.title}`, disabled: article.disabled || false,
        }),
      },
      controllers: {
        disable: article => { article.disabled = true },
      },
    });
    actions = articleModel.actions();
    reducers = articleModel.reducers();
  });

  beforeEach(() => {
    dispatch = jest.fn();
    scopeId = page1Payload.id;
    const action = actions.set(customScope, scopeId, [page1Payload, page2Payload]);
    const reducedData = reducers({}, action);
    const byPageArticleSelector = articleModel.selectors(articleModel.defaultScope, page1Payload.id);
    data = new Data(dispatch, articleModel, byPageArticleSelector(reducedData), customScope, scopeId);
  });

  describe('data is accessible via proxy', () => {
    it('with id value', () => {
      expect(data.id).toEqual(page1Payload.id);
    });

    it('with title value', () => {
      expect(data.title).toEqual(page1Payload.title);
    });
  });

  describe('views', () => {
    it('asOption returns value, label and disabled defaulting as false', () => {
      expect(data.asOption()).toEqual({
        disabled: false,
        label: "123. My awesome blog post",
        value: "123"
      });
    });
  });

  describe('controllers', () => {
    it('disable triggered a set action with a disabled flag', () => {
      data.disable();
      expect(dispatch).toHaveBeenCalledWith({
        payload: [{
          disabled: true,
          ...page1Payload,
        }],
        scope: customScope,
        scopeId,
        type: articleModel.actionTypes().set
      });
    });
  });
});
