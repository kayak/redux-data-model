import produce from 'immer';
import {
  difference,
  get,
  identity,
  isArray,
  isEmpty,
  isString,
  keys,
  memoize,
  size,
  toPairs,
  uniq,
  values
} from 'lodash';
import {AnyAction, Reducer} from 'redux';
import {Saga} from '@redux-saga/core';
import {
  actionChannel,
  all,
  apply,
  call,
  cancel,
  cps,
  debounce,
  delay,
  flush,
  fork,
  getContext,
  join,
  put,
  putResolve,
  race,
  retry,
  select,
  setContext,
  spawn,
  take,
  takeEvery as blockingEffectTakeEvery,
  takeLatest,
  takeLeading,
  takeMaybe,
  throttle,
} from 'redux-saga/effects';
import {createSelector} from 'reselect';
import {modelBlockingGenerator} from './saga';
import {
  ActionCreatorsMapObject,
  ActionTypesMapObject,
  ActionWithInternals,
  BlockingEffectMap,
  EffectMap,
  EffectModelMap,
  ReducerMap,
  SelectorFunction,
  SelectorMap,
  SelectorModelMap,
  State,
} from './baseTypes';
import {actionCreator, ActionInternalsObject} from "./utils";
import {
  BlockingEffectWithoutMatchingEffectError,
  DuplicatedActionTypesError,
  EmptyNamespaceError,
  InvalidNamespaceError,
  ModelNotReduxInitializedError,
  ModelNotSagaInitializedError,
  NamespaceIsntAStringError
} from './errors'

/**
 * @ignore
 */
export const sagaEffects = {
  actionChannel,
  all,
  apply,
  call,
  cancel,
  cps,
  delay,
  flush,
  fork,
  getContext,
  join,
  put,
  putResolve,
  race,
  retry,
  select,
  setContext,
  spawn,
};

/**
 * @ignore
 */
export const blockingSagaEffects = {
  blockingEffectTakeEvery,
  takeLeading,
  takeLatest,
  debounce,
  throttle,
  take,
  takeMaybe,
  cancel,
  fork,
  spawn,
  apply,
  call,
  all,
  delay,
  race,
  join,
};

/**
 * @ignore
 */
const defaultReducer = (
  state,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  _action,
) => state;

/**
 * @ignore
 */
const namespaceRegex = new RegExp('^([A-Za-z0-9]+)([.][A-Za-z0-9]+)*$');

/**
 * @ignore
 */
const actionTypeRegex = new RegExp('^@@([A-Za-z0-9]+)(([.]([A-Za-z0-9]+))+)@@$');

/**
 * Model options are used for initialising a [[Model]] instance.
 */
export interface ModelOptions {
  /**
   * The namespace of a model will prefix all its reducers and effects' action types. This value must be unique
   * and, as a matter of fact, redux-data-model will enforce it. The namespace is effectively an object's path
   * in which the state will be stored, which can introduce new nesting levels in the store. This might be
   * useful if you need to put redux-data-model's data somewhere else that not on the root level of the store.
   *
   * @example namespace: 'pageA'
   * @example namespace: 'pageB'
   * @example namespace: 'projectA.pageA'
   * @example namespace: 'projectA.pageB'
   */
  namespace: string;
  /**
   * State represents the initial state of the model's reducer.
   *
   * @example state: 0
   * @example state: []
   * @example state: {
   *   userIds: [],
   *   loadingById: {},
   *   userById: {},
   * }
   */
  state: State;
  /**
   * Selectors are functions that receive the entire state and returns a piece of it. The first argument
   * of a selector function is the namespaced state, following by any other positional arguments passed
   * in an eventual call within a mapStateToProps. Last but not least, the last argument is the entire
   * redux state, which might be necessary when normalizing data. By default selectors won't memoize the
   * returned data, which can be useful to avoid any re-renders caused by shallow comparing its variables.
   * Although that's possible, a different syntax is needed. For such, a selector should be specified as an
   * array of N input selector functions, being N a positive number higher than one, and a result function,
   * which can apply more expensive transformations to any of the selectors data it has access to. This will
   * work in a way that the result function will be memoized, as long as a shallow comparison of the return
   * values of the input selectors evaluates to true. Redux-data-model uses
   * [reselect](https://github.com/reduxjs/reselect) under the hood for that.
   *
   * @example count: (state) => state,
   * @example userIds: (state, allState) => allState.modelNamespace.userIds,
   * @example userById: (state, userId) => state.userById[userId],
   * @example isLoading: (state, userId, allState) => allState.modelNamespace.loadingById[userId],
   * @example users: [
   *    state => state.userIds,
   *    state => state.userById,
   *    (userIds, userById) => userIds.map(id => userById[id])
   *  ],
   */
  selectors?: SelectorMap;
  /**
   * Reducers are functions used for synchronously changing the current state of a given model. A reducer will
   * be triggered whenever an action is dispatched, which contains a type equal to modelNamespace.reducerName.
   * A reducer function receives the entire state and the action as arguments respectively. It shouldn't return
   * data, like vanilla reducers. Instead it should change the state argument in place. Redux-data-model uses
   * [immer](https://github.com/immerjs/immer) under the hood, which means that the state is made immutable
   * by tracking property access.
   *
   * @example
   * increment(state, action) {
   *   state.count += 1;
   * }
   * @example
   * decrement: (state, action) => {
   *   state.count -= 1;
   * }
   * @example
   * saveUser(state, { data, userId }) {
   *   state.userIds.append(userId);
   *   state.loadingById[userId] = false;
   *   state.userById[userId] = data;
   * }
   */
  reducers?: ReducerMap;
  /**
   * Effects are functions used for performing asynchronous state changes. An effect will be triggered whenever
   * an action is dispatched, which contains an actionType equal to modelNamespace.effectName. They are wrapped
   * by a [takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect, from
   * [redux-saga](https://redux-saga.js.org/). An effect function receives an action, an object with saga's
   * effects, and the action creators as arguments respectively. For a list of saga's effects available to you see
   * [this](https://redux-saga.js.org/docs/api/#effect-creators).
   * The saga effects won't include take, takeMaybe, takeLeading, takeLatest, takeEvery, debounce, and throttle
   * effects. If you intend to use those look for [[ModelOptions.blockingEffects|blocking effects]] instead.
   *
   * @example
   * *fetchPostsByUser({ userId }, sagaEffects, actionCreators) {
   *   try {
   *     const data = yield sagaEffects.call(fetchApi, `http://jsonplaceholder.typicode.com/posts/?user=${userId}`);
   *     yield sagaEffects.put(actionCreators.saveUser({data, userId}));
   *   } catch (error) {
   *     console.log(error)
   *   }
   * },
   */
  effects?: EffectMap;
  /**
   * Blocking effects are functions used for defining when/how [[ModelOptions.effects|normal effects]] will be
   * executed. By default, effects are wrapped by a
   * [takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect, from
   * [redux-saga](https://redux-saga.js.org/), which means that every dispatched action will be taken into account.
   * That behavior can be overridden though as long as the same name is kept, as used in the effect.
   * Alternatives to the [takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect are
   * [takeLeading](https://redux-saga.js.org/docs/api/#takeleadingpattern-saga-args),
   * [takeLatest](https://redux-saga.js.org/docs/api/#takelatestpattern-saga-args),
   * [debounce](https://redux-saga.js.org/docs/api/#debouncepattern-saga-args),
   * and [throttle](https://redux-saga.js.org/docs/api/#throttlepattern-saga-args) effects. In can fact you can even
   * build your own using loops and the [take](https://redux-saga.js.org/docs/api/#takepattern-saga-args) effect.
   *
   * @example
   * *fetchPostsByUser(actionType, blockingSagaEffects, modelEffects) {
   *   yield blockingSagaEffects.debounce(300, actionType, modelEffects.fetchPostsByUser);
   * },
   */
  blockingEffects?: BlockingEffectMap;
}

/**
 * Models are the most basic data structure/abstraction in this library. They require a set of options to be
 * provided when initializing them. The model will be used to generate the action types, actions, reducers,
 * dispatchers, and sagas, based on the [[ModelOptions|model's options]] that were provided.
 */
export class Model {

  /**
   * Whether [[ModelNotReduxInitializedError]] and [[ModelNotSagaInitializedError]] should be thrown when the model
   * is used without it being integrated with Redux/Saga yet. Normally you only want to disable initialization
   * checks in your tests.
   */
  static disableInitializationChecks = false;

  private _isReduxInitialized: boolean;
  private _isSagaInitialized: boolean;
  private readonly _namespace: string;
  private readonly _state: State;
  private readonly _selectors?: SelectorMap;
  private readonly _reducers?: ReducerMap;
  private readonly _effects?: EffectMap;
  private readonly _blockingEffects?: BlockingEffectMap;

  /**
   * Creates a model instance.
   *
   * @example
   * const counterModel = new Model({
   *   namespace: 'counter',
   *   state: {
   *      count: 0,
   *   },
   *   selectors: {
   *       count: (state) => state.count,
   *   },
   *   reducers: {
   *      increment(state, action) {
   *        state.count += 1;
   *      },
   *      decrement(state, action) {
   *        state.count -= 1;
   *      },
   *   },
   *  // effects: {...}
   *  // blockingEffects: {...}
   * });
   *
   * @param options A model's options.
   * @throws [[NamespaceIsntAStringError]] When namespace isn't a string.
   * @throws [[EmptyNamespaceError]] When namespace is an empty string.
   * @throws [[InvalidNamespaceError]] When namespace has invalid characters.
   * @throws [[DuplicatedActionTypesError]] When reducer and/or effect action types are duplicated.
   * @throws [[BlockingEffectWithoutMatchingEffectError]] When blocking effect action types don't have a matching
   *                                                      effect action type.
   */
  public constructor(options: ModelOptions) {
    this._isReduxInitialized = false;
    this._isSagaInitialized = false;
    this._namespace = options.namespace;
    this._state = options.state;
    this._selectors = options.selectors || {};
    this._reducers = options.reducers || {};
    this._effects = options.effects || {};
    this._blockingEffects = options.blockingEffects || {};

    const effectActionTypes = [...keys(this._effects)];
    const blockingEffectActionTypes = [...keys(this._blockingEffects)];
    const reducerAndEffectActionTypes = [].concat(...keys(this._reducers)).concat(effectActionTypes);

    if (!isString(this._namespace)) {
      throw new NamespaceIsntAStringError(this);
    }

    if (size(this._namespace) < 1) {
      throw new EmptyNamespaceError();
    }

    if (!namespaceRegex.test(this._namespace)) {
      throw new InvalidNamespaceError(namespaceRegex);
    }

    if (uniq(reducerAndEffectActionTypes).length !== reducerAndEffectActionTypes.length) {
      throw new DuplicatedActionTypesError(this, reducerAndEffectActionTypes);
    }

    if (!isEmpty(difference(blockingEffectActionTypes, effectActionTypes))) {
      throw new BlockingEffectWithoutMatchingEffectError(this, effectActionTypes);
    }

    this.actionTypes = memoize(this.actionTypes.bind(this));
    this.actionCreators = memoize(this.actionCreators.bind(this));
    this.modelSelectors = memoize(this.modelSelectors.bind(this));
    this.modelReducers = memoize(this.modelReducers.bind(this));
    this.modelEffects = memoize(this.modelEffects.bind(this));
  }

  /**
   * @ignore
   */
  public actionType(actionName: string): string {
    return actionTypeRegex.test(actionName) ? actionName : `@@${this._namespace}.${actionName}@@`;
  }

  /**
   * Returns an object with action creators, one for each of the declared [[ModelOptions.reducers|reducers]] and
   * [[ModelOptions.effects|effects]]. Only useful for testing purposes, read the docs section on testing for
   * more info, or when you need to process actions from a different model's
   * [[ModelOptions.reducers|reducers]]/[[ModelOptions.effects|effects]]. Being the latter a common
   * approach when dispatching another model's actions within your [[ModelOptions.effects|effects]].
   *
   * @returns An action creator's map object.
   */
  public actionCreators(): ActionCreatorsMapObject {
    const actions = {};

    const actionCreatorBuilder = actionName => (
      payload: object = {}, __actionInternals: ActionInternalsObject=undefined,
    ) => {
      if (!this.isReduxInitialized && !Model.disableInitializationChecks) {
        throw new ModelNotReduxInitializedError(this);
      }

      if (!this.isSagaInitialized && !Model.disableInitializationChecks) {
        throw new ModelNotSagaInitializedError(this);
      }

      return actionCreator(this.actionType(actionName), payload, __actionInternals);
    };

    for (const reducerName in this._reducers) {
      actions[reducerName] = actionCreatorBuilder(reducerName);
      actions[reducerName].isEffect = false;
    }

    for (const effectName in this._effects) {
      actions[effectName] = actionCreatorBuilder(effectName);
      actions[effectName].isEffect = true;
    }

    return actions;
  }

  /**
   * Returns an object with action types, one for each of the declared [[ModelOptions.reducers|reducers]] and
   * [[ModelOptions.effects|effects]]. Only useful for testing purposes, read the docs section on testing for
   * more info, or when you need to process actions from a different model's
   * [[ModelOptions.reducers|reducers]]/[[ModelOptions.effects|effects]]. Being the latter a common
   * approach when normalising data.
   *
   * @returns An action type's map object.
   */
  public actionTypes(): ActionTypesMapObject {
    const actionsTypes = {};

    for (const reducerName in this._reducers) {
      actionsTypes[reducerName] = this.actionType(reducerName);
    }

    for (const effectName in this._effects) {
      actionsTypes[effectName] = this.actionType(effectName);
    }

    return actionsTypes;
  }

  /**
   * @ignore
   */
  public modelSelectors(): SelectorModelMap {
    const selectors = {};

    const namespacedSelectorFuncCreator = inputFunc => (allState, ...args) => {
      const namespacedState = get(allState, this._namespace);
      return inputFunc(namespacedState, ...args, allState);
    };

    const resultFuncCreator = resultFunc => (...args) => {
      if (!this.isReduxInitialized && !Model.disableInitializationChecks) {
        throw new ModelNotReduxInitializedError(this);
      }

      return resultFunc(...args);
    };

    for (const [selectorName, selectorFunc] of toPairs(this._selectors)) {
      let inputSelectorFuncs;
      let resultFunc;

      if (isArray<SelectorFunction>(selectorFunc)) {
        inputSelectorFuncs = selectorFunc.slice(0, -1).map(namespacedSelectorFuncCreator);
        resultFunc = selectorFunc.slice(-1).map(resultFuncCreator)[0];
      } else {
        inputSelectorFuncs = [namespacedSelectorFuncCreator(selectorFunc)];
        resultFunc = resultFuncCreator(identity);
      }

      selectors[selectorName] = createSelector(inputSelectorFuncs, resultFunc);
    }

    return selectors;
  }

  /**
   * @ignore
   */
  public modelReducers(): Reducer<unknown, AnyAction> {
    const reducers = {};
    const actionTypes = this.actionTypes();

    for (const [reducerName, reducerFunc] of toPairs(this._reducers)) {
      const actionType = actionTypes[reducerName];
      reducers[actionType] = reducerFunc;
    }

    return produce((draft: object, action: ActionWithInternals) => {
      const reducerFunc = get(reducers, action.type, defaultReducer);
      reducerFunc(draft, action.payload);
    }, this._state);
  }

  /**
   * @ignore
   */
  public modelEffects(): EffectModelMap {
    const effects = {};
    const effectSagas = {};
    const actionTypes = this.actionTypes();
    const actionCreators = this.actionCreators();

    for (const [effectName, effectFunc] of toPairs(this._effects)) {
      const actionType = actionTypes[effectName];
      const effectSaga = modelBlockingGenerator(
        function *(payload: object = {}) { yield* effectFunc(payload, sagaEffects, actionCreators); }
      );

      effectSagas[effectName] = effectSaga;
      effects[effectName] = function* () { yield blockingEffectTakeEvery(actionType, effectSaga); };
    }

    for (const [effectName, blockingEffectFunc] of toPairs(this._blockingEffects)) {
      const actionType = actionTypes[effectName];
      effects[effectName] = function* () { yield* blockingEffectFunc(actionType, blockingSagaEffects, effectSagas); };
    }

    return effects;
  }

  /**
   * Returns an array of sagas, one for each of the declared
   * [[ModelOptions.effects|normal effects]]/[[ModelOptions.blockingEffects|blocking effects]].
   * [[ModelOptions.effects|Normal effects]] will default to taking every action and calling its respective effect,
   * unless overridden by a [[ModelOptions.blockingEffects|blocking effect]].
   *
   * @throws [[NonCompatibleActionError]] When [[bindModelActionCreators]] was not used to bind the action creators.
   * @returns An array of sagas.
   */
  public get reduxSagas(): Saga[] {
    const reduxSagas = [];

    for (const modelEffectFunc of values(this.modelEffects())) {
      reduxSagas.push(modelEffectFunc);
    }

    return reduxSagas;
  }

  /**
   * Returns whether the model was initialized on a [[combineModelReducers]] call.
   *
   * @returns A boolean.
   */
  public get isReduxInitialized(): boolean {
    return this._isReduxInitialized;
  }

  /**
   * Returns whether the model was initialized on a [[modelRootSaga]] call.
   *
   * @returns A boolean.
   */
  public get isSagaInitialized(): boolean {
    return this._isSagaInitialized;
  }

  /**
   * Returns the [[ModelOptions.namespace|namespace]] as provided in the [[Model.constructor|constructor]].
   *
   * @returns A string.
   */
  public get namespace(): string {
    return this._namespace;
  }

  /**
   * Returns the [[ModelOptions.state|initial state]] as provided in the [[Model.constructor|constructor]].
   *
   * @returns An initial state.
   */
  public get state(): State {
    return this._state;
  }

  /**
   * Returns the [[ModelOptions.selectors|selectors]] as provided in the [[Model.constructor|constructor]].
   *
   * @returns A selectors map.
   */
  public get selectors(): SelectorMap {
    return this._selectors;
  }

  /**
   * Returns the [[ModelOptions.reducers|reducers]] as provided in the [[Model.constructor|constructor]].
   *
   * @returns A reducer function.
   */
  public get reducers(): ReducerMap {
    return this._reducers;
  }

  /**
   * Returns the [[ModelOptions.effects|effects]] as provided in the [[Model.constructor|constructor]].
   *
   * @returns An effect map.
   */
  public get effects(): EffectMap {
    return this._effects;
  }

  /**
   * Returns the [[ModelOptions.blockingEffects|blocking effects]] as provided in the [[Model.constructor|constructor]].
   *
   * @returns A blocking effect map.
   */
  public get blockingEffects(): BlockingEffectMap {
    return this._blockingEffects;
  }

  /**
   * @ignore
   */
  public markAsReduxInitialized() {
    this._isReduxInitialized = true;
  }

  /**
   * @ignore
   */
  public markAsSagaInitialized() {
    this._isSagaInitialized = true;
  }
}
