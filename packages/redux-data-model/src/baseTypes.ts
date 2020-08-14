import {AnyAction, Dispatch} from 'redux';
import {ActionInternalsObject} from "./utils";
import {Saga} from 'redux-saga';

export interface ActionCreator<A> {
  (payload?: object, __actionInternals?: ActionInternalsObject): A;
  isEffect: boolean;
}

export interface ActionCreatorsMapObject<A = any> {
  [key: string]: ActionCreator<A>;
}

export interface ActionTypesMapObject {
  [key: string]: string;
}

export interface EffectMapObject {
  [key: string]: EffectModelFunction;
}

export type SelectorFunction<State> = (state: State, ...args: any[]) => any;
export type ReducerFunction<State> = (state: State, action: AnyAction) => void;
export type EffectFunction<Effects> = (
  actionData: any, sagaEffects: Effects, actionCreators: ActionCreatorsMapObject,
) => any;
export type BlockingEffectFunction<Effects> = (
  actionType: string, blockingSagaEffects: Effects, modelEffects: EffectMapObject,
) => any;

export type SelectorMap<State> = Record<string, SelectorFunction<State> | Array<SelectorFunction<State>>>;
export type ReducerMap<State> = Record<string, ReducerFunction<State>>;
export type EffectMap<Effects> = Record<string, EffectFunction<Effects>>;
export type BlockingEffectMap<Effects> = Record<string, BlockingEffectFunction<Effects>>;

export type SelectorModelFunction<State> = (state: State, ...args: any[]) => any;
export type EffectModelFunction = (actionData?: any) => any;

export type SelectorModelMap<State> = Record<string, SelectorModelFunction<State>>;
export type EffectModelMap = Record<string, Saga>;

// Ideally value would be ActionCreator<any> | NamespacedActionCreatorsMapObject, but that creates circular references
export type NamespacedActionCreatorsMapObject = Record<string, any>;
export type NamespacedDispatchersMapObject = Record<string, any>;
// Ideally value would be SelectorFunction | NamespacedSelectorsMapObject, but that creates circular references
export type NamespacedSelectorsMapObject = Record<string, any>;

// Ideally value would be BoundActionCreatorThatReturnsAPromise | BoundNamespacedActionCreatorsMapObject, but
// that creates circular references
export type BoundNamespacedActionCreatorsMapObject = Record<string, any>;

export type MapDispatchToPropsWithActionCreatorsFunction<TDispatchProps, TOwnProps> =
    (
      dispatch: Dispatch<AnyAction>,
      ownProps: TOwnProps,
      dispatchers: NamespacedDispatchersMapObject,
    ) => TDispatchProps;
export type MapDispatchToPropsWithActionCreators<TDispatchProps, TOwnProps> =
    MapDispatchToPropsWithActionCreatorsFunction<TDispatchProps, TOwnProps> | TDispatchProps;

export type MapStateToPropsWithSelectors<TStateProps, TOwnProps, State> =
    (
      state: State,
      ownProps: TOwnProps,
      modelSelectors: NamespacedSelectorsMapObject,
    ) => TStateProps;

export interface ActionInternals {
  resolve: Function;
  reject: Function;
}

export interface ActionWithInternals {
  type: string;
  payload: any;
  __actionInternals: ActionInternals;
}
