import {mount} from 'enzyme';
import * as React from 'react';
import {Provider} from 'react-redux';
import configureMockStore from 'redux-mock-store';
import {Model, ModelOptions} from 'redux-data-model';
import {useModelSelector} from '../src';

const mockStore = configureMockStore([]);

function Counter({
  model, selectorFunc = (state: any, selectors: any) => selectors.count(state)
}: {model: any; selectorFunc?: any}) {
  const count = useModelSelector(model, selectorFunc);
  return (
    <div id="count">{count}</div>
  );
}

describe('useModelSelector', () => {
  let modelOptions: ModelOptions<any>;
  let counterModel: any;
  let store: any;

  beforeAll(() => {
    modelOptions = {
      namespace: 'counter',
      state: {
        count: 666,
      },
      selectors: {
        count: state => state.count,
      },
    };
    counterModel = new Model<any>(modelOptions);
    counterModel.markAsReduxInitialized();
    counterModel.markAsSagaInitialized();
    store = mockStore({
      [modelOptions.namespace]: modelOptions.state,
    });
  });

  it('calls modelSelectors', () => {
    const modelSelectorsSpy = jest.spyOn(counterModel, 'modelSelectors');
    mount(
      <Provider store={store}>
        <Counter model={counterModel}/>
      </Provider>
    );

    expect(modelSelectorsSpy).toHaveBeenCalled();
  });

  it('can access data from the store with a model selector', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Counter model={counterModel}/>
      </Provider>
    );

    expect(wrapper.find('#count').text()).toEqual(String(modelOptions.state.count))
  });

  it('passes state and selectors respectively as the arguments of the selectorFunc', () => {
    Model.disableProxyChecks = true;
    const selectorFunc = jest.fn();
    mount(
      <Provider store={store}>
        <Counter model={counterModel} selectorFunc={selectorFunc}/>
      </Provider>
    );

    expect(selectorFunc).toHaveBeenLastCalledWith(store.getState(), counterModel.modelSelectors());
    Model.disableProxyChecks = false;
  });

  describe('when model accesses an undefined selector', () => {
    it('throws', () => {
      expect(() => {
        mount(
          <Provider store={store}>
            <Counter model={counterModel} selectorFunc={(state: any, selectors: any) => selectors.whatever(state)}/>
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
      expect(() => {
        mount(
          <Provider store={store}>
            <Counter model={counterModel} selectorFunc={(state: any, selectors: any) => selectors.whatever(state)}/>
          </Provider>
        );
      }).toThrow({
        name: '',
        message: 'selectors.whatever is not a function'
      });
      Model.disableProxyChecks = false;
    });
  });
});
