import {AnyAction, Dispatch} from 'redux';
import {Action} from "react-redux";

export interface ActionCreator<A> {
  (...args: any[]): A;
  isEffect: boolean;
}

interface ActionCreatorsMapObject<A = any> {
  [key: string]: ActionCreator<A>;
}

type SelectorFunction = (state: State, ...arguments: any[]) => any;
type ReducerFunction = (state: State, action: AnyAction) => void;
type EffectFunction = (actionData: object, sagaEffects: any, actionCreators: ActionCreatorsMapObject) => any;

type State = any;
type SelectorMap = Record<string, SelectorFunction>;
type ReducerMap = Record<string, ReducerFunction>;
type EffectMap = Record<string, EffectFunction>;

type SelectorModelFunction = (state: State, ...arguments: any[]) => any;
type EffectModelFunction = (actionData: object) => any;

type SelectorModelMap = Record<string, SelectorModelFunction>;
type EffectModelMap = Record<string, EffectModelFunction>;

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
