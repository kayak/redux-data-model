import * as React from 'react';
import { useDispatch, useSelector, DispatchProp } from 'react-redux';
import { Model } from '../model';
import { Data } from '../data';

export function useModel(model: Model, namespace: string=''): Record<string, (ScopeId) => any> {
  const dispatch: DispatchProp = useDispatch();
  const state = useSelector(
    (state: Record<string, any>) => namespace === '' ? state : state['models']
  ) as object;

  return React.useMemo(() => {
    const data = {};
    [model.defaultScope, ...model.scopes].forEach((scope: string) => {
      data[scope] = (scopeId: ScopeId) => {
        const reducedData = model.selectors(scope, scopeId)(state);
        return new Data(dispatch, model, reducedData, scope, scopeId);
      };
    });

    return data;
  }, [model, dispatch, state]);
}
