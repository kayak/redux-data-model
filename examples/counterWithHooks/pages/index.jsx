import {
  combineModelReducers,
  Model,
  resuxRootSaga,
  useModelActions,
  useModelSelector,
} from 'react-resux';
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
        increment(state, action) {
          state.count += 1;
        },
        decrement(state, action) {
          state.count -= 1;
        },
    },
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
  ...combineModelReducers([counterModel]),
}), applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(() => resuxRootSaga([counterModel]));

function TestComponent() {
  const counterActions = useModelActions(counterModel);

  // Only used for displaying entire state
  const allState = useSelector(state => state);

  const count = useModelSelector(counterModel, (state, selectors) => selectors.count(state));

  return (
    <>
      <div>
        <strong>Count:</strong> {count}
      </div>
      <div>
        <button onClick={() => counterActions.increment()}>Increment</button> |{' '}
        <button onClick={() => counterActions.decrement()}>Decrement</button>
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
