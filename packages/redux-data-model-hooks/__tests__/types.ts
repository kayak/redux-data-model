import {Model} from 'redux-data-model';
import {useModelActions, useModelSelector} from '../src';

// Type-only checks: they are verified by tsc (lint:tsc) and ts-jest, the hooks are never executed.

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

const modelOptions = {
  state: {detailById: {}},
  selectors: {
    detailById: (state: State, {id}: {id: number}) => state.detailById[id],
    ids: (state: State) => Object.keys(state.detailById),
  },
  reducers: {
    save(state: State, {detail}: {detail: Detail}) {
      state.detailById[detail.id] = detail;
    },
  },
  effects: {
    *fetchById() {
      yield;
      return true;
    },
    *refresh() {
      yield;
    },
  },
};

async function typeChecks() {
  const untypedModel = new Model<State, SelectorPayloads, ReducerPayloads, EffectPayloads>({
    ...modelOptions,
    namespace: 'untyped',
  });

  const untypedDetail = useModelSelector(untypedModel, (state, selectors) => selectors.detailById(state, {id: 1}));
  expectType<Equals<typeof untypedDetail, any>>();

  const untypedActions = useModelActions(untypedModel);
  const untypedFetch = untypedActions.fetchById({id: 1});
  expectType<Equals<typeof untypedFetch, any>>();
  untypedActions.fetchById({id: 1}).then(() => undefined);

  const typedModel = new Model<
    State, SelectorPayloads, ReducerPayloads, EffectPayloads, SelectorResults, EffectResults
  >({
    ...modelOptions,
    namespace: 'typed',
  });

  const typedDetail = useModelSelector(typedModel, (state, selectors) => selectors.detailById(state, {id: 1}));
  expectType<Equals<typeof typedDetail, Detail | undefined>>();
  // @ts-expect-error
  const _notANumber: number = useModelSelector(typedModel, (state, sel) => sel.detailById(state, {id: 1}));
  const undeclaredSelector = useModelSelector(typedModel, (state, selectors) => selectors.ids(state));
  expectType<Equals<typeof undeclaredSelector, any>>();

  const typedActions = useModelActions(typedModel);
  const fetched = await typedActions.fetchById({id: 1});
  expectType<Equals<typeof fetched, boolean>>();
  const undeclaredEffect = typedActions.refresh();
  expectType<Equals<typeof undeclaredEffect, any>>();
  const reducerAction = typedActions.save({detail: {id: 1, name: 'name'}});
  expectType<Equals<typeof reducerAction, any>>();

  return _notANumber;
}

describe('types', () => {
  it('compiles the type checks', () => {
    expect(typeChecks).toBeInstanceOf(Function);
  });
});
