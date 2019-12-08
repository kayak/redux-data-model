import {get, identity, isFunction, isNil, isPlainObject, mapValues, set, toPairs, uniq} from 'lodash';
import {connect} from 'react-redux';
import {combineReducers, Dispatch, ReducersMapObject} from 'redux';
import {
  ActionCreatorsMapObject,
  BoundNamespacedActionCreatorsMapObject,
  MapDispatchToPropsWithActionCreators,
  MapStateToPropsWithSelectors,
  NamespacedActionCreatorsMapObject,
  NamespacedSelectorsMapObject,
} from './baseTypes';
import {Model} from './model';
import {Subscriber} from './subscriber';

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

/**
 * @ignore
 */
export function connectResuxImpl(
  modelsOrSubscribers: (Model|Subscriber)[],
  userProvidedMapStateToProps: MapStateToPropsWithSelectors<any, any, any>=null,
  userProvidedMapDispatchToProps: MapDispatchToPropsWithActionCreators<any, any>=null,
) {
  const selectors: NamespacedSelectorsMapObject = {};
  const modelActionCreators: NamespacedActionCreatorsMapObject = {};
  const subscriberActionCreators: NamespacedActionCreatorsMapObject = {};

  const models: Model[] = modelsOrSubscribers.filter(
    obj => obj instanceof Model
  ) as Model[];
  const subscribers: Subscriber[] = modelsOrSubscribers.filter(
    obj => obj instanceof Subscriber
  ) as Subscriber[];

  for (const model of models) {
    set(selectors, model.namespace, model.modelSelectors());
    set(modelActionCreators, model.namespace, model.actionCreators());
  }

  for (const subscriber of subscribers) {
    Object.assign(subscriberActionCreators, subscriber.actionCreators());
  }

  const mapStateToPropsFunc = !isNil(userProvidedMapStateToProps) && ((state, props=null) => {
    return userProvidedMapStateToProps(state, props, selectors);
  });

  const mapDispatchToPropsFunc = (dispatch: Dispatch) => {
    const result = {};

    // Bind dispatch function
    result['subscribers'] = bindResuxActionCreators(subscriberActionCreators, dispatch);
    for (const model of models) {
      set(
        result,
        model.namespace,
        bindResuxActionCreators(get(modelActionCreators, model.namespace), dispatch),
      );
    }

    if (!isNil(userProvidedMapDispatchToProps)) {
      Object.assign(
        result,
        isFunction(userProvidedMapDispatchToProps) ?
          userProvidedMapDispatchToProps(dispatch, modelActionCreators, subscriberActionCreators) :
          userProvidedMapDispatchToProps
      );
    }

    return result;
  };

  return [mapStateToPropsFunc, mapDispatchToPropsFunc];
}

/**
 * Equivalent to redux's connect function. This should be used when the hooks api is not desired or
 * supported. Otherwise check [[useModelActions]], [[useModelSelector]], and [[useSubscriberActions]] up.
 *
 * @example
 * const ConnectedComponent = connectResux([modelA, modelB], mapStateToProps, mapDispatchToProps)
 *
 * @param modelsOrSubscribers An array of either Model or Subscriber instances.
 * @param userProvidedMapStateToProps A mapToProps equivalent, which has a third argument with all selectors.
 * @param userProvidedMapDispatchToProps A mapDispatchToProps equivalent, which has a third argument with all
 *                                       models' action creators and a fourth argument with all subscriber's
 *                                       action creators.
 * @returns A connect HOC.
 * @category High Order Component (HOC)
 */
export function connectResux(
  modelsOrSubscribers: (Model|Subscriber)[],
  userProvidedMapStateToProps: MapStateToPropsWithSelectors<any, any, any>=null,
  userProvidedMapDispatchToProps: MapDispatchToPropsWithActionCreators<any, any>=null,
) {
  return connect(
    ...connectResuxImpl(
      modelsOrSubscribers, userProvidedMapStateToProps, userProvidedMapDispatchToProps,
    )
  );
}

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
