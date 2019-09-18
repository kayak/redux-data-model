import * as allSagaEffects from 'redux-saga/effects'
import {combineModelReducers, Model, resuxRootSaga, Subscriber} from '../src';
import {connectResuxImpl} from '../src/redux';

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

describe('combineModelReducers', () => {
  let articleModel;
  let reducersSpy;
  let result;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
    });
    reducersSpy = jest.spyOn(articleModel, 'reducers').mockImplementation(
      // Implements an identity reducer
      () => (data) => data
    );
    result = combineModelReducers([articleModel]);
  });

  it('calls reducers in article model', () => {
    expect(reducersSpy).toHaveBeenCalled();
  });

  it('returns a reducer mapping object with the reducers of the article model', () => {
    expect(result).toEqual({[articleModel.namespace]: reducersSpy.mock.results[0].value});
  });

  it('throws when multiple modals have the same namespace', () => {
    expect(() => {
      combineModelReducers([articleModel, articleModel])
    }).toThrow({
      name: '',
      message: 'Namespace in models must be unique. The following namespaces, in order, were referenced in ' +
      'combineModelReducers: articles, articles',
    });
  });
});

describe('connectResuxImpl', () => {
  let articleModel;
  let selectorsSpy;
  let actionCreatorsSpy;
  let mapDispatchToPropsSpy;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
    });
    selectorsSpy = jest.spyOn(articleModel, 'selectors').mockImplementation(
      // Implements an identity reducer
      () => (data) => data
    );
    actionCreatorsSpy = jest.spyOn(articleModel, 'actionCreators').mockImplementation(
      // Implements an identity reducer
      () => (data) => data
    );
    mapDispatchToPropsSpy = jest.fn();
  });

  it('calls selectors in article model', () => {
    connectResuxImpl([articleModel]);
    expect(selectorsSpy).toHaveBeenCalled();
  });

  it('returns a list with two items', () => {
    const result = connectResuxImpl([articleModel]);
    expect(result).toHaveLength(2);
  });

  describe('with subscribers', () => {
    let subscriberA;
    let subscriberActionCreatorSpy;

    beforeEach(() => {
      subscriberA = new Subscriber([articleModel]);
      subscriberActionCreatorSpy = jest.spyOn(subscriberA, 'actionCreators').mockImplementation(
        // Implements an identity reducer
        () => (data) => data
      );
    });

    it('calls actionCreators in article model', () => {
      connectResuxImpl([articleModel]);
      expect(actionCreatorsSpy).toHaveBeenCalled();
    });

    it('calls actionCreators in subscriber', () => {
      connectResuxImpl([subscriberA]);
      expect(subscriberActionCreatorSpy).toHaveBeenCalled();
    });

    it('passes dispatch and actionCreators to the user provided map state to props func', () => {
      // @ts-ignore
      const [connectedMapStateToProps, connectedMapDispatchToProps] = connectResuxImpl(
        [articleModel, subscriberA], null, mapDispatchToPropsSpy,
      );
      connectedMapDispatchToProps(1);
      expect(mapDispatchToPropsSpy).toHaveBeenCalledWith(
        1, {[articleModel.namespace]: actionCreatorsSpy.mock.results[0].value},
        {...subscriberActionCreatorSpy.mock.results[0].value},
      );
    });
  });

  describe('without subscribers', () => {
    it('calls actionCreators in article model', () => {
      connectResuxImpl([articleModel]);
      expect(actionCreatorsSpy).toHaveBeenCalled();
    });

    it('passes dispatch and actionCreators to the user provided map state to props func', () => {
      // @ts-ignore
      const [connectedMapStateToProps, connectedMapDispatchToProps] = connectResuxImpl(
        [articleModel], null, mapDispatchToPropsSpy,
      );
      connectedMapDispatchToProps(1);
      expect(mapDispatchToPropsSpy).toHaveBeenCalledWith(
        1, {[articleModel.namespace]: actionCreatorsSpy.mock.results[0].value}, {},
      );
    });
  });
});
