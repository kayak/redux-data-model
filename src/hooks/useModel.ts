import * as React from 'react';
import { useDispatch, useSelector, DispatchProp } from 'react-redux';
import { Model } from '../model';
import { Data } from '../data';

export function useModel(model: Model): Record<string, (ScopeId) => any> {
  const dispatch: DispatchProp = useDispatch();

  return React.useMemo(() => {
    const data = {};

    [model.defaultScope, ...model.scopes].forEach((scope: string) => {
      data[scope] = (scopeId: ScopeId) => {
        const state = useSelector(state => state) as object;
        const reducedData = model.selectors(scope, scopeId)(state);
        return new Data(dispatch, model, reducedData, scope, scopeId);
      };
    });

    return data;
  }, [model]);
}
