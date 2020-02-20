import {all} from 'redux-saga/effects';
import {Model, modelRootSaga} from '../../src';

describe('modelRootSaga', () => {
  let articleModel;
  let reduxSagasSpy;
  let markAsSagaInitializedSpy;
  let result;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
      effects: {
        effectA: jest.fn(),
        effectB: jest.fn(),
      },
    });
    reduxSagasSpy = jest.spyOn(articleModel, 'reduxSagas', 'get').mockImplementation(
      () => [jest.fn(), jest.fn()]
    );
    markAsSagaInitializedSpy = jest.spyOn(articleModel, 'markAsSagaInitialized');
    result = modelRootSaga([articleModel]).next();
  });

  it('calls reduxSagas in article model', () => {
    expect(reduxSagasSpy).toHaveBeenCalled();
  });

  it('calls markAsSagaInitialized in article model', () => {
    expect(markAsSagaInitializedSpy).toHaveBeenCalled();
  });

  it('returns a root saga with two blocking sagas as part of the all effects', () => {
    const gen = result.value;
    expect(gen).toEqual(all(
      reduxSagasSpy.mock.results[0].value.map(() => expect.anything()),
    ));
  });
});
