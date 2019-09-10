import * as React from 'react';
import {useSelector} from 'react-redux';
import {Model} from '../model';

export function useModelSelector(model: Model, selectorFunc): Record<string, (ScopeId) => any> {
  const selectors = React.useMemo(() => model.selectors(), [model]);
  return useSelector(
    (state: Record<string, any>) => selectorFunc(state, selectors),
  );
}
