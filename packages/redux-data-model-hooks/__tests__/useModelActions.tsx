import {mount} from 'enzyme';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {Model} from 'redux-data-model';
import {useModelActions} from '../src';

const mockStore = configureMockStore([]);

function Counter({model, actionCaller}: {model: any; actionCaller: any}) {
  const actions = useModelActions(model);
  React.useEffect(() => {
    actionCaller(actions);
  }, [actions]);
  return null;
}

describe('useModelActions', () => {
  let modelOptions: any;
  let counterModel: any;
  let actionCreators: any;
  let store: any;

  beforeAll(() => {
    modelOptions = {
      namespace: 'counter',
      state: {
        count: 666,
      },
      reducers: {
        increase(state: any) {
          state.count += 1;
        }
      },
      effects: {
        *tryToIncrease(_action: any, effects: any, actionCreators: any) {
          yield effects.put(actionCreators.increase());
        }
      },
    };
    counterModel = new Model<any>(modelOptions);
    counterModel.markAsReduxInitialized();
    counterModel.markAsSagaInitialized();
    actionCreators = counterModel.actionCreators();
  });

  beforeEach(() => {
    store = mockStore({
      [modelOptions.namespace]: modelOptions.state,
    });
  });

  it('calls actionCreators', () => {
    const actionCreatorsSpy = jest.spyOn(counterModel, 'actionCreators');
    mount(
      <Provider store={store}>
        <Counter model={counterModel} actionCaller={(actions: any) => actions.increase()}/>
      </Provider>
    );

    expect(actionCreatorsSpy).toHaveBeenCalled();
  });

  it('will dispatch the respective reducer action when reducer callback is called', () => {
    mount(
      <Provider store={store}>
        <Counter model={counterModel} actionCaller={(actions: any) => actions.increase()}/>
      </Provider>
    );

    const action = actionCreators.increase();
    expect(store.getActions()[0]).toEqual({
      type: action.type,
      payload: action.payload,
      __actionInternals: {
        resolve: expect.anything(),
        reject: expect.anything(),
      }
    });
  });

  it('will dispatch the respective effect action when effect callback is called', () => {
    mount(
      <Provider store={store}>
        <Counter model={counterModel} actionCaller={(actions: any) => actions.tryToIncrease()}/>
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

  describe('when model accesses an undefined reducer/effect', () => {
    it('throws', () => {
      expect(() => {
        mount(
          <Provider store={store}>
            <Counter model={counterModel} actionCaller={(actions: any) => actions.whatever()}/>
          </Provider>
        );
      }).toThrow({
        name: '',
        message: `No reducer/effect called [whatever] was found on [counter] model. ` +
        `Available options are: increase,tryToIncrease. ` +
        'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
      });
    });

    it('thrown non proxy error when Model.disableProxyChecks is true', () => {
      Model.disableProxyChecks = true;
      expect(() => {
        mount(
          <Provider store={store}>
            <Counter model={counterModel} actionCaller={(actions: any) => actions.whatever()}/>
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
