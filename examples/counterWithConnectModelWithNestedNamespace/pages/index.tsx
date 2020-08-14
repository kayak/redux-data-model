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

interface State {
  count: number;
};

export const counterModel = new Model<State>({
  namespace: 'projectA.counter',
  state: {
    count: 0,
  },
  selectors: {
    count: (state) => state.count,
  },
  reducers: {
    increment(state, _action) {
      state.count += 1;
    },
    decrement(state, _action) {
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

function TestComponent({count, projectA}: {count: number; projectA: any}) {
  // Only used for displaying entire state
  const allState = useSelector(state => state);

  return (
    <>
      <div>
        <strong>Count:</strong> <span id="counterValue">{count}</span>
      </div>
      <div>
        <button id="incrementButton" onClick={() => projectA.counter.increment()}>Increment</button> |{' '}
        <button id="decrementButton" onClick={() => projectA.counter.decrement()}>Decrement</button>
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
    count: selectors.projectA.counter.count(state),
  };
}

const WrappedTestComponent = connectModel([counterModel], mapStateToProps)(TestComponent);

export default () => {
  return (
    <Provider store={store}>
      <WrappedTestComponent />
    </Provider>
  );
};
