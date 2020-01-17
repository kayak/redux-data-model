import * as allSagaEffects from 'redux-saga/effects'
import {Model, resuxRootSaga} from '../../src';

describe('resuxRootSaga', () => {
  let articleModel;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
      effects: {
        effectA: jest.fn(),
        effectB: jest.fn(),
      }
    });
  });

  it('returns a root saga with two blocking sagas as part of the all effects', () => {
    const gen = resuxRootSaga([articleModel]).next().value;
    expect(gen).toEqual(allSagaEffects.all([expect.anything(), expect.anything()]));
  });
});
