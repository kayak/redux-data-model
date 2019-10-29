import {mount} from 'enzyme';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {Model, Subscriber} from 'react-resux';
import {useSubscriberActions} from '../src';

const mockStore = configureMockStore([]);

function Counter({subscriber, actionCaller}) {
  const actions = useSubscriberActions(subscriber);
  React.useEffect(() => {
    actionCaller(actions);
  }, [actions]);
  return null;
}

describe('useSubscriberActions', () => {
  let modelOptions;
  let counterModel;
  let subscriber;
  let actionCreators;
  let store;

  beforeAll(() => {
    modelOptions = {
      namespace: 'counter',
      state: {
        count: 666,
      },
      reducers: {
        increase(state) {
          state.count += 1;
        }
      },
    };
    counterModel = new Model(modelOptions);
    subscriber = new Subscriber([counterModel]).takeLeading(
      'takeLeadingAndDo', [jest.fn()],
      ).takeLatest(
        'takeLatestAndDo', [jest.fn()],
      ).takeEvery(
        'takeEveryAndDo', [jest.fn()],
      );
    actionCreators = subscriber.actionCreators();
  });

  beforeEach(() => {
    store = mockStore({
      [modelOptions.namespace]: modelOptions.state,
    });
  });

  it('calls actionCreators', () => {
     const actionCreatorsSpy = jest.spyOn(subscriber, 'actionCreators');
     mount(
      <Provider store={store}>
        <Counter subscriber={subscriber} actionCaller={(actions) => actions.takeLeadingAndDo()}/>
      </Provider>
    );

    expect(actionCreatorsSpy).toHaveBeenCalled();
  });

  it('will dispatch the takeLeadingAndDo action when the respective callback is called', () => {
     mount(
      <Provider store={store}>
        <Counter subscriber={subscriber} actionCaller={(actions) => actions.takeLeadingAndDo()}/>
      </Provider>
    );

    expect(store.getActions()[0]).toEqual(actionCreators.takeLeadingAndDo())
  });

  it('will dispatch the takeLatestAndDo action when the respective callback is called', () => {
     mount(
      <Provider store={store}>
        <Counter subscriber={subscriber} actionCaller={(actions) => actions.takeLatestAndDo()}/>
      </Provider>
    );

    expect(store.getActions()[0]).toEqual(actionCreators.takeLatestAndDo())
  });

  it('will dispatch the takeEveryAndDo action when the respective callback is called', () => {
     mount(
      <Provider store={store}>
        <Counter subscriber={subscriber} actionCaller={(actions) => actions.takeEveryAndDo()}/>
      </Provider>
    );

    expect(store.getActions()[0]).toEqual(actionCreators.takeEveryAndDo())
  });

});
