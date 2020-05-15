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
export function connectModelImpl(
  models: Model[],
  userProvidedMapStateToProps: MapStateToPropsWithSelectors<any, any, any>=null,
  userProvidedMapDispatchToProps: MapDispatchToPropsWithActionCreators<any, any>=null,
): [Function, Function] {
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

  const mapStateToPropsFunc = !isNil(userProvidedMapStateToProps) ? ((state, ownProps=null) => {
    return userProvidedMapStateToProps(state, ownProps, selectors);
  }) : null;

  const mapDispatchToPropsFunc = (dispatch: Dispatch, ownProps=null) => {
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

    if (!isNil(userProvidedMapDispatchToProps)) {
      if (isFunction(userProvidedMapDispatchToProps)) {
        return userProvidedMapDispatchToProps(dispatch, ownProps, dispatchers);
      } else {
        return bindModelActionCreators(userProvidedMapDispatchToProps, dispatch);
      }
    }

    return dispatchers;
  };

  return [mapStateToPropsFunc, mapDispatchToPropsFunc];
}
