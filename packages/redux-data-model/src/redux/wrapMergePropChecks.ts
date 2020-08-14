import {isEmpty, isFunction, keys,} from 'lodash';
import {KeyConflictInMergePropsError} from '../errors';

/**
 * @ignore
 */
export function wrapMergePropChecks(mergeProps?: Function | undefined | null): any {
  if (isFunction(mergeProps)) return mergeProps;

  return (stateProps: Record<string, any>, dispatchProps: Record<string, any>, ownProps: Record<string, any>) => {
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
