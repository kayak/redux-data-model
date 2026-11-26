import {Model} from '../src/model';
import {BoundNamespacedActionCreatorsMapObject} from '../src/baseTypes';
import {combineModelReducers} from '../src/redux';
import {modelRootSaga} from '../src/saga';

// Type-only checks: they are verified by tsc (lint:tsc) and ts-jest, the function is never executed.

type Equals<A, B> = (<T>() => T extends A ? 1 : 2) extends (<T>() => T extends B ? 1 : 2) ? true : false;
function expectType<_T extends true>() {}

interface Detail {
  id: number;
  name: string;
}

interface State {
  detailById: Record<number, Detail>;
}

interface SelectorPayloads {
  detailById: {id: number};
  ids: undefined;
}

interface ReducerPayloads {
  save: {detail: Detail};
}

interface EffectPayloads {
  fetchById: {id: number};
  refresh: undefined;
}

interface SelectorResults {
  detailById: Detail | undefined;
}

interface EffectResults {
  fetchById: boolean;
}

declare function fetchDetail(id: number): Promise<Detail>;

function typeChecks() {
  const modelOptions = {
    state: {detailById: {}},
    reducers: {
      save(state: State, {detail}: {detail: Detail}) {
        state.detailById[detail.id] = detail;
      },
    },
  };

  const untypedModel = new Model<State, SelectorPayloads, ReducerPayloads, EffectPayloads>({
    ...modelOptions,
    namespace: 'untyped',
    selectors: {
      detailById: (state, {id}) => state.detailById[id],
      ids: [(state) => state.detailById, (detailById) => Object.keys(detailById)],
    },
    effects: {
      *fetchById({id}, sagaEffects, actionCreators) {
        const detail: Detail = yield sagaEffects.call(fetchDetail, id);
        yield sagaEffects.put(actionCreators.save({detail}));
        return 'anything';
      },
      *refresh() {
        yield;
      },
    },
  });

  const untypedDetail = untypedModel.modelSelectors().detailById({} as any, {id: 1});
  expectType<Equals<typeof untypedDetail, any>>();

  const untypedActions = {} as BoundNamespacedActionCreatorsMapObject<ReducerPayloads & EffectPayloads>;
  const untypedFetch = untypedActions.fetchById({id: 1});
  expectType<Equals<typeof untypedFetch, any>>();
  untypedActions.fetchById({id: 1}).then(() => undefined);

  const typedModel = new Model<
    State, SelectorPayloads, ReducerPayloads, EffectPayloads, SelectorResults, EffectResults
  >({
    ...modelOptions,
    namespace: 'typed',
    selectors: {
      detailById: (state, {id}) => state.detailById[id],
      ids: [(state) => state.detailById, (detailById) => Object.keys(detailById)],
    },
    effects: {
      *fetchById({id}, sagaEffects, actionCreators) {
        const detail = yield sagaEffects.call(fetchDetail, id);
        yield sagaEffects.put(actionCreators.save({detail}));
        return true;
      },
      *refresh() {
        yield;
      },
    },
  });

  const typedEffect = typedModel.effects.fetchById({id: 1}, {} as any, {} as any);
  expectType<Equals<typeof typedEffect, Generator<any, boolean, any>>>();
  const untypedEffect = untypedModel.effects.fetchById({id: 1}, {} as any, {} as any);
  expectType<Equals<typeof untypedEffect, any>>();

  const typedSelectors = typedModel.modelSelectors();
  const typedDetail = typedSelectors.detailById({} as any, {id: 1});
  expectType<Equals<typeof typedDetail, Detail | undefined>>();
  // @ts-expect-error
  const _notANumber: number = typedSelectors.detailById({} as any, {id: 1});
  const undeclaredSelector = typedSelectors.ids({} as any);
  expectType<Equals<typeof undeclaredSelector, any>>();

  const typedActions = {} as BoundNamespacedActionCreatorsMapObject<
    ReducerPayloads & EffectPayloads, EffectResults
  >;
  const typedFetch = typedActions.fetchById({id: 1});
  expectType<Equals<typeof typedFetch, Promise<boolean>>>();
  const undeclaredEffect = typedActions.refresh();
  expectType<Equals<typeof undeclaredEffect, any>>();
  const reducerAction = typedActions.save({detail: {id: 1, name: 'name'}});
  expectType<Equals<typeof reducerAction, any>>();

  new Model<State, SelectorPayloads, ReducerPayloads, EffectPayloads, SelectorResults, EffectResults>({
    ...modelOptions,
    namespace: 'wrongResults',
    selectors: {
      // @ts-expect-error
      detailById: (state, {id}) => state.detailById[id].name,
      ids: (state) => Object.keys(state.detailById),
    },
    effects: {
      // @ts-expect-error
      *fetchById() {
        yield;
        return 'x';
      },
      *refresh() {
        yield;
      },
    },
  });

  combineModelReducers([untypedModel, typedModel]);
  modelRootSaga([untypedModel, typedModel]);

  return _notANumber;
}

describe('types', () => {
  it('compiles the type checks', () => {
    expect(typeChecks).toBeInstanceOf(Function);
  });
});
