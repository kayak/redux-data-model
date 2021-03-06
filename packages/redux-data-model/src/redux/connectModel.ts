import {connect, MergeProps} from 'react-redux';
import {MapDispatchToPropsWithActionCreators, MapStateToPropsWithSelectors,} from '../baseTypes';
import {Model} from '../model';
import {connectModelImpl} from './connectModelImpl';
import {wrapMergePropChecks} from './wrapMergePropChecks';

/**
 * Equivalent to redux's [connect](https://react-redux.js.org/api/connect) function.
 * This should be used when the hooks api is not desired or supported.
 * Otherwise check [[useModelActions]] and [[useModelSelector]] up.
 *
 * @example
 * const ConnectedComponent = connectModel([modelA, modelB], mapStateToProps);
 * const ConnectedComponent = connectModel([modelA, modelB], mapStateToProps, mapDispatchToProps);
 * const ConnectedComponent = connectModel([modelA, modelB], null, mapDispatchToProps);
 * const ConnectedComponent = connectModel([modelA, modelB], mapStateToProps, mapDispatchToProps, mergeProps, options);
 *
 * @param models An array of Model instances.
 * @param userProvidedMapStateToProps A mapToProps equivalent, which has a third argument with all selectors.
 * @param userProvidedMapDispatchToProps A mapDispatchToProps equivalent, which has a third argument with all
 *                                       models' dispatchers (i.e. already dispatch bound).
 * @param mergeProps See react-redux documentation for [mergeProps](
 *                   https://react-redux.js.org/api/connect#mergeprops-stateprops-dispatchprops-ownprops-object).
 * @param options See react-redux documentation for [options](https://react-redux.js.org/api/connect#options-object).
 * @returns A connect HOC.
 * @throws [[ModelNotReduxInitializedError]] When model was not initialized on a [[combineModelReducers]] call.
 * @throws [[ModelNotSagaInitializedError]] When model was not initialized on a [[modelRootSaga]] call.
 * @throws [[KeyConflictInMergePropsError]] When the props passed from the parent component, mapStateToProps props,
 *                                          or mapDispatchToProps props are conflicting (i.e. have the same name).
 *                                          This check is ignored when a custom mergeProps function is provided.
 * @category High Order Component (HOC)
 */
export function connectModel<TStateProps=any, TDispatchProps=any, TOwnProps=any, TMergedProps=any>(
  models: Model<any>[],
  userProvidedMapStateToProps: MapStateToPropsWithSelectors<TStateProps, TOwnProps, any> | null=null,
  userProvidedMapDispatchToProps: MapDispatchToPropsWithActionCreators<TDispatchProps, TOwnProps> | null=null,
  mergeProps: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> | null | undefined=null,
  options?: Record<string, any>,
) {
  const [mapStateToProps, mapDispatchToProps] = connectModelImpl(
    models, userProvidedMapStateToProps, userProvidedMapDispatchToProps,
  );

  return connect<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
    mapStateToProps,
    mapDispatchToProps,
    wrapMergePropChecks(mergeProps),
    options,
  );
}
