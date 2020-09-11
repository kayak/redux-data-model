import {isEmpty, isFunction, keys,} from 'lodash';
import {MergeProps} from 'react-redux';
import {KeyConflictInMergePropsError} from '../errors';

/**
 * @ignore
 */
export function wrapMergePropChecks<TStateProps, TDispatchProps, TOwnProps, TMergedProps>(
  mergeProps?: MergeProps<TStateProps, TDispatchProps, TOwnProps, TMergedProps> | null | undefined
): any {
  if (isFunction(mergeProps)) return mergeProps;

  return (stateProps: TStateProps, dispatchProps: TDispatchProps, ownProps: TOwnProps) => {
    const statePropKeys = new Set(keys(stateProps));
    const dispatchPropKeys = new Set(keys(dispatchProps));
    const ownPropKeys = new Set(keys(ownProps));

    const statePropConflicts = [...statePropKeys].filter(x => dispatchPropKeys.has(x) || ownPropKeys.has(x));
    const dispatchPropConflicts = [...dispatchPropKeys].filter(x => statePropKeys.has(x) || ownPropKeys.has(x));
    const ownPropConflicts = [...ownPropKeys].filter(x => statePropKeys.has(x) || dispatchPropKeys.has(x));

    if (!isEmpty(statePropConflicts) || !isEmpty(dispatchPropConflicts) || !isEmpty(ownPropConflicts))  {
      throw new KeyConflictInMergePropsError(statePropConflicts, dispatchPropConflicts, ownPropConflicts);
    }

    return { ...ownProps, ...stateProps, ...dispatchProps };
  };
}
