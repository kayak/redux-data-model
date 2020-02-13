import {flatten, get, isNil} from 'lodash';
import {SagaIterator} from '@redux-saga/core';
import {all, call, spawn} from 'redux-saga/effects';
import {Model} from './model';
import {ActionWithInternals, EffectModelFunction} from './baseTypes';

/**
 * @ignore
 */
export function modelBlockingGenerator(
  sagaBlockingEffect, actionType: string, effectFunc: EffectModelFunction,
) {
  return function *() {
    yield sagaBlockingEffect(
      actionType,
      function*(action: ActionWithInternals) {
        const isNonCompatibleAction = isNil(
          get(action, '__actionInternals.resolve', undefined) ||
          get(action, '__actionInternals.reject', undefined)
        );

        if (isNonCompatibleAction) {
          throw {
            name: 'NonCompatibleActionError',
            message: `The provided action lacks the internals for being redux-data-model-able. Be sure to ` +
              `use bindModelActionCreators instead of redux's bindActionCreators. The action in question ` +
              `is: ${JSON.stringify(action)}`,
          };
        }

        const {__actionInternals: {resolve, reject}, payload} = action;
        try {
          const returnValue = yield* effectFunc(payload);
          resolve(returnValue);
        } catch(error) {
          reject(error);
        }
      }
    );
  }
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
