import {get, isFunction, isNil, set} from 'lodash';
import {Dispatch} from 'redux';
import {
  MapDispatchToPropsWithActionCreators,
  MapStateToPropsWithSelectors,
  NamespacedActionCreatorsMapObject,
  NamespacedSelectorsMapObject,
} from '../baseTypes';
import {Model} from '../model';
import {Subscriber} from '../subscriber';
import {bindResuxActionCreators} from './bindResuxActionCreators';

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
