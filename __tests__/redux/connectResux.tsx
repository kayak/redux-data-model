import {mount} from 'enzyme';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {Model, connectResux} from '../../src';

const mockStore = configureMockStore([]);

function Counter({count}) {
  return (
    <div id="count">{count}</div>
  );
}

function CounterThatFiresCallback({counter, actionCaller}) {
  React.useEffect(() => {
    actionCaller(counter);
  }, []);

  return null;
}

describe('connectResux', () => {
  let modelOptions;
  let counterModel;
  let actionCreators;

  beforeAll(() => {
    modelOptions = {
      namespace: 'counter',
      state: {
        count: 666,
      },
      selectors: {
        count: state => state.count,
      },
      reducers: {
        increment(state) {
          state.count += 1;
        }
      },
      effects: {
        *tryToIncrease(_action, effects, actionCreators) {
          yield effects.put(actionCreators.increase());
        }
      },
    };
    counterModel = new Model(modelOptions);
    actionCreators = counterModel.actionCreators();
  });

  describe('when using userProvidedMapStateToProps', () => {
    let ConnectedCounter;
    let store;

    beforeAll(() => {
      ConnectedCounter = connectResux(
       [counterModel],
       (state, _props, selectors) => {
          return {
            count: selectors.counter.count(state),
          }
        }
      )(Counter);
    });

    beforeEach(() => {
      store = mockStore({
        [modelOptions.namespace]: modelOptions.state,
      });
    });

    it('can access data from the store with a model selector', () => {
       const wrapper = mount(
        <Provider store={store}>
          <ConnectedCounter/>
        </Provider>
      );

      expect(wrapper.find('#count').text()).toEqual(String(modelOptions.state.count))
    });
  });

  describe('when using default userProvidedMapDispatchToProps', () => {
    let ConnectedCounterThatFiresCallback;
    let store;

    beforeAll(() => {
      ConnectedCounterThatFiresCallback = connectResux(
       [counterModel],
       null,
      )(CounterThatFiresCallback);
    });

    beforeEach(() => {
      store = mockStore({
        [modelOptions.namespace]: modelOptions.state,
      });
    });

    it('will dispatch the respective reducer action when reducer callback is called', () => {
       mount(
        <Provider store={store}>
          <ConnectedCounterThatFiresCallback actionCaller={actions => actions.increment()}/>
        </Provider>
      );

      expect(store.getActions()[0]).toEqual(actionCreators.increment())
    });

    it('will dispatch the respective effect action when effect callback is called', () => {
       mount(
        <Provider store={store}>
          <ConnectedCounterThatFiresCallback actionCaller={actions => actions.tryToIncrease()}/>
        </Provider>
      );

      expect(store.getActions()[0]).toEqual(actionCreators.tryToIncrease())
    });
  });

  describe('when using custom userProvidedMapDispatchToProps', () => {
    beforeAll(() => {
    });

    beforeEach(() => {
    });

    it.todo('will dispatch the respective reducer action when reducer callback is called');
    it.todo('will dispatch the respective effect action when effect callback is called');
  });
});
