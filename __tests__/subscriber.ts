import * as allSagaEffects from 'redux-saga/effects'
import {Model, Subscriber} from '../src';

describe('Subscriber', () => {
  let articleModel;
  let subscriber;
  let reducerASpy;
  let action;

  beforeEach(() => {
    reducerASpy = jest.fn();
    articleModel = new Model({
      namespace: 'articles',
      state: {},
      reducers: {
        reducerA: reducerASpy,
      }
    });
    subscriber = new Subscriber([articleModel]);
    action = {type: articleModel.actionType('reducerA')};
  });

  describe('modelActionCreators', () => {
    let actionCreatorSpy;

    beforeEach(() => {
      actionCreatorSpy = jest.spyOn(articleModel, 'actionCreators');
    });

    it('returns an entry for every model with their actionCreators', () => {
      expect(subscriber.modelActionCreators()).toEqual(
        {[articleModel.namespace]: actionCreatorSpy.mock.results[0].value}
      );
    });
  });

  describe('actionCreators', () => {
    it('returns an empty object when no reducers or effects exists', () => {
      expect(subscriber.actionCreators()).toEqual({});
    });

    it('returns an entry for takeLeading subscriptions', () => {
      expect(subscriber.takeLeading('takeLeadingEffect', []).actionCreators()).toEqual(
        {takeLeadingEffect: expect.anything()}
        );
    });

    it('returns an entry for takeLatest subscriptions', () => {
      expect(subscriber.takeLatest('takeLatestEffect', []).actionCreators()).toEqual(
        {takeLatestEffect: expect.anything()}
        );
    });

    it('returns an entry for takeLeading subscriptions', () => {
      expect(subscriber.takeEvery('takeEveryEffect', []).actionCreators()).toEqual(
        {takeEveryEffect: expect.anything()}
        );
    });
  });

  describe('reduxSagas', () => {
    it('returns an empty list when no subscription exists', () => {
      expect(subscriber.reduxSagas).toEqual([]);
    });

    it('returns an empty list when action generator list is empty for a subscription', () => {
      expect(subscriber.takeLeading('takeLeadingEffect', []).reduxSagas).toEqual([]);
    });

    it('returns a saga per action generator in a subscription', () => {
      expect(subscriber.takeLeading('takeLeadingEffect', [
        jest.fn(),
        jest.fn(),
      ]).reduxSagas).toHaveLength(2);
    });

    it('returns a saga per action generator in a subscription for as many subscriptions exist', () => {
      expect(
        subscriber.takeLeading('takeLeadingEffect1', [
        jest.fn(),
        jest.fn(),
      ]).takeLeading('takeLeadingEffect2', [
        jest.fn(),
        jest.fn(),
      ]).reduxSagas).toHaveLength(4);
    });

    describe('takeLeading', () => {
      let gen;

      beforeEach(() => {
        gen = subscriber.takeLeading('whatever',
          [(action, {articles}) =>
            articles.reducerA(action.page)],
        ).reduxSagas[0]();
      });

      it('uses takeLeading saga effect', () => {
        expect(gen.next().value).toEqual(
          allSagaEffects.takeLeading(expect.anything(), expect.anything()),
        );
      });

      it('passes the right arguments to the takeLeading effect', () => {
        expect(gen.next().value.payload.args).toEqual(
          ['whatever', expect.anything()],
        );
      });

      it('calls generator that yields put(reducerAAction)', () => {
        const worker = gen.next().value.payload.args[1](action);
        expect(worker.next().value).toEqual(
          allSagaEffects.put(action)
        );
      });
    });

    describe('takeLatest', () => {
      let gen;

      beforeEach(() => {
        gen = subscriber.takeLatest('whatever',
          [(action, {articles}) => articles.reducerA(action.page)],
        ).reduxSagas[0]();
      });

      it('uses takeLatest saga effect', () => {
        expect(gen.next().value).toEqual(
          allSagaEffects.takeLatest(expect.anything(), expect.anything()),
        );
      });

      it('passes the right arguments to the takeLatest effect', () => {
        expect(gen.next().value.payload.args).toEqual(
          ['whatever', expect.anything()],
        );
      });

      it('calls generator that yields put(reducerAAction)', () => {
        const worker = gen.next().value.payload.args[1](action);
        expect(worker.next().value).toEqual(
          allSagaEffects.put(action)
        );
      });
    });

    describe('takeEvery', () => {
      let gen;

      beforeEach(() => {
        gen = subscriber.takeEvery('whatever',
          [(action, {articles}) => articles.reducerA(action.page)],
        ).reduxSagas[0]();
      });

      it('uses takeEvery saga effect', () => {
        expect(gen.next().value).toEqual(
          allSagaEffects.takeEvery(expect.anything(), expect.anything()),
        );
      });

      it('passes the right arguments to the takeEvery effect', () => {
        expect(gen.next().value.payload.args).toEqual(
          ['whatever', expect.anything()],
        );
      });

      it('calls generator that yields put(reducerAAction)', () => {
        const worker = gen.next().value.payload.args[1](action);
        expect(worker.next().value).toEqual(
          allSagaEffects.put(action)
        );
      });
    });
  });
});
