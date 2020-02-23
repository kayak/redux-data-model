import {AnyAction, Dispatch} from 'redux';
import {Action} from "react-redux";
import {ActionInternalsObject} from "./utils";
import {Saga} from '@redux-saga/core';

export interface ActionCreator<A> {
  (payload: object, __actionInternals?: ActionInternalsObject): A;
  type: string;
  isEffect: boolean;
}

export interface SagaWithType extends Saga {
  type: string;
}

interface ActionCreatorsMapObject<A = any> {
  [key: string]: ActionCreator<A>;
}

interface EffectMapObject {
  [key: string]: EffectFunction;
}

type SelectorFunction = (state: State, ...arguments: any[]) => any;
type ReducerFunction = (state: State, action: AnyAction) => void;
type EffectFunction = (actionData: object, sagaEffects: any, actionCreators: ActionCreatorsMapObject) => any;
type BlockingEffectFunction = (actionType: string, blockingSagaEffects: any, modelEffects: EffectMapObject) => any;

type State = any;
type SelectorMap = Record<string, SelectorFunction | Array<SelectorFunction>>;
type ReducerMap = Record<string, ReducerFunction>;
type EffectMap = Record<string, EffectFunction>;
type BlockingEffectMap = Record<string, BlockingEffectFunction>;

type SelectorModelFunction = (state: State, ...arguments: any[]) => any;
type EffectModelFunction = (actionData: object) => any;

type SelectorModelMap = Record<string, SelectorModelFunction>;
type EffectModelMap = ActionCreatorsMapObject;

// Ideally value would be ActionCreator<any> | NamespacedActionCreatorsMapObject, but that creates circular references
type NamespacedActionCreatorsMapObject = Record<string, any>;
// Ideally value would be SelectorFunction | NamespacedSelectorsMapObject, but that creates circular references
type NamespacedSelectorsMapObject = Record<string, any>;

type BoundActionCreatorThatReturnsAPromise = (actionData: object) => Promise<any>;

// Ideally value would be BoundActionCreatorThatReturnsAPromise | BoundNamespacedActionCreatorsMapObject, but
// that creates circular references
type BoundNamespacedActionCreatorsMapObject = Record<string, any>;

type MapDispatchToPropsWithActionCreatorsFunction<TDispatchProps, TOwnProps> =
    (
      dispatch: Dispatch<Action>,
      ownProps: TOwnProps,
      modelActionCreators: NamespacedActionCreatorsMapObject,
      subscriberActionCreators: NamespacedActionCreatorsMapObject,
    ) => TDispatchProps;
type MapDispatchToPropsWithActionCreators<TDispatchProps, TOwnProps> =
    MapDispatchToPropsWithActionCreatorsFunction<TDispatchProps, TOwnProps> | TDispatchProps;

type MapStateToPropsWithSelectors<TStateProps, TOwnProps, State> =
    (
      state: State,
      ownProps: TOwnProps,
      modelSelectors: NamespacedSelectorsMapObject,
    ) => TStateProps;

interface ActionInternals {
  resolve: Function;
  reject: Function;
}

interface ActionWithInternals {
  type: string;
  payload: any;
  __actionInternals: ActionInternals;
}
