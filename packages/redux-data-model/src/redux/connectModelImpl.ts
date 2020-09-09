import {get, isFunction, isNil, set} from 'lodash';
import {Dispatch} from 'redux';
import {
  MapDispatchToPropsWithActionCreators,
  MapStateToPropsWithSelectors,
  NamespacedActionCreatorsMapObject,
  NamespacedSelectorsMapObject,
} from '../baseTypes';
import {Model} from '../model';
import {bindModelActionCreators} from './bindModelActionCreators';
import {wrapProxy} from "../utils";
import {UndefinedReducerOrEffectError, UndefinedSelectorError} from "../errors";

/**
 * @ignore
 */
export function connectModelImpl<TStateProps, TOwnProps, TDispatchProps>(
  models: Model<any>[],
  userProvidedMapStateToProps: MapStateToPropsWithSelectors<TStateProps, TOwnProps, any> | null=null,
  userProvidedMapDispatchToProps: MapDispatchToPropsWithActionCreators<TDispatchProps, TOwnProps> | null=null,
): [any, any] {
  const selectors: NamespacedSelectorsMapObject = {};
  const modelActionCreators: NamespacedActionCreatorsMapObject = {};

  for (const model of models) {
    const modelSelectors = model.modelSelectors();

    set(selectors, model.namespace, Model.disableProxyChecks ? modelSelectors : wrapProxy(
      modelSelectors,
      model,
      UndefinedSelectorError,
    ));
    set(modelActionCreators, model.namespace, model.actionCreators());
  }

  const mapStateToPropsFunc = !isNil(userProvidedMapStateToProps) ? ((state: TStateProps, ownProps: TOwnProps) => {
    return userProvidedMapStateToProps(state, ownProps, selectors);
  }) : null;

  const mapDispatchToPropsFunc = !isNil(userProvidedMapDispatchToProps) ? (dispatch: Dispatch, ownProps: TOwnProps) => {
    if (isFunction(userProvidedMapDispatchToProps)) {
      const dispatchers = {};

      // Bind dispatch function
      for (const model of models) {
        const boundModelActionCreators = bindModelActionCreators(get(modelActionCreators, model.namespace), dispatch);

        set(
          dispatchers,
          model.namespace,
          Model.disableProxyChecks ? boundModelActionCreators : wrapProxy(
            boundModelActionCreators,
            model,
            UndefinedReducerOrEffectError,
          ),
        );
      }

      return userProvidedMapDispatchToProps(dispatch, ownProps, dispatchers);
    }

    return bindModelActionCreators(userProvidedMapDispatchToProps || {}, dispatch);
  } : null;

  return [mapStateToPropsFunc, mapDispatchToPropsFunc];
}
