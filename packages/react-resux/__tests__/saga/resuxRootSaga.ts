import * as allSagaEffects from 'redux-saga/effects'
import {Model, resuxRootSaga, Subscriber} from '../../src';

describe('resuxRootSaga', () => {
  let articleModel;
  let subscriberA;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
      effects: {
        effectA: jest.fn()
      }
    });
    subscriberA = new Subscriber([articleModel]).takeLeading(
      'anotherEffect', [jest.fn()],
    );
  });

  it('returns a root saga with two blocking sagas as part of the all effect', () => {
    const gen = resuxRootSaga([articleModel, subscriberA]).next().value;
    expect(gen).toEqual(allSagaEffects.all([expect.anything(), expect.anything()]));
  });
});
