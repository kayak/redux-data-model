import {get, isFunction, isNil, isEmpty, set} from 'lodash';
import {Dispatch} from 'redux';
import {
  MapDispatchToPropsWithActionCreators,
  MapStateToPropsWithSelectors,
  NamespacedActionCreatorsMapObject,
  NamespacedSelectorsMapObject,
} from '../baseTypes';
import {Model} from '../model';
import {bindModelActionCreators} from './bindModelActionCreators';

/**
 * @ignore
 */
export function connectModelImpl(
  models: Model[],
  userProvidedMapStateToProps: MapStateToPropsWithSelectors<any, any, any>=null,
  userProvidedMapDispatchToProps: MapDispatchToPropsWithActionCreators<any, any>=null,
) {
  const uncombinedModelNamespaces: Array<string> = [];
  const selectors: NamespacedSelectorsMapObject = {};
  const modelActionCreators: NamespacedActionCreatorsMapObject = {};

  for (const model of models) {
    if (!model.isLoaded) {
      uncombinedModelNamespaces.push(model.namespace);
    }
    set(selectors, model.namespace, model.modelSelectors());
    set(modelActionCreators, model.namespace, model.actionCreators());
  }

  if (!isEmpty(uncombinedModelNamespaces)) {
    throw {
      name: 'ModelNotCombinedError',
      message: `Models need to be combined with combineModelReducers prior to any usage. Now ` +
      `make this the case for: ${uncombinedModelNamespaces.join(', ')}`,
    };
  }

  const mapStateToPropsFunc = !isNil(userProvidedMapStateToProps) && ((state, props=null) => {
    return userProvidedMapStateToProps(state, props, selectors);
  });

  const mapDispatchToPropsFunc = (dispatch: Dispatch) => {
    const result = {};

    // Bind dispatch function
    for (const model of models) {
      set(
        result,
        model.namespace,
        bindModelActionCreators(get(modelActionCreators, model.namespace), dispatch),
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
