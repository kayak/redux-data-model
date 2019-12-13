import {identity, mapValues} from 'lodash';
import {Dispatch} from 'redux';
import {ActionCreatorsMapObject, BoundNamespacedActionCreatorsMapObject,} from '../baseTypes';

/**
 * @ignore
 */
const defaultActionInternals = {resolve: identity, reject: identity};

/**
 * Turns an object whose values are action creators or nested objects with them, into an object with the
 * same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.
 * A Promise will be returned on every invocation, which can be used to track if the action was properly
 * processed (i.e. resolved) or caused an exception (i.e. rejected).
 *
 * @param actionCreators a namespaced action creator's map object. This can have multiple levels of nesting,
 *                       depending on the namespaces of the models involved.
 * @param dispatch A dispatch function available on the Store instance..
 * @returns An object mimicking the original object, but with each function immediately dispatching the
 *          action returned by the corresponding action creator. And returning a Promise, which will resolve/
 *          reject once done.
 * @category Redux/Saga Setup
 */
export function bindResuxActionCreators(
  actionCreators: ActionCreatorsMapObject,
  dispatch: Dispatch
): BoundNamespacedActionCreatorsMapObject {
  return mapValues(actionCreators,actionCreator => function(actionData: object) {
    let promise = Promise.resolve();
    if (actionCreator.isEffect) {
      promise = new Promise((resolve, reject) => dispatch(actionCreator(actionData, {resolve, reject})));
    } else {
      dispatch(actionCreator(actionData, defaultActionInternals));
    }
    return promise;
  });
}
