import {flatten, isFunction, isNil, memoize, uniq} from 'lodash';
import {connect} from 'react-redux';
import {bindActionCreators, Dispatch, ReducersMapObject} from 'redux';
import {SagaIterator} from '@redux-saga/core';
import {all, call, spawn} from 'redux-saga/effects';
import {MapDispatchToPropsWithActionCreators, MapStateToPropsWithSelectors} from './baseTypes';
import {Model} from './model';
import {Subscriber} from './subscriber';

export function connectResuxFunc(
  modelsOrSubscribers: (Model|Subscriber)[],
  userProvidedMapStateToProps: MapStateToPropsWithSelectors<any, any, any>=null,
  userProvidedMapDispatchToProps: MapDispatchToPropsWithActionCreators<any, any>=null,
) {
  const selectors = {};
  const modelActionCreators = {};
  const subscriberActionCreators = {};
  const defaultMapDispatchToProps = {};

  const models: Model[] = modelsOrSubscribers.filter(
    obj => obj instanceof Model
  ) as Model[];
  const subscribers: Subscriber[] = modelsOrSubscribers.filter(
    obj => obj instanceof Subscriber
  ) as Subscriber[];

  for (const model of models) {
    selectors[model.namespace] = model.selectors();
    modelActionCreators[model.namespace] = model.actionCreators();
    defaultMapDispatchToProps[model.namespace] = modelActionCreators[model.namespace];
  }

  for (const subscriber of subscribers) {
    Object.assign(subscriberActionCreators, subscriber.actionCreators());
    Object.assign(defaultMapDispatchToProps, subscriberActionCreators);
  }

  const mapStateToPropsFunc = !isNil(userProvidedMapStateToProps) && ((state, props=null) => {
    return userProvidedMapStateToProps(state, props, selectors);
  });

  const mapDispatchToPropsFunc = (dispatch: Dispatch) => {
    // Bind dispatch function
    defaultMapDispatchToProps['subscribers'] = bindActionCreators(subscriberActionCreators, dispatch);
    for (const model of models) {
      defaultMapDispatchToProps[model.namespace] = bindActionCreators(modelActionCreators[model.namespace], dispatch);
    }

    const result = {...defaultMapDispatchToProps};

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
 * Resux's equivalent for redux's connect function.
 *
 * @example
 * const store = createStore(combineReducers({
 *   ...combineModelReducers([modelA, modelB]),
 * }), applyMiddleware(sagaMiddleware));
 *
 * @param modelsOrSubscribers An array of either Model or Subscriber instances.
 * @param userProvidedMapStateToProps A mapToProps equivalent, which has a third argument with all selectors.
 * @param userProvidedMapDispatchToProps A mapDispatchToProps equivalent, which has a third argument with all
 *                                       models' action creators and a fourth argument with all subscriber's
 *                                       action creators.
 * @returns A connect HOC.
 */
function connectResuxHoc(
  modelsOrSubscribers: (Model|Subscriber)[],
  userProvidedMapStateToProps: MapStateToPropsWithSelectors<any, any, any>=null,
  userProvidedMapDispatchToProps: MapDispatchToPropsWithActionCreators<any, any>=null,
) {
  return connect(
    // @ts-ignore
    ...connectResuxFunc(
      modelsOrSubscribers, userProvidedMapStateToProps, userProvidedMapDispatchToProps,
    )
  );
}

/**
 * Returns a reducer map object that can be deconstructed into the combineReducers helper, from redux, so that
 * redux is aware of any reducers produced by models.
 *
 * @example
 * sagaMiddleware.run(() => resuxRootSaga([modelA, subscriberA]));
 *
 * @param models An array of Model instances.
 * @returns A reducer's map object.
 */
function combineModelReducersFunc(models: Model[]): ReducersMapObject {
  const modelNamespaces = models.map(model => model.namespace);
  const reducers = {};

  for (const model of models) {
    reducers[model.namespace] = model.reducers();
  }

  if (uniq(modelNamespaces).length !== modelNamespaces.length) {
    throw {
      name: 'DuplicatedModelNamespaceError',
      message: `Namespace in models must be unique. The following namespaces, in order, were referenced in ` +
      `combineModelReducers: ${modelNamespaces.join(', ')}`,
    };
  }

  return reducers;
}

export const combineModelReducers = memoize(combineModelReducersFunc);
export const connectResux = memoize(connectResuxHoc);

/**
 * Returns a root saga generator that can be passed to sagaMiddleware's run function, so that redux-saga is aware
 * of any sagas produced by either models or subscribers.
 *
 * @example
 * sagaMiddleware.run(() => resuxRootSaga([modelA, subscriberA]));
 *
 * @param sagaContainers An array of either Model or Subscriber instances.
 * @returns A root saga.
 */
export function* resuxRootSaga(sagaContainers: (Model | Subscriber)[]): SagaIterator {
  const sagas: any[] = flatten(sagaContainers.map(sagaContainer => sagaContainer.reduxSagas));

  yield all(
    sagas.map(blockingSaga =>
      spawn(function* () {
        while (true) {
          try {
            yield call(blockingSaga);
            break;
          } catch (e) {
            console.log(e);
          }
        }
      })
    )
  );
}
