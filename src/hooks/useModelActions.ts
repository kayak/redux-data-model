import * as React from 'react';
import {useDispatch} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {Model} from '../model';

/**
 * A react hook for returning already bound action creators for the provided model. If you don't want/need to use
 * the hooks api, check [[connectResux]] up.
 *
 * @example
 * const modelActions = useModelActions(model);
 *
 * @param model A model instance.
 * @returns An object with already bound action creators.
 * @category React Hook
 */
export function useModelActions(model: Model): ActionCreatorsMapObject {
  const dispatch: Dispatch = useDispatch();
  const actionCreators = React.useMemo(() => model.actionCreators(), [model]);
  return React.useMemo(() => bindActionCreators(actionCreators, dispatch), [model]);
}
