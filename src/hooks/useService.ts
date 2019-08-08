import * as React from 'react';
import * as urlComposer from 'url-composer';
import {Model} from '../model';
import {AsyncResolver} from '../asyncResolver';
import {Method} from "axios";
import axios from 'axios';
import {useDispatch, useSelector, batch} from "react-redux";

interface ServiceSpec {
  model: Model;
  host: string;
  urls: Record<string, Record<ScopeId, string>>;
}

interface AxiosConfig {
  data?: object | object[];
  headers?: object;
  pathParams?: object;
  queryParams?: object;
}

export function useService(serviceSpec: ServiceSpec): Record<string, (ScopeId) => any> {
  const dispatch = useDispatch();
  const asyncResolver = new AsyncResolver();
  const state = useSelector(
    (state: Record<string, any>) => state[asyncResolver.namespace]
  ) as object;

  function buildAxiousCall(scope: string, scopeId: ScopeId, method: Method) {
    return (config: AxiosConfig): SelectorFunction => {
      const url = urlComposer.build({
        host: serviceSpec.host,
        path: serviceSpec.urls[scope],
        params: config.pathParams,
        query: config.queryParams,
      });

      React.useEffect(() => {
        dispatch(asyncResolver.actions().start(url));

        axios({
          ...config,
          method,
          url,
        }).then( response => {
          const data = response.data;
          const responseMetadata = {
            status: response.status,
            headers: response.headers,
          };

          batch(() => {
            if (['get', 'post', 'put'].includes(method)) {
              dispatch(serviceSpec.model.actions().set(scope, scopeId, data));
            } else if (['delete'].includes(method)) {
              dispatch(serviceSpec.model.actions().remove(scope, scopeId));
            }
            dispatch(asyncResolver.actions().succeed(url, responseMetadata));
          });
        }).catch(error => {
          const responseMetadata = error.response ? {
            status: error.response.status,
            headers: error.response.headers,
          } : {};
          dispatch(asyncResolver.actions().fail(url, error.message, responseMetadata));
        });
      }, [url]);

      return asyncResolver.selectors(url)(state);
    };
  };

  return React.useMemo(() => {
    const data = {};

    [serviceSpec.model.defaultScope, ...serviceSpec.model.scopes].forEach((scope: string) => {
      data[scope] = (scopeId: ScopeId) => ({
        get: buildAxiousCall(scope, scopeId, 'get'),
        post: buildAxiousCall(scope, scopeId, 'post'),
        put: buildAxiousCall(scope, scopeId, 'put'),
        patch: buildAxiousCall(scope, scopeId, 'patch'),
        delete: buildAxiousCall(scope, scopeId, 'delete'),
        options: buildAxiousCall(scope, scopeId, 'options'),
        head: buildAxiousCall(scope, scopeId, 'head'),
      });
    });

    return data;
  }, [serviceSpec, state]);
}
