import {all} from 'redux-saga/effects';
import {Model, modelRootSaga} from '../../src';

describe('modelRootSaga', () => {
  let sagas: any;
  let articleModel: Model<any>;
  let reduxSagasSpy: any;
  let markAsSagaInitializedSpy: any;
  let gen: any;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
      effects: {
        effectA: jest.fn(),
        effectB: jest.fn(),
      },
    });
    sagas = [jest.fn(), jest.fn()];
    reduxSagasSpy = jest.spyOn(articleModel, 'reduxSagas', 'get').mockImplementation(
      () => sagas
    );
    markAsSagaInitializedSpy = jest.spyOn(articleModel, 'markAsSagaInitialized');
    gen = modelRootSaga([articleModel]);
  });

  it('calls reduxSagas in article model', () => {
    gen.next();
    expect(reduxSagasSpy).toHaveBeenCalled();
  });

  it('calls markAsSagaInitialized in article model', () => {
    gen.next();
    expect(markAsSagaInitializedSpy).toHaveBeenCalled();
  });

  it('returns a root saga with two blocking sagas as part of the all effects', () => {
    expect(gen.next().value).toEqual(all(
      reduxSagasSpy.mock.results[0].value.map(() => expect.anything()),
    ));
  });

  describe('when an exception occurs', () => {
    let error: any;
    let firstSagaGen: any;

    beforeEach(() => {
      error = new Error();
      firstSagaGen = gen.next().value.payload[0].payload.fn();
      firstSagaGen.next();
    });

    it('ends generator', () => {
      firstSagaGen.throw(error);
      expect(firstSagaGen.next().done).toEqual(true);
    });

    it('console.error the error', () => {
      const consoleErrorMock = jest.spyOn(console, 'error');
      firstSagaGen.throw(error);
      expect(consoleErrorMock).toHaveBeenCalledWith(error);
      consoleErrorMock.mockRestore();
    });
  });
});
