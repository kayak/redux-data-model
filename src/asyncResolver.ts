import produce from 'immer';
import {createSelector} from 'reselect';
import {AnyAction, Reducer} from 'redux';
import {toPairs,} from 'lodash';

interface ActionTypes {
  started: string;
  failed: string;
  succeeded: string;
}

interface Actions {
  start: Function;
  fail: Function;
  succeed: Function;
}

export class AsyncResolver {
  public readonly namespace: string;

  public constructor() {
    this.namespace = 'async';

    this.actionTypes = this.actionTypes.bind(this);
    this.selectors = this.selectors.bind(this);
    this.reducers = this.reducers.bind(this);
  }

  public actionTypes(): ActionTypes {
    return {
      started: `${this.namespace}.started`,
      failed: `${this.namespace}.failed`,
      succeeded: `${this.namespace}.succeeded`,
    };
  }

  public actions(): Actions {
    const actionTypes = this.actionTypes();

    return {
      start: (id: string, metadata={}) => {
        return { type: actionTypes.started, id, metadata };
      },
      fail: (id: string, error, metadata={}) => {
        return { type: actionTypes.failed, id, payload: error, metadata };
      },
      succeed: (id: string, metadata={}) => {
        return { type: actionTypes.succeeded, id, metadata };
      }
    };
  }

  public selectors(id: string): SelectorFunction {
    const selectorFunc = state => state[id] || {isLoading: true, error: null};

    return createSelector([selectorFunc], data => data);
  }

  public reducers(): Reducer<unknown, AnyAction> {
    const actionTypes = this.actionTypes();

    return produce((draft: object, {
      type, id, payload, metadata,
    }) => {
      switch (type) {
        case actionTypes.started:
          draft[id] = {isLoading: true, error: null, metadata};
          return;

        case actionTypes.failed:
          draft[id].isLoading = false;
          draft[id].error = payload;

          for (const [key, value] of toPairs(metadata)) {
            draft[id].metadata[key] = value;
          }

          return;

        case actionTypes.succeeded:
          draft[id].isLoading = false;
          draft[id].error = null;

          for (const [key, value] of toPairs(metadata)) {
            draft[id].metadata[key] = value;
          }

          return;
      }
    }, {});
  }
}
