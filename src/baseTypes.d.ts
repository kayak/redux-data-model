import {AnyAction, Dispatch} from 'redux';
import {Action, ActionCreatorsMapObject} from "react-redux";

type SelectorFunction = (state: object, ...arguments: any[]) => any;
type ReducerFunction = (state: object, action: AnyAction) => void;
type EffectFunction = (state: object, ...arguments: any[]) => any;

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

interface ModelOptions {
  namespace: string;
  state: Record<string, any>;
  selectors?: Record<string, SelectorFunction>;
  reducers?: Record<string, ReducerFunction>;
  effects?: Record<string, EffectFunction>;
}
