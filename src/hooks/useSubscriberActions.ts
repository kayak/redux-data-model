import * as React from 'react';
import {useDispatch} from 'react-redux';
import {Subscriber} from '../subscriber';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';

export function useSubscriberActions(subscriber: Subscriber): ActionCreatorsMapObject {
  const dispatch: Dispatch = useDispatch();
  const actionCreators = React.useMemo(() => subscriber.actionCreators(), [subscriber]);
  return React.useMemo(() => bindActionCreators(actionCreators, dispatch), [subscriber]);
}
