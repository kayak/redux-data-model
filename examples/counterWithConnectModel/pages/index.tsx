import {
  combineModelReducers,
  connectModel,
  Model,
  modelRootSaga,
} from 'redux-data-model';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import logger from 'redux-logger';
import {
  Provider,
  useSelector,
} from 'react-redux';
import * as React from 'react';
import JSONTree from 'react-json-tree';

interface CounterState {
  count: number;
};

interface CounterSelectorPayloads {
  count: null;
};

interface CounterReducerPayloads {
  increment: null;
  decrement: null;
};

export const counterModel = new Model<
CounterState, CounterSelectorPayloads, CounterReducerPayloads
>({
  namespace: 'counter',
  state: {
    count: 0,
  },
  selectors: {
    count: (state) => state.count,
  },
  reducers: {
    increment(state) {
      state.count += 1;
    },
    decrement(state) {
      state.count -= 1;
    },
  },
});

const sagaMiddleware = createSagaMiddleware();
const middlewares: any[] = [sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(combineReducers({
  ...combineModelReducers([counterModel]),
}), applyMiddleware(...middlewares));

sagaMiddleware.run(() => modelRootSaga([counterModel]));

function TestComponent({count, increment, decrement}: {
  count: number;
  increment: () => void;
  decrement: () => void;
}) {
  // Only used for displaying entire state
  const allState = useSelector(state => state);

  return (
    <>
      <div>
        <strong>Count:</strong> <span id="counterValue">{count}</span>
      </div>
      <div>
        <button id="incrementButton" onClick={increment}>Increment</button> |{' '}
        <button id="decrementButton" onClick={decrement}>Decrement</button>
      </div>
      <br/>
      <hr/>
      <br/>
      <div>
        <strong>State (Open console to see actions as they are triggered):</strong>
        <JSONTree data={allState} />
      </div>
    </>
  );
}

function mapStateToProps(state: any, _props: any, selectors: any) {
  return {
    count: selectors.counter.count(state),
  };
}

function mapDispatchToProps(_dispatch: any, _props: any, dispatchers: any) {
  return {
    increment: () => dispatchers.counter.increment(),
    decrement: () => dispatchers.counter.decrement(),
  };
}

const WrappedTestComponent = connectModel(
  [counterModel], mapStateToProps, mapDispatchToProps,
)(TestComponent);

export default () => {
  return (
    <Provider store={store}>
      <WrappedTestComponent />
    </Provider>
  );
};
