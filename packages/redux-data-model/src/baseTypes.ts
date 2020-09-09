import {AnyAction, Dispatch} from 'redux';
import {ActionInternalsObject} from "./utils";
import {Saga} from 'redux-saga';

export interface ActionCreator<A> {
  (payload?: object, __actionInternals?: ActionInternalsObject): A;
  isEffect: boolean;
}

export type ActionTypesMapObject<Payloads=any> = {
  [key in keyof Payloads]: string;
};

export interface EffectMapObject {
  [key: string]: EffectModelFunction;
}

export type ActionCreatorsMapObject<Payloads=any> = {
  [key in keyof Payloads]: (payload?: Payloads[key]) => any;
};

interface ActionWithPayload<PayloadAction> extends AnyAction {
  payload: PayloadAction;
};

export type SelectorFunction<State, Props> = (state: State, props: Props, allState: any) => any;
export type ReducerFunction<State, PayloadAction> = (
  state: State, payload: PayloadAction, action: ActionWithPayload<PayloadAction>
) => void;
export type EffectFunction<Effects, ReducerPayloads, PayloadAction> = (
  actionData: PayloadAction,
  sagaEffects: Effects,
  actionCreators: ActionCreatorsMapObject<ReducerPayloads>,
) => any;
export type BlockingEffectFunction<Effects, ActionType, ModelEffect> = (
  actionType: ActionType, blockingSagaEffects: Effects, modelEffects: ModelEffect,
) => any;

export type SelectorMap<State, SelectorPayloads> = {
  [key in keyof SelectorPayloads]: (
    SelectorFunction<State, SelectorPayloads[key]> | Array<SelectorFunction<State, SelectorPayloads[key]>>
  );
};
export type ReducerMap<State, ReducerPayloads> = {
  [key in keyof ReducerPayloads]: ReducerFunction<State, ReducerPayloads[key]>;
};
export type EffectMap<Effects, ReducerPayloads, EffectPayloads> = {
  [key in keyof EffectPayloads]: EffectFunction<Effects, ReducerPayloads, EffectPayloads[key]>;
};
export type BlockingEffectMap<Effects, EffectPayloads> = {
  [key in keyof EffectPayloads]: BlockingEffectFunction<Effects, key, {
    [key in keyof EffectPayloads]: Saga
  }>;
};

export type SelectorModelFunction<State, SelectorPayload> = (
  state: State, props?: SelectorPayload,
) => any;
export type EffectModelFunction = (actionData?: any) => any;

export type SelectorModelMap<State, SelectorPayloads> = {
  [key in keyof SelectorPayloads]: SelectorModelFunction<State, SelectorPayloads[key]>;
};
export type EffectModelMap = Record<string, Saga>;

// Ideally value would be ActionCreator<any> | NamespacedActionCreatorsMapObject, but that creates circular references
export type NamespacedActionCreatorsMapObject = Record<string, any>;
export type NamespacedDispatchersMapObject = Record<string, any>;
// Ideally value would be SelectorFunction | NamespacedSelectorsMapObject, but that creates circular references
export type NamespacedSelectorsMapObject = Record<string, any>;

// Ideally value would be BoundActionCreatorThatReturnsAPromise | BoundNamespacedActionCreatorsMapObject, but
// that creates circular references
export type BoundNamespacedActionCreatorsMapObject<Payloads=any> = {
  [key in keyof Payloads]: (payload?: Payloads[key]) => void;
};

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
