import * as React from 'react';
import {combineModelReducers, Model, useModel} from '../../src';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {mount} from 'enzyme';

function TestComponent({model}) {
  const articleModel = useModel(model);
  const article = articleModel.byId(1);

  return (
    <div>
      {article.id}. {article.title}
    </div>
  );
}

describe('useModel', () => {
  let articleModel;
  let component;
  let store;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      scopes: [],
      fields: {},
    });
    store = createStore(combineModelReducers([articleModel]));
    store.dispatch(articleModel.actions().set(articleModel.defaultScope, 1, [{id: 1, title: 'title'}]));
    component = mount(
      <Provider store={store}>
        <TestComponent model={articleModel} />
      </Provider>
    );
  });

  it('allows components to access a model state via its scopes', () => {
    expect(component.find('div').text()).toEqual('1. title');
  });
});
