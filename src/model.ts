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
import {EffectFunction, ModelOptions, ReducerFunction, SelectorFunction} from './baseTypes';

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

export class Model {
  public readonly namespace: string;
  public readonly state: Record<string, any>;
  public readonly modelSelectors?: Record<string, SelectorFunction>;
  public readonly modelReducers?: Record<string, ReducerFunction>;
  public readonly modelEffects?: Record<string, EffectFunction>;

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
