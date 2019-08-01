import {Model, combineModelReducers} from '../src';

describe('combineModelReducers', () => {
  let articleModel;
  let reducersSpy;
  let combinedModelReducers;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      scopes: [],
      fields: {},
    });
    reducersSpy = jest.spyOn(articleModel, 'reducers').mockImplementation(
      // Implements an identity reducer
      () => (data) => data
    );
    combinedModelReducers = combineModelReducers([articleModel]);
  });

  it('calls reducers in article model', () => {
    expect(reducersSpy).toHaveBeenCalled();
  });

  it('reduces all models with the same state', () => {
    expect(combinedModelReducers('what')).toEqual('what');
  });
});
