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
) {
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

  const mapStateToPropsFunc = !isNil(userProvidedMapStateToProps) && ((state, props=null) => {
    return userProvidedMapStateToProps(state, props, selectors);
  });

  const mapDispatchToPropsFunc = (dispatch: Dispatch) => {
    const result = {};

    // Bind dispatch function
    for (const model of models) {
      const boundActionCreators = bindModelActionCreators(get(modelActionCreators, model.namespace), dispatch);

      set(
        result,
        model.namespace,
        Model.disableProxyChecks ? boundActionCreators : wrapProxy(
          boundActionCreators,
          model,
          UndefinedReducerOrEffectError,
        ),
      );
    }

    if (!isNil(userProvidedMapDispatchToProps)) {
      Object.assign(
        result,
        isFunction(userProvidedMapDispatchToProps) ?
          userProvidedMapDispatchToProps(dispatch, modelActionCreators) :
          userProvidedMapDispatchToProps
      );
    }

    return result;
  };

  return [mapStateToPropsFunc, mapDispatchToPropsFunc];
}
