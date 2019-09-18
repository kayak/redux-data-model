import produce from 'immer';
import {get, toPairs,} from 'lodash';
import {ActionCreatorsMapObject, AnyAction, Reducer} from 'redux';
import {Saga} from '@redux-saga/core';
import {
  actionChannel,
  all,
  apply,
  call,
  cancel,
  cancelled,
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
  takeMaybe,
  throttle,
} from 'redux-saga/effects'
import {createSelector} from 'reselect';
import {EffectFunction, ReducerFunction, SelectorFunction} from './baseTypes';

/**
 * @ignore
 */
export const sagaEffects = {
  actionChannel,
  all,
  apply,
  call,
  cancel,
  cancelled,
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
  takeMaybe,
  throttle,
};

const defaultReducer = (
  state,
  // @ts-ignore
  // eslint-disable @typescript-eslint/no-unused-vars
  action,
) => state;

/**
 * Model options are used for initialising a [[Model]] instance.
 */
export interface ModelOptions {
  /**
   * The namespace of a model will prefix all its reducers and effects' action types. This value must be unique
   * and, as a matter of fact, resux will enforce it.
   *
   * @example namespace: 'pageA'
   * @example namespace: 'pageB'
   */
  namespace: string;
  /**
   * State represents the initial state of the model's reducer.
   *
   * @example state: 0
   * @example state: []
   * @example state: {
   *     isLoading: {},
   *     data: {},
   * }
   */
  state: Record<string, any>;
  /**
   * Selectors are functions that receive the entire state and returns a piece of it or, perhaps transform it.
   * Selectors will memoize the returned data, in order to avoid any re-renders caused by shallow
   * comparing its variables. The first argument of a selector function is the state, then following by any
   * other arguments passed in an eventual mapStateToProps. Last but not least, an object with the selectors
   * for the model in question is implicitly provided, so that selectors can be composed.
   *
   * @example count: (state) => state,
   * @example userIds: (state, modelSelectors) => modelSelectors.userIds(state),
   * @example user: (state, userId) => state[0],
   * @example isLoading: (state, userId, modelSelectors) => modelSelectors.isLoading(state, userId),
   *
   */
  selectors?: Record<string, SelectorFunction>;
  /**
   * Reducers are functions used for synchronously changing the current state of a given model. A reducer will
   * be triggered whenever an action is dispatched, which contains a type equal to modelNamespace.reducerName.
   * A reducer function receives the entire state and the action as arguments respectively. It shouldn't return
   * data, like vanilla reducers. Instead it should change the state argument in place. Resux uses
   * [immer](https://github.com/immerjs/immer) under the hood, which means that the state is made immutable
   * by tracking property access.
   *
   * @example
   * increment(state, {}) {
   *   state.count += 1;
   * }
   * @example
   * decrement: (state, {}) => {
   *   state.count -= 1;
   * }
   * @example
   * saveData(state, { data, userId }) {
   *   state.isLoading[userId] = false;
   *   state.data[userId] = data;
   * }
   */
  reducers?: Record<string, ReducerFunction>;
  /**
   * Effects are functions used for performing asynchronous state changes. An effect will be triggered whenever
   * an action is dispatched, which contains an actionType equal to modelNamespace.effectName. They are wrapped
   * by a [takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect, from redux-saga.
   * An effect function receives an action and an object with redux saga's effects as arguments respectively.
   * The saga effects won't include takeLeading, takeLatest, and takeEvery blocking effects. For using those
   * employ a Subscriber instead.
   *
   * @example
   * *fetchPostsByUser({ userId }, { call, put }) {
   *   try {
   *     const data = yield call(fetchApi, `http://jsonplaceholder.typicode.com/posts/?user=${userId}`);
   *     yield put({type: "posts.savePostsByUser", data, userId});
   *   } catch (error) {
   *     console.log(error)
   *   }
   * },
   */
  effects?: Record<string, EffectFunction>;
}

/**
 * Models are the most basic data structure/abstraction in this library. They require a set of options to be
 * provided when initializing them. The model will be used to generate the action types, actions, reducers,
 * dispatchers, and sagas, based on the model's options that were provided.
 */
export class Model {
  public readonly namespace: string;
  public readonly state: Record<string, any>;
  /**
   * @ignore
   */
  public readonly modelSelectors?: Record<string, SelectorFunction>;
  /**
   * @ignore
   */
  public readonly modelReducers?: Record<string, ReducerFunction>;
  /**
   * @ignore
   */
  public readonly modelEffects?: Record<string, EffectFunction>;

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
   *       count: (state) => state.counter.count,
   *   },
   *   reducers: {
   *      increment(state, {}) {
   *        state.count += 1;
   *      },
   *        decrement(state, {}) {
   *        state.count -= 1;
   *      },
   *   },
   *  // effects: {...}
   * });
   *
   * @param options A model's options.
   */
  public constructor(options: ModelOptions) {
    this.namespace = options.namespace;
    this.state = options.state;
    this.modelSelectors = options.selectors || {};
    this.modelReducers = options.reducers || {};
    this.modelEffects = options.effects || {};

    this.selectors = this.selectors.bind(this);
    this.reducers = this.reducers.bind(this);
    this.effects = this.effects.bind(this);
  }

  /**
   * @ignore
   */
  public actionType(actionName: string): string {
    return `${this.namespace}.${actionName}`;
  }

  /**
   * @ignore
   */
  public actionCreator(actionName: string, actionData: object = {}): AnyAction {
    return {...actionData, type: this.actionType(actionName)};
  }

  /**
   * Returns an object with action creators, one for each of the declared reducers and effects. Only useful for
   * testing purposes, read the docs section on testing for more info. Also supports the inner workings of this
   * class.
   *
   * @returns an action creator's map object.
   */
  public actionCreators(): ActionCreatorsMapObject {
    const actions = {};

    for (const reducerName in this.modelReducers) {
      actions[reducerName] = (actionData: object = {}) => this.actionCreator(reducerName, actionData);
    }

    for (const effectName in this.modelEffects) {
      actions[effectName] = (actionData: object = {}) => this.actionCreator(effectName, actionData);
    }

    return actions;
  }

  /**
   * @ignore
   */
  public selectors(): Record<string, SelectorFunction> {
    const selectors = {};

    for (const [selectorName, selectorFunc] of toPairs(this.modelSelectors)) {
      selectors[selectorName] = createSelector([selectorFunc], data => data);
    }

    return selectors;
  }

  /**
   * @ignore
   */
  public reducers(): Reducer<unknown, AnyAction> {
    const reducers = {};

    for (const [reducerName, reducerFunc] of toPairs(this.modelReducers)) {
      const actionType = this.actionType(reducerName);
      reducers[actionType] = reducerFunc;
    }

    return produce((draft: object, action: AnyAction) => {
      const reducerFunc = get(reducers, action.type, defaultReducer);
      reducerFunc(draft, action);
    }, this.state);
  }

  /**
   * @ignore
   */
  public effects(): Record<string, EffectFunction> {
    const effects = {};

    for (const [effectName, effectFunc] of toPairs(this.modelEffects)) {
      effects[effectName] = (actionData: object = {}) => effectFunc(actionData, sagaEffects);
    }

    return effects;
  }

  /**
   * Returns an array of sagas, one for each of the declared effects. They will default to taking every action and
   * calling its respective effect. For taking only latest or leading actions, at any given moment, look for
   * subscribers instead.
   *
   * @returns An array of sagas.
   */
  public get reduxSagas(): Saga[] {
    const reduxSagas = [];

    for (const [effectName, effectFunc] of toPairs(this.effects())) {
      const actionType = this.actionType(effectName);
      reduxSagas.push(function *() {
        yield blockingEffectTakeEvery(actionType, effectFunc);
      });
    }

    return reduxSagas;
  }
}
