import {mount} from 'enzyme';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {connectModel, Model} from '../../src';

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

describe('connectModel', () => {
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
        * tryToIncrease(_action, effects, actionCreators) {
          yield effects.put(actionCreators.increase());
          return 1;
        },
      },
    };
    counterModel = new Model(modelOptions);
    counterModel.markAsReduxInitialized();
    counterModel.markAsSagaInitialized();
    actionCreators = counterModel.actionCreators();
  });

  describe('when using userProvidedMapStateToProps', () => {
    let ConnectedCounter;
    let store;

    beforeAll(() => {
      ConnectedCounter = connectModel(
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

    describe('when model has not been marked as loaded prior to usage', () => {
      let modelThatThrows;
      let ConnectedCounterThatThrows;

      beforeAll(() => {
        modelThatThrows = new Model(modelOptions);

        ConnectedCounterThatThrows = connectModel(
          [modelThatThrows],
          (state, _props, selectors) => ({count: selectors.counter.count(state)}),
        )(Counter);
      });

      it('throws', () => {
        expect(() => {
          mount(
            <Provider store={store}>
              <ConnectedCounterThatThrows/>
            </Provider>
          );
        }).toThrow({
          name: '',
          message: `Models need to be initialized with combineModelReducers prior to any usage. Now make this ` +
          `the case for: ${modelThatThrows.namespace}. ` +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
        });
      });

      it('does not thrown when Model.disableInitializationChecks is true', () => {
        Model.disableInitializationChecks = true;
        expect(() => {
          mount(
            <Provider store={store}>
              <ConnectedCounterThatThrows/>
            </Provider>
          );
        }).not.toThrow();
        Model.disableInitializationChecks = false;
      });
    });

    describe('when model accesses an undefined selector', () => {
      let modelThatThrows;
      let ConnectedCounterThatThrows;

      beforeAll(() => {
        modelThatThrows = new Model(modelOptions);

        ConnectedCounterThatThrows = connectModel(
          [modelThatThrows],
          (state, _props, selectors) => ({count: selectors.counter.whatever(state)}),
        )(Counter);
      });

      it('throws', () => {
        expect(() => {
          mount(
            <Provider store={store}>
              <ConnectedCounterThatThrows/>
            </Provider>
          );
        }).toThrow({
          name: '',
          message: `No selector called [whatever] was found on [counter] model. ` +
          `Available options are: count. ` +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
        });
      });

      it('thrown non proxy error when Model.disableProxyChecks is true', () => {
        Model.disableProxyChecks = true;
        modelThatThrows = new Model(modelOptions);
        ConnectedCounterThatThrows = connectModel(
          [modelThatThrows],
          (state, _props, selectors) => ({count: selectors.counter.whatever(state)}),
        )(Counter);
        expect(() => {
          mount(
            <Provider store={store}>
              <ConnectedCounterThatThrows/>
            </Provider>
          );
        }).toThrow({
          name: '',
          message: 'selectors.counter.whatever is not a function'
        });
        Model.disableProxyChecks = false;
      });
    });
  });

  describe('when using default userProvidedMapDispatchToProps', () => {
    let ConnectedCounterThatFiresCallback;
    let store;

    beforeAll(() => {
      ConnectedCounterThatFiresCallback = connectModel(
        [counterModel],
        null,
      )(CounterThatFiresCallback);
    });

    beforeEach(() => {
      store = mockStore({
        [modelOptions.namespace]: modelOptions.state,
      });
    });

    describe('when reducer callback is called', () => {
      it('will dispatch the respective reducer action', () => {
        mount(
          <Provider store={store}>
            <ConnectedCounterThatFiresCallback actionCaller={actions => actions.increment()}/>
          </Provider>
        );

        const action = actionCreators.increment();
        expect(store.getActions()[0]).toEqual({
          type: action.type,
          payload: action.payload,
          __actionInternals: {
            resolve: expect.anything(),
            reject: expect.anything(),
          }
        });
      });

      it('returns a Promise', async () => {
        let effectPromise;

        await mount(
          <Provider store={store}>
            <ConnectedCounterThatFiresCallback actionCaller={actions => (
              effectPromise = actions.increment())
            }/>
          </Provider>
        );

        expect(effectPromise).toStrictEqual(expect.any(Promise));
      });
    });

    describe('when effect callback is called', () => {
      it('will dispatch the respective effect action', () => {
        mount(
          <Provider store={store}>
            <ConnectedCounterThatFiresCallback actionCaller={actions => (
              actions.tryToIncrease())
            }/>
          </Provider>
        );

        const action = actionCreators.tryToIncrease();
        expect(store.getActions()[0]).toEqual({
          type: action.type,
          payload: action.payload,
          __actionInternals: {
            resolve: expect.anything(),
            reject: expect.anything(),
          }
        });
      });

      it('returns a Promise', async () => {
        let effectPromise;

        await mount(
          <Provider store={store}>
            <ConnectedCounterThatFiresCallback actionCaller={actions => (
              effectPromise = actions.tryToIncrease())
            }/>
          </Provider>
        );

        expect(effectPromise).toStrictEqual(expect.any(Promise));
      });
    });

    describe('when model accesses an undefined reducer/effect', () => {
      let modelThatThrows;
      let ConnectedCounterThatThrows;

      beforeAll(() => {
        modelThatThrows = new Model(modelOptions);

        ConnectedCounterThatThrows = connectModel(
          [modelThatThrows],
          null,
        )(CounterThatFiresCallback);
      });

      it('throws', () => {
        expect(() => {
          mount(
            <Provider store={store}>
              <ConnectedCounterThatThrows actionCaller={actions => actions.whatever()} />
            </Provider>
          );
        }).toThrow({
          name: '',
          message: `No reducer/effect called [whatever] was found on [counter] model. ` +
          `Available options are: increment,tryToIncrease. ` +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
        });
      });

      it('thrown non proxy error when Model.disableProxyChecks is true', () => {
        Model.disableProxyChecks = true;
        modelThatThrows = new Model(modelOptions);
        ConnectedCounterThatThrows = connectModel(
          [modelThatThrows],
          null,
        )(CounterThatFiresCallback);
        expect(() => {
          mount(
            <Provider store={store}>
              <ConnectedCounterThatThrows actionCaller={actions => actions.whatever()} />
            </Provider>
          );
        }).toThrow({
          name: '',
          message: 'actions.whatever is not a function'
        });
        Model.disableProxyChecks = false;
      });
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
