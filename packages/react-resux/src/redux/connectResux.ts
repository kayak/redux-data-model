import {connect} from 'react-redux';
import {MapDispatchToPropsWithActionCreators, MapStateToPropsWithSelectors,} from '../baseTypes';
import {Model} from '../model';
import {Subscriber} from '../subscriber';
import {connectResuxImpl} from './connectResuxImpl';

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
