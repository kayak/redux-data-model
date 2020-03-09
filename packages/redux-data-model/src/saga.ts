import {flatten, get, isNil} from 'lodash';
import {SagaIterator} from '@redux-saga/core';
import {
  actionChannel,
  all,
  apply,
  call,
  cancel,
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
  takeLatest,
  takeLeading,
  takeMaybe,
  throttle,
} from 'redux-saga/effects';
import {Model} from './model';
import {ActionWithInternals, EffectModelFunction} from './baseTypes';
import {NonCompatibleActionError} from './errors';

/**
 * @ignore
 */
export const sagaEffects = {
  actionChannel,
  all,
  apply,
  call,
  cancel,
  cps,
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
};

/**
 * @ignore
 */
export const blockingSagaEffects = {
  blockingEffectTakeEvery,
  takeLeading,
  takeLatest,
  debounce,
  throttle,
  take,
  takeMaybe,
  cancel,
  fork,
  spawn,
  apply,
  call,
  all,
  delay,
  race,
  join,
};

/**
 * @ignore
 */
export function modelBlockingGenerator(
  effectFunc: EffectModelFunction,
) {
  return function* (action: ActionWithInternals) {
    const isNonCompatibleAction = isNil(
      get(action, '__actionInternals.resolve', undefined) ||
      get(action, '__actionInternals.reject', undefined)
    );

    if (isNonCompatibleAction) {
      throw new NonCompatibleActionError(action);
    }

    const {__actionInternals: {resolve, reject}, payload} = action;

    try {
      const returnValue = yield* effectFunc(payload);
      resolve(returnValue);
    } catch (error) {
      reject(error);
    }
  };
}

/**
 * Returns a root saga generator that can be passed to sagaMiddleware's run function, so that redux-saga is aware
 * of any sagas produced by models.
 *
 * @example
 * sagaMiddleware.run(() => modelRootSaga([modelA, modelB]));
 *
 * @param models An array of Model instances.
 * @returns A root saga.
 * @category Redux/Saga Setup
 */
export function* modelRootSaga(models: Model[]): SagaIterator {
  const sagas: any[] = flatten(models.map(model => model.reduxSagas));

  for (const model of models) {
    model.markAsSagaInitialized();
  }

  yield all(
    sagas.map(blockingSaga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(blockingSaga);
            break;
          } catch (e) {
            console.error(e);
          }
        }
      })
    )
  );
}
