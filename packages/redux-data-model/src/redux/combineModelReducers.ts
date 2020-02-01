import {isPlainObject, set, toPairs, uniq} from 'lodash';
import {combineReducers, ReducersMapObject} from 'redux';
import {Model} from '../model';

/**
 * @ignore
 */
function combineReducersRecursively(reducerTree, level=0) {
  if (!isPlainObject(reducerTree))
    return reducerTree;

  const newReducerTree = {};
  for (const [reducerKey, reducerValue] of toPairs(reducerTree)) {
    newReducerTree[reducerKey] = combineReducersRecursively(reducerValue, level + 1);
  }

  return (level != 0) ? combineReducers(newReducerTree): newReducerTree;
}

/**
 * Returns a reducer map object that can be deconstructed into the combineReducers helper, from redux, so that
 * redux is aware of any reducers produced by models.
 *
 * @example
 * const store = createStore(combineReducers({
 *   ...combineModelReducers([modelA, modelB]),
 * }), applyMiddleware(sagaMiddleware));
 *
 * @param models An array of Model instances.
 * @returns A reducer's map object.
 * @throws {DuplicatedModelNamespaceError} When multiple models have the same namespace.
 * @category Redux/Saga Setup
 */
export function combineModelReducers(models: Model[]): ReducersMapObject {
  const modelNamespaces = models.map(model => model.namespace);
  const reducerTree = {};

  for (const model of models) {
    set(reducerTree, model.namespace, model.modelReducers());
  }

  if (uniq(modelNamespaces).length !== modelNamespaces.length) {
    throw {
      name: 'DuplicatedModelNamespaceError',
      message: `Namespace in models must be unique. The following namespaces, in order, were referenced in ` +
      `combineModelReducers: ${modelNamespaces.join(', ')}`,
    };
  }

  return combineReducersRecursively(reducerTree);
}
