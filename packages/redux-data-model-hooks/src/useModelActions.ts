import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Dispatch} from 'redux';
import {bindModelActionCreators, BoundActionCreatorsMapObject, Model} from 'redux-data-model';

/**
 * A react hook for returning already bound action creators for the provided model. If you don't want/need to use
 * the hooks api, check [[connectModel]] up.
 *
 * @example
 * const modelActions = useModelActions(model);
 *
 * @param model A model instance.
 * @returns An object with already bound action creators. The bound action creators return a promise when invoked,
 *          which can be used to track if the action was properly processed (i.e. resolved) or caused an exception
 *          (i.e. rejected).
 * @throws {ModelNotCombinedError} When model was not loaded on a combineModelReducers call.
 * @category React Hook
 */
export function useModelActions(model: Model): BoundActionCreatorsMapObject {
  const dispatch: Dispatch = useDispatch();
  const actionCreators = React.useMemo(() => model.actionCreators(), [model]);
  return React.useMemo(() => bindModelActionCreators(actionCreators, dispatch), [model]);
}
