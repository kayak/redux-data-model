import * as allSagaEffects from "redux-saga/effects";
import {Model} from '../src';
import {sagaEffects} from '../src/model';

describe('Model', () => {
  let modelOptions;
  let articleModel;

  beforeAll(() => {
    modelOptions = {
      namespace: 'articles',
      state: {},
    };
    articleModel = new Model(modelOptions);
  });

  describe('constructor', () => {
    it('throws when namespace is not a string', () => {
      expect(() => new Model({
        ...modelOptions,
        namespace: [],
      })).toThrow({
        name: '',
        message: 'Namespace must be a string. The provided namespace type was: object'
      });
    });

    it('throws when namespace is empty', () => {
      expect(() => new Model({
        ...modelOptions,
        namespace: '',
      })).toThrow({
        name: '',
        message: 'Namespace must be a non empty string.'
      });
    });

    describe('throws when namespace is invalid', () => {
      const invalidNamespaceError = {
        name: '',
        message: 'Namespace can only contain letters, numbers and/or dots, when nesting the data is needed. ' +
        'It was validated against the following regex: /^([A-Za-z0-9]+)([.][A-Za-z0-9]+)*$/'
      };
      it('like when it starts with a dot', () => {
        expect(() => new Model({
          ...modelOptions,
          namespace: '.ola',
        })).toThrow(invalidNamespaceError);
      });

      it('like when it ends with a dot', () => {
        expect(() => new Model({
          ...modelOptions,
          namespace: 'ola.',
        })).toThrow(invalidNamespaceError);
      });

      it('like when it starts and ends with a dot', () => {
        expect(() => new Model({
          ...modelOptions,
          namespace: '.ola.',
        })).toThrow(invalidNamespaceError);
      });

      it('like when it has following dots', () => {
        expect(() => new Model({
          ...modelOptions,
          namespace: 'ola..ola',
        })).toThrow(invalidNamespaceError);
      });
    });


    it('throws when a reducer and effect have the same action type', () => {
      expect(() => new Model({
        ...modelOptions,
        reducers: {
          whatever: jest.fn(),
        },
        effects: {
          whatever: jest.fn(),
        },
      })).toThrow({
        name: '',
        message: 'Reducer and effect action types must be unique in [articles] model. ' +
        'The provided reducer/effect action types were: whatever, whatever'
      });
    });
  });

  describe('namespace', () => {
    it('returns the namespace', () => {
      expect(articleModel.namespace).toEqual(modelOptions.namespace);
    });
  });

  describe('state', () => {
    it('returns the state', () => {
      expect(articleModel.state).toEqual(modelOptions.state);
    });
  });

  describe('selectors', () => {
    it('returns an empty object when none is available', () => {
      expect(articleModel.selectors).toEqual({});
    });

    it('returns the selectors', () => {
      const modelOptionsWithSelectors = {...modelOptions, selectors: {}};
      const model = new Model(modelOptionsWithSelectors);
      expect(model.selectors).toEqual(modelOptionsWithSelectors.selectors);
    });
  });

  describe('reducers', () => {
    it('returns an empty object when none is available', () => {
      expect(articleModel.state).toEqual({});
    });

    it('returns the reducers', () => {
      const modelOptionsWithReducers = {...modelOptions, reducers: {}};
      const model = new Model(modelOptionsWithReducers);
      expect(model.reducers).toEqual(modelOptionsWithReducers.reducers);
    });
  });

  describe('effects', () => {
    it('returns an empty object when none is available', () => {
      expect(articleModel.effects).toEqual({});
    });

    it('returns the effects', () => {
      const modelOptionsWithEffects = {...modelOptions, effects: {}};
      const model = new Model(modelOptionsWithEffects);
      expect(model.effects).toEqual(modelOptionsWithEffects.effects);
    });
  });

  it('actionType returns the actionName with the namespace', () => {
    expect(articleModel.actionType('ola')).toEqual(`${articleModel.namespace}.ola`);
  });

  describe('actionCreator', () => {
    it('returns an object with type, payload and __actionInternals', () => {
      const payload = {1: 2};
      const __actionInternals = {};
      expect(articleModel.actionCreator('ola', payload, __actionInternals)).toEqual(
        {type: articleModel.actionType('ola'), payload, __actionInternals}
      );
    });

    it('returns an object with the right type even when payload defines type too', () => {
      const payload = {type: 2, 1: 2};
      const __actionInternals = {};
      expect(articleModel.actionCreator('ola', payload, __actionInternals)).toEqual(
        {type: articleModel.actionType('ola'), payload, __actionInternals}
      );
    });

    it('throws when action data is not a plain obeject', () => {
      expect(() => articleModel.actionCreator('ola', [])).toThrow({
        name: '',
        message: 'Action data must be a plain object, when calling action [ola] in [articles] model.'
      });
    });
  });

  describe('actionCreators', () => {
    it('returns an empty object when no reducers or effects exists', () => {
      expect(articleModel.actionCreators()).toEqual({});
    });

    describe('when reducers are present', () => {
      const loadSomethingReducerSpy = jest.fn();
      const modelX = new Model({
        namespace: 'articles',
        state: {},
        reducers: {
          // @ts-ignore
          loadSomethingReducer: loadSomethingReducerSpy,
        },
      });
      const actionCreatorSpy = jest.spyOn(modelX, 'actionCreator');
      const actionCreators = modelX.actionCreators();
      const payload = {1: 2};

      it('returns an entry for the provided reducer', () => {
        expect(actionCreators).toEqual(
          {loadSomethingReducer: expect.anything()}
        );
      });

      it('calls actionCreator func when actionCreator entry is called', () => {
        actionCreators.loadSomethingReducer(payload);
        expect(actionCreatorSpy).toHaveBeenCalledWith('loadSomethingReducer', payload, undefined);
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingReducer(payload)).toEqual(
          modelX.actionCreator('loadSomethingReducer', payload)
        );
      });
    });

    describe('when effects are present', () => {
      const loadSomethingEffectSpy = jest.fn();
      const modelX = new Model({
        namespace: 'articles',
        state: {},
        effects: {
          // @ts-ignore
          loadSomethingEffect: loadSomethingEffectSpy,
        },
      });
      const actionCreatorSpy = jest.spyOn(modelX, 'actionCreator');
      const actionCreators = modelX.actionCreators();
      const payload = {1: 2};

      it('returns an entry for the provided effect', () => {
        expect(actionCreators).toEqual(
          {loadSomethingEffect: expect.anything()}
        );
      });

      it('calls actionCreator func when actionCreator entry is called', () => {
        actionCreators.loadSomethingEffect(payload);
        expect(actionCreatorSpy).toHaveBeenCalledWith('loadSomethingEffect', payload, undefined);
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingEffect(payload)).toEqual(
          modelX.actionCreator('loadSomethingEffect', payload)
        );
      });
    });
  });

  describe('modelSelectors', () => {
    it('returns an empty object when no selectors exists', () => {
      expect(articleModel.actionCreators()).toEqual({});
    });

    describe('when selectors are present', () => {
      const selectASpy = jest.fn();
      const state = {};
      const modelX = new Model({
        namespace: 'articles',
        state,
        selectors: {
          // @ts-ignore
          selectA: selectASpy,
        },
      });
      const allState = {
        [modelX.namespace]: state,
      };
      const selectors = modelX.modelSelectors();

      it('returns an entry for the provided selector', () => {
        expect(selectors).toEqual(
          {selectA: expect.anything()}
        );
      });

      it('calls selector func when selector entry is called', () => {
        selectors.selectA(allState, 1);
        expect(selectASpy).toHaveBeenCalledWith(state, 1, allState);
      });

      it('returns result of selector func', () => {
        expect(selectors.selectA(allState)).toEqual(selectASpy.mock.results[0].value);
      });
    });

    describe('when selectors are present in a nested namespace', () => {
      const selectASpy = jest.fn();
      const state = {};
      const modelX = new Model({
        namespace: 'projectA.articles',
        state,
        selectors: {
          // @ts-ignore
          selectA: selectASpy,
        },
      });
      const allState = {
        projectA: {
          articles: state
        },
      };
      const selectors = modelX.modelSelectors();

      it('returns an entry for the provided selector', () => {
        expect(selectors).toEqual(
          {selectA: expect.anything()}
        );
      });

      it('calls selector func when selector entry is called', () => {
        selectors.selectA(allState, 1);
        expect(selectASpy).toHaveBeenCalledWith(state, 1, allState);
      });

      it('returns result of selector func', () => {
        expect(selectors.selectA(allState)).toEqual(selectASpy.mock.results[0].value);
      });
    });
  });

  describe('modelReducers', () => {
    it('returns a non nil value when no reducers exist', () => {
      expect(articleModel.modelReducers()).toEqual(expect.anything());
    });

    describe('when reducers are present', () => {
      // @ts-ignore
      const reducerASpy = jest.fn().mockImplementation((state, action) => state.ola = 'hi');
      const state = {};
      const modelX = new Model({
        namespace: 'articles',
        state,
        reducers: {
          // @ts-ignore
          reducerA: reducerASpy,
        },
      });
      const reducers = modelX.modelReducers();
      const reducerAction = modelX.actionCreator('reducerA');
      reducerAction.type = modelX.actionType('reducerA');

      it('calls reducer func when reducer entry is called', () => {
        reducers(state, reducerAction);
        expect(reducerASpy).toHaveBeenCalled();
      });

      it('returns result of reducer func', () => {
        expect(reducers(state, reducerAction)).toEqual({ola: 'hi'});
      });
    });
  });

  describe('modelEffects', () => {
    it('returns an empty object when no effects exists', () => {
      expect(articleModel.modelEffects()).toEqual({});
    });

    describe('when effects are present', () => {
      const state = {};
      let effectASpy;
      let modelX;
      let actionCreatorsSpy;
      let effects;

      beforeEach(() => {
        effectASpy = jest.fn();
        modelX = new Model({
          namespace: 'articles',
          state,
          effects: {
            // @ts-ignore
            effectA: effectASpy,
          },
        });
        actionCreatorsSpy = jest.spyOn(modelX, 'actionCreators');
        effects = modelX.modelEffects();
      });

      it('returns an entry for the provided effect', () => {
        expect(effects).toEqual(
          {effectA: expect.anything()}
        );
      });

      it('calls effect func when selector entry is called', () => {
        effects.effectA({userId: 1});
        expect(effectASpy).toHaveBeenCalledWith(
          {userId: 1}, sagaEffects, actionCreatorsSpy.mock.results[0].value,
        );
      });

      it('returns result of effect func', () => {
        expect(effects.effectA({userId: 1})).toEqual(effectASpy.mock.results[0].value);
      });
    });
  });

  describe('reduxSagas', () => {
    it('returns an empty list when no effects exists', () => {
      expect(articleModel.reduxSagas).toEqual([]);
    });

    describe('when effects are present', () => {
      let gen;
      const state = {};
      let effectASpy;
      let modelX;
      let actionCreatorsSpy;
      const payload = {userId: 1};
      let __actionInternals;
      let action;

      beforeEach(() => {
        effectASpy = jest.fn();
        modelX = new Model({
          namespace: 'articles',
          state,
          effects: {
            // @ts-ignore
            effectA: function*(...args) {effectASpy(...args)},
          },
        });
        __actionInternals = {resolve: jest.fn(), reject: jest.fn()};
        action = {type: 'whatever', payload, __actionInternals};
        actionCreatorsSpy = jest.spyOn(modelX, 'actionCreators');
        gen = modelX.reduxSagas[0]();
      });

      it('uses takeEvery saga effect', () => {
        expect(gen.next().value).toEqual(
          allSagaEffects.takeEvery(expect.anything(), expect.anything()),
        );
      });

      it('passes the right arguments to the effectASpy effect', () => {
        expect(gen.next().value.payload.args).toEqual(
          [modelX.actionType('effectA'), expect.anything()],
        );
      });

      it('calls effectASpy with the right arguments', () => {
        gen.next().value.payload.args[1](action).next();
        expect(effectASpy).toHaveBeenCalledWith(
          payload, sagaEffects, actionCreatorsSpy.mock.results[0].value,
        );
      });

      it('throws NonCompatibleActionError when action is not compatible', () => {
        const nonCompatibleAction = {type: 'whatever', payload: {}};
        expect(() => gen.next().value.payload.args[1](nonCompatibleAction).next()).toThrow({
          name: 'NonCompatibleActionError',
          message: `The provided action lacks the internals for being resux-able. Be sure to use ` +
            `bindResuxActionCreators instead of redux's bindActionCreators. The action in question ` +
            `is: ${JSON.stringify(nonCompatibleAction)}`,
        });
      });

      it('calls resolve when no exception occurred', () => {
        gen.next().value.payload.args[1](action).next();
        expect(__actionInternals.resolve).toHaveBeenCalledWith(undefined);
      });

      it('calls reject when an exception occurs', () => {
        const error = new Error();
        effectASpy.mockImplementation(() => {
          throw error;
        });
        gen.next().value.payload.args[1](action).next();
        expect(__actionInternals.reject).toHaveBeenCalledWith(error);
      });
    });
  });
});
