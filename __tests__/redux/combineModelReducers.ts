import {combineModelReducers, Model} from '../../src';

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
