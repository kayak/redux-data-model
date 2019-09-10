import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Model} from '../model';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

export function useModelActions(model: Model): ActionCreatorsMapObject {
  const dispatch: Dispatch = useDispatch();
  const actionCreators = React.useMemo(() => model.actionCreators(), [model]);
  return React.useMemo(() => bindActionCreators(actionCreators, dispatch), [model]);
}
