import * as React from 'react';
import {useDispatch} from 'react-redux';
import {ActionCreatorsMapObject, bindActionCreators, Dispatch} from 'redux';
import {Subscriber} from 'react-resux';

/**
 * A react hook for returning already bound action creators for the provided subscriber. If you don't want/need
 * to use the hooks api, check [[connectResux]] up.
 *
 * @example
 * const subscriberActions = useSubscriberActions(subscriber);
 *
 * @param subscriber A subscriber instance.
 * @returns An object with already bound action creators.
 * @category React Hook
 */
export function useSubscriberActions(subscriber: Subscriber): ActionCreatorsMapObject {
  const dispatch: Dispatch = useDispatch();
  const actionCreators = React.useMemo(() => subscriber.actionCreators(), [subscriber]);
  return React.useMemo(() => bindActionCreators(actionCreators, dispatch), [subscriber]);
}
