import * as allSagaEffects from "redux-saga/effects";
import {Model} from '../src';
import {sagaEffects} from '../src/model';
import {actionCreator} from '../src/utils';


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

  describe('Model.disableInitializationChecks', () => {
    it('is false by default', () => {
      expect(Model.disableInitializationChecks).toEqual(false);
    });
  });

  describe('isReduxInitialized', () => {
    it('returns false when the model has not been marked as loaded', () => {
      const unloadedModel = new Model(modelOptions);
      expect(unloadedModel.isReduxInitialized).toEqual(false);
    });

    it('returns true when the model is marked as loaded', () => {
      const loadedModel = new Model(modelOptions);
      loadedModel.markAsReduxInitialized();
      expect(loadedModel.isReduxInitialized).toEqual(true);
    });
  });

  describe('isSagaInitialized', () => {
    it('returns false when the model has not been marked as loaded', () => {
      const unloadedModel = new Model(modelOptions);
      expect(unloadedModel.isSagaInitialized).toEqual(false);
    });

    it('returns true when the model is marked as loaded', () => {
      const loadedModel = new Model(modelOptions);
      loadedModel.markAsSagaInitialized();
      expect(loadedModel.isSagaInitialized).toEqual(true);
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

  describe('blockingEffects', () => {
    it('returns an empty object when none is available', () => {
      expect(articleModel.blockingEffects).toEqual({});
    });

    it('returns the effects', () => {
      const modelOptionsWithBlockingEffects = {...modelOptions, blockingEffects: {}};
      const model = new Model(modelOptionsWithBlockingEffects);
      expect(model.blockingEffects).toEqual(modelOptionsWithBlockingEffects.blockingEffects);
    });
  });

  it('actionType returns the actionName with the namespace', () => {
    expect(articleModel.actionType('ola')).toEqual(`${articleModel.namespace}.ola`);
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
      modelX.markAsReduxInitialized();
      modelX.markAsSagaInitialized();
      const actionCreators = modelX.actionCreators();
      const payload = {1: 2};

      it('returns an entry for the provided reducer', () => {
        expect(actionCreators).toEqual(
          {loadSomethingReducer: expect.anything()}
        );
      });

      it('provided reducer has isEffect as false', () => {
        expect(actionCreators.loadSomethingReducer.isEffect).toEqual(false);
      });

      it('provided effect has type as action type', () => {
        expect(actionCreators.loadSomethingReducer.type).toEqual(modelX.actionType('loadSomethingReducer'));
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingReducer(payload)).toEqual(
          actionCreator(modelX.actionType('loadSomethingReducer'), payload)
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
      modelX.markAsReduxInitialized();
      modelX.markAsSagaInitialized();
      const actionCreators = modelX.actionCreators();
      const payload = {1: 2};

      it('returns an entry for the provided effect', () => {
        expect(actionCreators).toEqual(
          {loadSomethingEffect: expect.anything()}
        );
      });

      it('provided effect has isEffect as true', () => {
        expect(actionCreators.loadSomethingEffect.isEffect).toEqual(true);
      });

      it('provided effect has type as action type', () => {
        expect(actionCreators.loadSomethingEffect.type).toEqual(modelX.actionType('loadSomethingEffect'));
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingEffect(payload)).toEqual(
          actionCreator(modelX.actionType('loadSomethingEffect'), payload)
        );
      });
    });

    describe('when blocking effects are present', () => {
      const loadSomethingEffectSpy = jest.fn();
      const loadSomethingBlockingEffectSpy = jest.fn();
      const modelX = new Model({
        namespace: 'articles',
        state: {},
        effects: {
          // @ts-ignore
          loadSomethingEffect: loadSomethingEffectSpy,
        },
        blockingEffects: {
          loadSomethingEffect: loadSomethingBlockingEffectSpy,
        }
      });
      modelX.markAsReduxInitialized();
      modelX.markAsSagaInitialized();
      const actionCreators = modelX.actionCreators();
      const payload = {1: 2};

      it('returns an entry for the provided effect', () => {
        expect(actionCreators).toEqual(
          {loadSomethingEffect: expect.anything()}
        );
      });

      it('provided effect has isEffect as true', () => {
        expect(actionCreators.loadSomethingEffect.isEffect).toEqual(true);
      });

      it('provided effect has type as action type', () => {
        expect(actionCreators.loadSomethingEffect.type).toEqual(modelX.actionType('loadSomethingEffect'));
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingEffect(payload)).toEqual(
          actionCreator(modelX.actionType('loadSomethingEffect'), payload)
        );
      });
    });
  });

  describe('modelSelectors', () => {
    it('returns an empty object when no selectors exists', () => {
      expect(articleModel.modelSelectors()).toEqual({});
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
      modelX.markAsReduxInitialized();
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
      modelX.markAsReduxInitialized();
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
      let reducerASpy;
      let state;
      let modelX;
      let reducers;
      let reducerAction;

      beforeEach(() => {
        // @ts-ignore
        reducerASpy = jest.fn().mockImplementation((state, action) => state.ola = 'hi');
        state = {};
        modelX = new Model({
          namespace: 'articles',
          state,
          reducers: {
            // @ts-ignore
            reducerA: reducerASpy,
          },
        });
        reducers = modelX.modelReducers();
        reducerAction = actionCreator(modelX.actionType('reducerA'));
      });

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
      let modelEffects;
      const state = {};
      let effectASpy;
      let modelX;
      let actionCreatorsSpy;
      const payload = {userId: 1};
      let __actionInternals;
      let action;
      let gen;

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
        modelEffects = modelX.modelEffects();
        gen = modelEffects.effectA();
      });

      it('returns an entry for the provided effect', () => {
        expect(modelEffects).toEqual(
          {effectA: expect.anything()}
        );
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
          message: `The provided action lacks the internals for being redux-data-model-able. Be sure to use ` +
            `bindModelActionCreators instead of redux's bindActionCreators. The action in question ` +
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

    describe('when blocking effects are present', () => {
      let modelEffects;
      const state = {};
      let effectASpy;
      let modelX;
      let actionCreatorsSpy;
      const payload = {userId: 1};
      let __actionInternals;
      let action;
      let gen;

      beforeEach(() => {
        effectASpy = jest.fn();
        modelX = new Model({
          namespace: 'articles',
          state,
          effects: {
            // @ts-ignore
            effectA: function*(...args) {effectASpy(...args)},
          },
          blockingEffects: {
            // @ts-ignore
            effectA: function* (actionType, sagaBlockingEffects, {effectA}) {
              yield sagaBlockingEffects.takeLeading(actionType, effectA);
            },
          },
        });
        __actionInternals = {resolve: jest.fn(), reject: jest.fn()};
        action = {type: 'whatever', payload, __actionInternals};
        actionCreatorsSpy = jest.spyOn(modelX, 'actionCreators');
        modelEffects = modelX.modelEffects();
        gen = modelEffects.effectA();
      });

      it('returns an entry for the provided effect', () => {
        expect(modelEffects).toEqual(
          {effectA: expect.anything()}
        );
      });

     it('uses takeLeading saga effect', () => {
        expect(gen.next().value).toEqual(
          allSagaEffects.takeLeading(expect.anything(), expect.anything()),
        );
      });

      it('passes the right arguments to the effectASpy effect', () => {
        expect(gen.next().value.payload.args).toEqual(
          [modelX.actionType('effectA'), expect.anything()],
        );
      });

      it('calls effectA with the right arguments', () => {
        gen.next().value.payload.args[1](action).next();
        expect(effectASpy).toHaveBeenCalledWith(
          payload, sagaEffects, actionCreatorsSpy.mock.results[0].value,
        );
      });

      it('throws NonCompatibleActionError when action is not compatible', () => {
        const nonCompatibleAction = {type: 'whatever', payload: {}};
        expect(() => gen.next().value.payload.args[1](nonCompatibleAction).next()).toThrow({
          name: 'NonCompatibleActionError',
          message: `The provided action lacks the internals for being redux-data-model-able. Be sure to use ` +
            `bindModelActionCreators instead of redux's bindActionCreators. The action in question ` +
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

  describe('reduxSagas', () => {
    it('returns an empty list when no effects exists', () => {
      expect(articleModel.reduxSagas).toEqual([]);
    });

    describe('when model effects are present', () => {
      let state;
      let effectASpy;
      let modelX;
      let modelEffectsSpy;
      let reduxSagas;

      beforeEach(() => {
        effectASpy = jest.fn();
        state = {};
        modelX = new Model({
          namespace: 'articles',
          state,
          effects: {
            // @ts-ignore
            effectA: effectASpy,
          },
        });
        modelEffectsSpy = jest.spyOn(modelX, 'modelEffects');
        reduxSagas = modelX.reduxSagas;
      });

      it('calls modelEffects', () => {
        expect(modelEffectsSpy).toHaveBeenCalledWith();
      });

      it('returns a list with each of the effects in modelEffects method', () => {
        expect(reduxSagas).toEqual(
          Object.values(modelX.modelEffects())
        );
      });
    });
  });
});
