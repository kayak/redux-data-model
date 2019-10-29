import * as React from 'react';
import {useSelector} from 'react-redux';
import {Model} from 'react-resux';

/**
 * A react hook for returning data from the provided model's state, by the means of one of its selectors. If you
 * don't want/need to use the hooks api, check [[connectResux]] up.
 *
 * @example
 * const someDataFromState = useModelSelector(model, (state, selectors) => selectors.count(state));
 *
 * @param model A model instance.
 * @returns Data from model's state.
 * @category React Hook
 */
export function useModelSelector(model: Model, selectorFunc): Record<string, (ScopeId) => any> {
  const selectors = React.useMemo(() => model.modelSelectors(), [model]);
  return useSelector(
    (state: Record<string, any>) => selectorFunc(state, selectors),
  );
}
