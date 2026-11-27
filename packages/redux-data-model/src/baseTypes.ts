import {AnyAction, Dispatch} from 'redux';
import {Saga} from 'redux-saga';

export type ActionType = string;

type IsAny<T> = 0 extends 1 & T ? true : false;

export type ResultOf<Results, Key> = IsAny<Results> extends true
  ? any
  : Key extends keyof Results ? Results[Key] : any;

type ActionResult<Results, Key> = IsAny<Results> extends true
  ? any
  : Key extends keyof Results ? Promise<Results[Key]> : any;

export interface ActionInternals {
  resolve: (result: any) => void;
  reject: (error: any) => void;
}

export interface ActionCreator<A> {
  (payload?: Record<string, unknown>, __actionInternals?: ActionInternals): A;
  isEffect: boolean;
}

export type ActionTypesMapObject<Payloads=any> = {
  [key in keyof Payloads]: ActionType;
};

export interface EffectMapObject {
  [key: string]: EffectModelFunction;
}

export type ActionCreatorsMapObject<Payloads=any> = {
  [key in keyof Payloads]: (payload?: Payloads[key]) => any;
};

interface ActionWithPayload<PayloadAction> extends AnyAction {
  payload: PayloadAction;
  [key: string]: any;
}

export type SelectorFunction<State, Props, Result=any> = (state: State, props: Props, allState: any) => Result;
export type ReducerFunction<State, PayloadAction> = (
  state: State, payload: PayloadAction, action: ActionWithPayload<PayloadAction>
) => void;
// A declared result makes the effect a generator, so saga helpers like `testSaga` accept it
export type EffectFunction<Effects, ReducerPayloads, PayloadAction, Result=any> = (
  actionData: PayloadAction,
  sagaEffects: Effects,
  actionCreators: ActionCreatorsMapObject<ReducerPayloads>,
) => IsAny<Result> extends true ? any : Generator<any, Result, any>;
export type BlockingEffectFunction<Effects, ActionType, ModelEffect> = (
  actionType: ActionType, blockingSagaEffects: Effects, modelEffects: ModelEffect,
) => any;

export type SelectorMap<State, SelectorPayloads, SelectorResults=any> = {
  [key in keyof SelectorPayloads]: (
    SelectorFunction<State, SelectorPayloads[key], ResultOf<SelectorResults, key>> |
    Array<SelectorFunction<State, SelectorPayloads[key]>>
  );
};
export type ReducerMap<State, ReducerPayloads> = {
  [key in keyof ReducerPayloads]: ReducerFunction<State, ReducerPayloads[key]>;
};
export type EffectMap<Effects, ReducerPayloads, EffectPayloads, EffectResults=any> = {
  [key in keyof EffectPayloads]: EffectFunction<
    Effects, ReducerPayloads, EffectPayloads[key], ResultOf<EffectResults, key>
  >;
};
export type BlockingEffectMap<Effects, EffectPayloads> = {
  [key in keyof EffectPayloads]: BlockingEffectFunction<Effects, key, {
    [key in keyof EffectPayloads]: Saga
  }>;
};

export type SelectorModelFunction<State, SelectorPayload, Result=any> = (
  state: State, props?: SelectorPayload,
) => Result;
export type EffectModelFunction = (actionData?: any) => any;

export type SelectorModelMap<State, SelectorPayloads, SelectorResults=any> = {
  [key in keyof SelectorPayloads]: SelectorModelFunction<
    State, SelectorPayloads[key], ResultOf<SelectorResults, key>
  >;
};
export type EffectModelMap = Record<string, Saga>;

// Ideally value would be ActionCreator<any> | NamespacedActionCreatorsMapObject, but that creates circular references
export type NamespacedActionCreatorsMapObject = Record<string, any>;
export type NamespacedDispatchersMapObject = Record<string, any>;
// Ideally value would be SelectorFunction | NamespacedSelectorsMapObject, but that creates circular references
export type NamespacedSelectorsMapObject = Record<string, any>;

// Results default to `any` rather than `Promise<any>`, so callers like `useEffect(() => fetchX(), [])` keep compiling
// Ideally value would be BoundActionCreatorThatReturnsAPromise | BoundNamespacedActionCreatorsMapObject, but
// that creates circular references
export type BoundNamespacedActionCreatorsMapObject<Payloads=any, Results=any> = {
  [key in keyof Payloads]: (payload?: Payloads[key]) => ActionResult<Results, key>;
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

export interface ActionWithInternals {
  type: string;
  payload: any;
  __actionInternals: ActionInternals;
}
