import {combineReducers} from 'redux';
import {combineModelReducers, Model} from '../../src';

jest.mock('redux', () => ({combineReducers: jest.fn()}));

describe('combineModelReducers', () => {
  let articleModel;
  let modelReducersSpy;
  let result;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
    });
    modelReducersSpy = jest.spyOn(articleModel, 'modelReducers').mockImplementation(
      // Implements an identity reducer
      () => (data) => data
    );
    result = combineModelReducers([articleModel]);
  });

  it('calls modelReducers in article model', () => {
    expect(modelReducersSpy).toHaveBeenCalled();
  });

  it('returns a reducer mapping object with the reducers of the article model', () => {
    expect(result).toEqual({[articleModel.namespace]: modelReducersSpy.mock.results[0].value});
  });

  it('returns a reducer mapping object with nested reducers when an object path is present in the namespace', () => {
    const nestedArticleModel = new Model({
      namespace: 'projectA.articles',
      state: {},
    });
    const nestedModelReducersSpy = jest.spyOn(nestedArticleModel, 'modelReducers').mockImplementation(
      // Implements an identity reducer
      () => (data) => data
    );
    expect(
      combineModelReducers([nestedArticleModel])
    ).toEqual({projectA: combineReducers({articles: nestedModelReducersSpy.mock.results[0].value})});
  });

  it('throws when multiple models have the same namespace', () => {
    expect(() => {
      combineModelReducers([articleModel, articleModel])
    }).toThrow({
      name: '',
      message: 'Namespace in models must be unique. The following namespaces, in order, were referenced in ' +
      'combineModelReducers: articles, articles',
    });
  });
});
