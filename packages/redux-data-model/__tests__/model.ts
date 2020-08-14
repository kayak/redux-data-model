import * as allSagaEffects from "redux-saga/effects";
import {Model} from '../src/model';
import {blockingSagaEffects, sagaEffects} from '../src/saga';
import {actionCreator} from '../src/utils';

describe('Model', () => {
  let modelOptions: any;
  let articleModel: Model<any>;

  beforeAll(() => {
    modelOptions = {
      namespace: 'articles',
      state: {},
    };
    articleModel = new Model(modelOptions);
    Model.disableProxyChecks = true;
  });

  describe('constructor', () => {
    it('throws when namespace is not a string', () => {
      expect(() => new Model({
        ...modelOptions,
        namespace: [],
      })).toThrow({
        name: '',
        message: 'Namespace must be a string. The provided namespace type was: object. ' +
        'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
      });
    });

    it('throws when namespace is empty', () => {
      expect(() => new Model({
        ...modelOptions,
        namespace: '',
      })).toThrow({
        name: '',
        message: 'Namespace must be a non empty string. ' +
        'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
      });
    });

    describe('throws when namespace is invalid', () => {
      const invalidNamespaceError = {
        name: '',
        message: 'Namespace can only contain letters, numbers and/or dots, when nesting the data is needed. ' +
        'It was validated against the following regex: /^([A-Za-z0-9]+)([.][A-Za-z0-9]+)*$/. ' +
        'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
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
        'The provided reducer/effect action types were: whatever, whatever. ' +
        'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
      });
    });

    it('throws when a blocking effect has no matching effect with the same action type', () => {
      expect(() => new Model({
        ...modelOptions,
        effects: {
          whatever: jest.fn(),
        },
        blockingEffects: {
          whateverAndMore: jest.fn(),
        },
      })).toThrow({
        name: '',
        message: 'Blocking effect action types should match a pre-existing effect action type in [articles] model. ' +
        'The provided effect action types were: whatever. ' +
        'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
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

  describe('actionType', () => {
    it('returns the actionName with the namespace', () => {
      expect(articleModel.actionType('ola')).toEqual(`@@${articleModel.namespace}.ola@@`);
    });

    describe('returns the actionName alone when it already matches the action type regex', () => {
      it('and has a normal namespace', () => {
        const actionName = '@@someOtherModel.ola@@';
        expect(articleModel.actionType(actionName)).toEqual(actionName);
      });

      it('and has a nested namespace with one level', () => {
        const actionName = '@@projectA.someOtherModel.ola@@';
        expect(articleModel.actionType(actionName)).toEqual(actionName);
      });

      it('and has a nested namespace with two levels or more', () => {
        const actionName = '@@projectA.sectionA.someOtherModel.ola@@';
        expect(articleModel.actionType(actionName)).toEqual(actionName);
      });
    });
  });

  describe('actionTypes', () => {
    let model: any;

    beforeEach(() => {
      Model.disableProxyChecks = false;
      model = new Model({
        ...modelOptions,
        reducers: {
          whateverReducer: jest.fn(),
        },
        effects: {
          whateverEffect: jest.fn(),
        },
      });
    });

    afterEach(() => {
      Model.disableProxyChecks = true;
    });

    it('returns an empty object when no reducers or effects exists', () => {
      expect(Object.keys(articleModel.actionTypes())).toEqual([]);
    });

    it('returns an action type when a reducer exists', () => {
      expect(model.actionTypes().whateverReducer).toEqual(model.actionType('whateverReducer'));
    });

    it('returns an action type when an effect exists', () => {
      expect(model.actionTypes().whateverEffect).toEqual(model.actionType('whateverEffect'));
    });

    it('throws when an undefined effect/reducer name is accessed', () => {
      expect(() => {
        model.actionTypes().whatever
      }).toThrow({
        name: '',
        message: 'No reducer/effect called [whatever] was found on [articles] model. ' +
        'Available options are: whateverReducer,whateverEffect. ' +
        'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
      });
    });
  });

  describe('actionCreators', () => {
    beforeEach(() => {
      Model.disableProxyChecks = false;
    });

    afterEach(() => {
      Model.disableProxyChecks = true;
    });

    it('returns an empty object when no reducers or effects exists', () => {
      expect(Object.keys(articleModel.actionCreators())).toEqual([]);
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
        expect(Object.keys(actionCreators)).toEqual(['loadSomethingReducer']);
      });

      it('provided reducer has isEffect as false', () => {
        expect(actionCreators.loadSomethingReducer.isEffect).toEqual(false);
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingReducer(payload)).toEqual(
          actionCreator(modelX.actionType('loadSomethingReducer'), payload)
        );
      });

      it('throws when an undefined reducer name is accessed', () => {
        expect(() => {
          actionCreators.whatever
        }).toThrow({
          name: '',
          message: 'No reducer/effect called [whatever] was found on [articles] model. ' +
          'Available options are: loadSomethingReducer. ' +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
        });
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
        expect(Object.keys(actionCreators)).toEqual(['loadSomethingEffect']);
      });

      it('provided effect has isEffect as true', () => {
        expect(actionCreators.loadSomethingEffect.isEffect).toEqual(true);
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingEffect(payload)).toEqual(
          actionCreator(modelX.actionType('loadSomethingEffect'), payload)
        );
      });

      it('throws when an undefined effect name is accessed', () => {
        expect(() => {
          actionCreators.whatever
        }).toThrow({
          name: '',
          message: 'No reducer/effect called [whatever] was found on [articles] model. ' +
          'Available options are: loadSomethingEffect. ' +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
        });
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
        expect(Object.keys(actionCreators)).toEqual(['loadSomethingEffect']);
      });

      it('provided effect has isEffect as true', () => {
        expect(actionCreators.loadSomethingEffect.isEffect).toEqual(true);
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
      let selectASpy: any;
      let state: any;
      let modelX: Model<any>;
      let allState: any;
      let selectors: any;

      beforeEach(() => {
        Model.disableProxyChecks = false;
        selectASpy = jest.fn();
        state = {};
        modelX = new Model({
          namespace: 'articles',
          state,
          selectors: {
            // @ts-ignore
            selectA: selectASpy,
          },
        });
        modelX.markAsReduxInitialized();
        allState = {
          [modelX.namespace]: state,
        };
        selectors = modelX.modelSelectors();
      });

      afterEach(() => {
        Model.disableProxyChecks = true;
      });

      it('returns an entry for the provided selector', () => {
        expect(Object.keys(selectors)).toEqual(['selectA']);
      });

      it('calls selector func when selector entry is called', () => {
        selectors.selectA(allState, 1);
        expect(selectASpy).toHaveBeenCalledWith(state, 1, allState);
      });

      it('returns result of selector func', () => {
        expect(selectors.selectA(allState)).toEqual(selectASpy.mock.results[0].value);
      });
    });

    describe('when memoized selectors are present', () => {
      let selectorASpy: any;
      let selectorBSpy: any;
      let resultSpy: any;
      let state: any;
      let modelX: Model<any>;
      let allState: any;
      let selectors: any;

      beforeEach(() => {
        Model.disableProxyChecks = false;
        selectorASpy = jest.fn();
        selectorBSpy = jest.fn();
        resultSpy = jest.fn();
        state = {};
        modelX = new Model({
          namespace: 'articles',
          state,
          selectors: {
            // @ts-ignore
            selectA: [selectorASpy, selectorBSpy, resultSpy],
          },
        });
        modelX.markAsReduxInitialized();
        allState = {
          [modelX.namespace]: state,
        };
        selectors = modelX.modelSelectors();
      });

      afterEach(() => {
        Model.disableProxyChecks = true;
      });

      it('returns an entry for the provided selector', () => {
        expect(Object.keys(selectors)).toEqual(['selectA']);
      });

      it('calls selectorA func when selector entry is called', () => {
        selectors.selectA(allState, 1);
        expect(selectorASpy).toHaveBeenCalledWith(state, 1, allState);
      });

      it('calls selectorB func when selector entry is called', () => {
        selectors.selectA(allState, 1);
        expect(selectorBSpy).toHaveBeenCalledWith(state, 1, allState);
      });

      it('calls result func when selector entry is called', () => {
        selectors.selectA(allState, 1);
        expect(resultSpy).toHaveBeenCalledWith(selectorASpy.mock.results[0].value, selectorBSpy.mock.results[0].value);
      });

      it('returns result of the result func', () => {
        expect(selectors.selectA(allState)).toEqual(resultSpy.mock.results[0].value);
      });
    });

    describe('when selectors are present in a nested namespace', () => {
      let selectASpy: any;
      let state: any;
      let modelX: Model<any>;
      let allState: any;
      let selectors: any;

      beforeEach(() => {
        Model.disableProxyChecks = false;
        selectASpy = jest.fn();
        state = {};
        modelX = new Model({
          namespace: 'projectA.articles',
          state,
          selectors: {
            // @ts-ignore
            selectA: selectASpy,
          },
        });
        modelX.markAsReduxInitialized();
        allState = {
          projectA: {
            articles: state
          },
        };
        selectors = modelX.modelSelectors();
      });

      afterEach(() => {
        Model.disableProxyChecks = true;
      });

      it('returns an entry for the provided selector', () => {
        expect(Object.keys(selectors)).toEqual(['selectA']);
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

    describe('when a reducer is present', () => {
      let reducerASpy: any;
      let state: any;
      let modelX: Model<any>;
      let reducers: any;
      let reducerAction: any;

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

    describe('when a reducer for the action of another model is present', () => {
      let reducerAYSpy: any;
      let reducerAXSpy: any;
      let state: any;
      let modelX: Model<any>;
      let modelY: any;
      let reducers: any;
      let reducerAction: any;

      beforeEach(() => {
        // @ts-ignore
        reducerAXSpy = jest.fn().mockImplementation((state, _action) => state.ola = 'hi');
        reducerAYSpy = jest.fn().mockImplementation((state, _action) => state.ola = 'ola');
        state = {};
        modelY = new Model({
          namespace: 'modelY',
          state,
          reducers: {
            // @ts-ignore
            reducerAY: reducerAYSpy,
          },
        });
        modelX = new Model({
          namespace: 'modelX',
          state,
          reducers: {
            // @ts-ignore
            [modelY.actionTypes().reducerAY]: reducerAXSpy,
          },
        });
        reducers = modelX.modelReducers();
        reducerAction = actionCreator(modelY.actionType('reducerAY'));
      });

      it('calls reducer func when reducer entry is called', () => {
        reducers(state, reducerAction);
        expect(reducerAXSpy).toHaveBeenCalled();
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

    describe('when an effect is present', () => {
      let modelEffects: any;
      const state = {};
      let effectASpy: any;
      let modelX: Model<any>;
      let actionCreatorsSpy: any;
      const payload = {userId: 1};
      let __actionInternals: any;
      let action: any;
      let gen: any;

      beforeEach(() => {
        effectASpy = jest.fn();
        modelX = new Model({
          namespace: 'articles',
          state,
          effects: {
            // @ts-ignore
            effectA: function*(...args) {
              return effectASpy(...args)
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
          `is: ${JSON.stringify(nonCompatibleAction)}. ` +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.',
        });
      });

      describe('when no exception occurred calls resolve', () => {
        it('with undefined as return value by default', () => {
          gen.next().value.payload.args[1](action).next();
          expect(__actionInternals.resolve).toHaveBeenCalledWith(undefined);
        });

        it('with effect return value when available', () => {
          const returnValue = 'finished';
          effectASpy.mockReturnValueOnce(returnValue);
          gen.next().value.payload.args[1](action).next();
          expect(__actionInternals.resolve).toHaveBeenCalledWith(returnValue);
        });
      });

      it('calls reject when an exception occurs', () => {
        const error = new Error();
        effectASpy.mockImplementation(() => {
          throw error;
        });
        try {
          gen.next().value.payload.args[1](action).next();
        } catch {}
        expect(__actionInternals.reject).toHaveBeenCalledWith(error);
      });

      it('throws when an undefined saga effect name is accessed', () => {
        Model.disableProxyChecks = false;
        modelX = new Model({
          namespace: 'articles',
          state,
          effects: {
            // @ts-ignore
            effectA: function*(...args) {effectASpy(...args)},
          },
        });
        modelEffects = modelX.modelEffects();
        gen = modelEffects.effectA();

        // We need to use mocks since the usual blocking saga helpers employ the fork saga,
        // which is asynchronous and won't bubble up errors.
        effectASpy.mockImplementationOnce(function*(action: any, sagaEffects: any, _actionCreators: any) {
          yield sagaEffects.whatever(action);
        });
        gen.next().value.payload.args[1](action).next();
        expect(() => {
          effectASpy.mock.results[0].value.next()
        }).toThrow({
          name: '',
          message: 'No saga effect called [whatever] was found on [articles] model. ' +
          `Available options are: ${Object.keys(sagaEffects)}. ` +
          'For being able to use other saga effects check blocking effects. ' +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
        });
        Model.disableProxyChecks = true;
      });
    });

    describe('when an effect for the action of another model is present', () => {
      let modelEffects: any;
      let effectAXSpy: any;
      let effectAYSpy: any;
      const state = {};
      let modelX: Model<any>;
      let modelY: any;
      let actionCreatorsSpy: any;
      const payload = {userId: 1};
      let __actionInternals: any;
      let action: any;
      let gen: any;

      beforeEach(() => {
        Model.disableProxyChecks = true;
        effectAXSpy = jest.fn();
        effectAYSpy = jest.fn();
        modelY = new Model({
          namespace: 'modelY',
          state,
          effects: {
            // @ts-ignore
            effectAY: function*(...args) {effectAYSpy(...args)},
          },
        });
        modelX = new Model({
          namespace: 'modelX',
          state,
          effects: {
            // @ts-ignore
            [modelY.actionTypes().effectAY]: function*(...args) {effectAXSpy(...args)},
          },
        });
        __actionInternals = {resolve: jest.fn(), reject: jest.fn()};
        action = {type: 'whatever', payload, __actionInternals};
        actionCreatorsSpy = jest.spyOn(modelX, 'actionCreators');
        modelEffects = modelX.modelEffects();
        gen = modelEffects[modelY.actionTypes().effectAY]();
      });

      it('returns an entry for the provided effect', () => {
        expect(modelEffects).toEqual(
          {[modelY.actionTypes().effectAY]: expect.anything()}
        );
      });

      it('passes the right arguments to the effectAYSpy effect in modelX', () => {
        expect(gen.next().value.payload.args).toEqual(
          [modelY.actionType('effectAY'), expect.anything()],
        );
      });

      it('calls effectAYSpy with the right arguments in modelX', () => {
        gen.next().value.payload.args[1](action).next();
        expect(effectAXSpy).toHaveBeenCalledWith(
          payload, sagaEffects, actionCreatorsSpy.mock.results[0].value,
        );
      });
    });

    describe('when a blocking effect is present', () => {
      let modelEffects: any;
      const state = {};
      let effectASpy: any;
      let modelX: Model<any>;
      let actionCreatorsSpy: any;
      const payload = {userId: 1};
      let __actionInternals: any;
      let action: any;
      let gen: any;

      beforeEach(() => {
        Model.disableProxyChecks = true;
        effectASpy = jest.fn();
        modelX = new Model({
          namespace: 'articles',
          state,
          effects: {
            // @ts-ignore
            effectA: function*(...args) {
              return effectASpy(...args);
            },
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
        expect(gen.next().value.next().value).toEqual(
          allSagaEffects.takeLeading(expect.anything(), expect.anything()),
        );
      });

      it('passes the right arguments to the effectASpy effect', () => {
        expect(gen.next().value.next().value.payload.args).toEqual(
          [modelX.actionType('effectA'), expect.anything()],
        );
      });

      it('calls effectA with the right arguments', () => {
        gen.next().value.next().value.payload.args[1](action).next();
        expect(effectASpy).toHaveBeenCalledWith(
          payload, sagaEffects, actionCreatorsSpy.mock.results[0].value,
        );
      });

      it('throws NonCompatibleActionError when action is not compatible', () => {
        const nonCompatibleAction = {type: 'whatever', payload: {}};
        expect(() => gen.next().value.next().value.payload.args[1](nonCompatibleAction).next()).toThrow({
          name: 'NonCompatibleActionError',
          message: `The provided action lacks the internals for being redux-data-model-able. Be sure to use ` +
          `bindModelActionCreators instead of redux's bindActionCreators. The action in question ` +
          `is: ${JSON.stringify(nonCompatibleAction)}. ` +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.',
        });
      });

      describe('when no exception occurred calls resolve', () => {
        it('with undefined as return value by default', () => {
          gen.next().value.next().value.payload.args[1](action).next();
          expect(__actionInternals.resolve).toHaveBeenCalledWith(undefined);
        });

        it('with effect return value when available', () => {
          const returnValue = 'finished';
          effectASpy.mockReturnValueOnce(returnValue);
          gen.next().value.next().value.payload.args[1](action).next();
          expect(__actionInternals.resolve).toHaveBeenCalledWith(returnValue);
        });
      });

      it('calls reject when an exception occurs', () => {
        const error = new Error();
        effectASpy.mockImplementation(() => {
          throw error;
        });
        try {
          gen.next().value.next().value.payload.args[1](action).next();
        } catch {}
        expect(__actionInternals.reject).toHaveBeenCalledWith(error);
      });

      it('throws when an undefined blocking saga effect name is accessed', () => {
        Model.disableProxyChecks = false;
        modelX = new Model({
          namespace: 'articles',
          state,
          effects: {
            // @ts-ignore
            effectA: function*(...args) {
              effectASpy(...args);
            },
          },
          blockingEffects: {
            // @ts-ignore
            effectA: function* (actionType, sagaBlockingEffects, {effectA}) {
              // @ts-ignore
              yield sagaBlockingEffects.whatever(actionType, effectA);
            },
          },
        });
        modelEffects = modelX.modelEffects();
        gen = modelEffects.effectA();

        expect(() => {
          gen.next().value.next().value.payload.args[1](action).next();
        }).toThrow({
          name: '',
          message: 'No saga effect called [whatever] was found on [articles] model. ' +
          `Available options are: ${Object.keys(blockingSagaEffects)}. ` +
          'For being able to use other saga effects check normal effects. ' +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
        });
        Model.disableProxyChecks = true;
      });
    });

    describe('when a blocking effect for the action of another model is present', () => {
      let modelEffects: any;
      let effectAXSpy: any;
      let effectAYSpy: any;
      const state = {};
      let modelX: Model<any>;
      let modelY: any;
      let actionCreatorsSpy: any;
      const payload = {userId: 1};
      let __actionInternals: any;
      let action: any;
      let gen: any;

      beforeEach(() => {
        effectAXSpy = jest.fn();
        effectAYSpy = jest.fn();
        modelY = new Model({
          namespace: 'modelY',
          state,
          effects: {
            // @ts-ignore
            effectAY: function*(...args) {effectAYSpy(...args)},
          },
        });
        modelX = new Model({
          namespace: 'modelX',
          state,
          effects: {
            // @ts-ignore
            [modelY.actionTypes().effectAY]: function* (...args) {
              effectAXSpy(...args)
            },
          },
          blockingEffects: {
            // @ts-ignore
            [modelY.actionTypes().effectAY]: function* (actionType, sagaBlockingEffects, modelEffects) {
              yield sagaBlockingEffects.takeLeading(actionType, modelEffects[modelY.actionTypes().effectAY]);
            },
          }
        });
        __actionInternals = {resolve: jest.fn(), reject: jest.fn()};
        action = {type: 'whatever', payload, __actionInternals};
        actionCreatorsSpy = jest.spyOn(modelX, 'actionCreators');
        modelEffects = modelX.modelEffects();
        gen = modelEffects[modelY.actionTypes().effectAY]();
      });

      it('returns an entry for the provided effect', () => {
        expect(modelEffects).toEqual(
          {[modelY.actionTypes().effectAY]: expect.anything()}
        );
      });

      it('passes the right arguments to the effectAYSpy effect in modelX', () => {
        expect(gen.next().value.next().value.payload.args).toEqual(
          [modelY.actionType('effectAY'), expect.anything()],
        );
      });

      it('calls effectAYSpy with the right arguments  in modelX', () => {
        gen.next().value.next().value.payload.args[1](action).next();
        expect(effectAXSpy).toHaveBeenCalledWith(
          payload, sagaEffects, actionCreatorsSpy.mock.results[0].value,
        );
      });
    });
  });

  describe('reduxSagas', () => {
    it('returns an empty list when no effects exists', () => {
      expect(articleModel.reduxSagas).toEqual([]);
    });

    describe('when model effects are present', () => {
      let state: any;
      let effectASpy: any;
      let modelX: Model<any>;
      let modelEffectsSpy: any;
      let reduxSagas: any;

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
