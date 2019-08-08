import {Model} from '../src';

const page1Payload = {
  'id': '123',
  'title': 'My awesome blog post',
};

const page2Payload = {
  'id': '321',
  'title': 'My other blog post',
};

const customScope = 'byPage';

describe('Model', () => {
  let articleModel;
  let actions;
  let reducers;

  beforeAll(() => {
    articleModel = new Model({
      namespace: 'articles',
      scopes: [customScope],
      fields: {},
    });

    actions = articleModel.actions();
    reducers = articleModel.reducers();
  });

  describe('defaultScope', () => {
    it('returns byId by default', () => {
      expect(articleModel.defaultScope).toEqual('byId');
    });

    it('can be set to a custom value when constructing a model', () => {
      const customArticleModel = new Model({
        namespace: 'articles',
        scopes: [customScope],
        fields: {},
        defaultScope: 'byWhatever'
      });

      expect(customArticleModel.defaultScope).toEqual('byWhatever');
    });
  });

  describe('defaultScopeIdField', () => {
    it('returns id by default', () => {
      expect(articleModel.defaultScopeIdField).toEqual('id');
    });

    it('can be set to a custom value when constructing a model', () => {
      const customArticleModel = new Model({
        namespace: 'articles',
        scopes: [customScope],
        fields: {},
        defaultScopeIdField: 'title'
      });

      expect(customArticleModel.defaultScopeIdField).toEqual('title');
    });
  });

  describe('constructor', () => {
    it('throws for non object, array or Model fields', () => {
      expect(() => new Model({
        namespace: 'articles',
        scopes: [customScope],
        fields: {
          randomField: 7
        }
      })).toThrow();
    });
  });

  it('actionTypes returns the three basic actions with the namespace', () => {
    expect(articleModel.actionTypes()).toEqual({
      clear: `${articleModel.namespace}.clear`,
      remove: `${articleModel.namespace}.remove`,
      set: `${articleModel.namespace}.set`,
    });
  });

  describe('actions', () => {
    const scopeId = 1;

    describe('set action', () => {
      it('throws for unexistent scope', () => {
        expect(() => actions.remove('byWhatever', scopeId, [page1Payload])).toThrow();
      });

      it('generates an action with expected content', () => {
        expect(actions.set(customScope, scopeId, [page1Payload])).toEqual({
          payload: [page1Payload],
          scope: customScope,
          scopeId,
          type: articleModel.actionTypes().set
        });
      });
    });

    describe('clear action', () => {
      it('throws for unexistent scope', () => {
        expect(() => actions.clear('byWhatever')).toThrow();
      });

      it('generates an action with expected content', () => {
        expect(actions.clear(customScope)).toEqual({
          scope: customScope,
          type: articleModel.actionTypes().clear
        });
      });
    });

    describe('remove action', () => {
      it('throws for unexistent scope', () => {
        expect(() => actions.remove('byWhatever', 1)).toThrow();
      });

      it('generates an action with expected content', () => {
        expect(actions.remove(customScope, scopeId)).toEqual({
          scope: customScope,
          scopeId,
          type: articleModel.actionTypes().remove
        });
      });
    });
  });

  describe('selectors', () => {
    let reducedData;

    beforeAll(() => {
      const byPage1Action = actions.set(customScope, 1, [page1Payload]);
      const byPage2Action = actions.set(customScope, 2, [page2Payload]);
      reducedData = reducers({}, byPage1Action);
      reducedData = reducers(reducedData, byPage2Action);
    });

    it('returns list with page1Payload for customScope.1', () => {
      const byPageSelector = articleModel.selectors(customScope, 1);
      expect(byPageSelector(reducedData)).toEqual([page1Payload]);
    });

    it('returns list with page2Payload for customScope.2', () => {
      const byPageSelector = articleModel.selectors(customScope, 2);
      expect(byPageSelector(reducedData)).toEqual([page2Payload]);
    });

    it('returns undefined for unexistent custom scope', () => {
      const byPageSelector = articleModel.selectors(customScope, 3);
      expect(byPageSelector(reducedData)).not.toBeDefined();
    });

    it('returns page1Payload for default scope with page1Payload id', () => {
      const byIdSelector = articleModel.selectors(articleModel.defaultScope, page1Payload.id);
      expect(byIdSelector(reducedData)).toEqual(page1Payload);
    });

    it('returns page2Payload for default scope with page2Payload id', () => {
      const byIdSelector = articleModel.selectors(articleModel.defaultScope, page2Payload.id);
      expect(byIdSelector(reducedData)).toEqual(page2Payload);
    });

    it('returns undefined for unexistent id in default scope', () => {
      const byIdSelector = articleModel.selectors(articleModel.defaultScope, 1000000000);
      expect(byIdSelector(reducedData)).not.toBeDefined();
    });
  });

  describe('reducers', () => {
    describe('set action', () => {
      it('throws for unexistent scope', () => {
        expect(() => actions.set('byWhatever', 1, [page1Payload])).toThrow();
      });

      it('sets same state for unknown action', () => {
        const state = 'state';
        const reducedData = reducers(state, {type: 'blah'});
        expect(reducedData).toEqual(state);
      });

      it('sets the normalized data on customScope.1 scope', () => {
        const action = actions.set(customScope, 1, [page1Payload]);
        const reducedData = reducers({}, action);
        expect(reducedData).toEqual({
          [articleModel.namespace]: {
            [articleModel.defaultScope]: {
              [page1Payload.id]: page1Payload
            },
            [customScope]: {
              1: [page1Payload.id]
            }
          }
        });
      });

      it('sets the normalized data on byId.page1Payload scope', () => {
        const action = actions.set('byId', page1Payload.id, [page1Payload]);
        const reducedData = reducers({}, action);
        expect(reducedData).toEqual({
          [articleModel.namespace]: {
            [articleModel.defaultScope]: {
              [page1Payload.id]: page1Payload
            },
          }
        });
      });
    });

    describe('clear action', () => {
      it('throws for unexistent scope', () => {
        expect(() => actions.clear('byWhatever', 1, [page1Payload])).toThrow();
      });

      it('clears customScope scope', () => {
        const setAction = actions.set(customScope, 1, [page1Payload]);
        const clearAction = actions.clear(customScope);
        const reducedSetData = reducers({}, setAction);
        const reducedClearData = reducers(reducedSetData, clearAction);

        expect(reducedClearData).toEqual({
          [articleModel.namespace]: {
            [articleModel.defaultScope]: {
              [page1Payload.id]: page1Payload
            },
            [customScope]: {}
          },
        });
      });

      it('clears byId scope', () => {
        const setAction = actions.set('byId', 1, [page1Payload]);
        const clearAction = actions.clear(customScope);
        const reducedSetData = reducers({}, setAction);
        const reducedClearData = reducers(reducedSetData, clearAction);

        expect(reducedClearData).toEqual({
          [articleModel.namespace]: {
            [articleModel.defaultScope]: {
              [page1Payload.id]: page1Payload
            },
            [customScope]: {}
          },
        });
      });
    });

    describe('remove action', () => {
      it('throws for unexistent scope', () => {
        expect(() => actions.remove('byWhatever', 1, [page1Payload])).toThrow();
      });

      it('removes customScope.1 scope', () => {
        const setAction = actions.set(customScope, 1, [page1Payload]);
        const clearAction = actions.remove(customScope, 1);
        const reducedSetData = reducers({}, setAction);
        const reducedClearData = reducers(reducedSetData, clearAction);

        expect(reducedClearData).toEqual({
          [articleModel.namespace]: {
            [articleModel.defaultScope]: {
              [page1Payload.id]: page1Payload
            },
            [customScope]: {}
          },
        });
      });

      it('removes byId.page1Payload scope', () => {
        const setAction = actions.set('byId', page1Payload.id, [page1Payload]);
        const clearAction = actions.remove('byId', page1Payload.id);
        const reducedSetData = reducers({}, setAction);
        const reducedClearData = reducers(reducedSetData, clearAction);

        expect(reducedClearData).toEqual({
          [articleModel.namespace]: {
            [articleModel.defaultScope]: {},
          },
        });
      });
    });
  });
});
