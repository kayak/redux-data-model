import {
  combineModelReducers,
  Model,
  resuxRootSaga,
} from 'react-resux';
import {
  useModelActions,
  useModelSelector,
} from 'react-resux-hooks';
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

export const counterModel = new Model({
  namespace: 'counter',
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
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(combineReducers({
  ...combineModelReducers([counterModel]),
}), applyMiddleware(...middlewares));

sagaMiddleware.run(() => resuxRootSaga([counterModel]));

function TestComponent() {
  const counterActions = useModelActions(counterModel);

  // Only used for displaying entire state
  const allState = useSelector(state => state);

  const count = useModelSelector(counterModel, (state, selectors) => selectors.count(state));

  return (
    <>
      <div>
        <strong>Count:</strong> <span id="counterValue">{count}</span>
      </div>
      <div>
        <button id="incrementButton" onClick={() => counterActions.increment()}>Increment</button> |{' '}
        <button id="decrementButton" onClick={() => counterActions.decrement()}>Decrement</button>
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

export default () => {
  return (
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
};
