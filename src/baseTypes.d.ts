import {AnyAction, Dispatch} from 'redux';
import {Action, ActionCreatorsMapObject} from "react-redux";

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

type MapDispatchToPropsWithActionCreatorsFunction<TDispatchProps, TOwnProps> =
    (
      dispatch: Dispatch<Action>,
      ownProps: TOwnProps,
      modelActionCreators: ActionCreatorsMapObject,
      subscriberActionCreators: ActionCreatorsMapObject,
    ) => TDispatchProps;
type MapDispatchToPropsWithActionCreators<TDispatchProps, TOwnProps> =
    MapDispatchToPropsWithActionCreatorsFunction<TDispatchProps, TOwnProps> | TDispatchProps;

type MapStateToPropsWithSelectors<TStateProps, TOwnProps, State> =
    (
      state: State,
      ownProps: TOwnProps,
      modelSelectors: Record<string, SelectorFunction>
    ) => TStateProps;
