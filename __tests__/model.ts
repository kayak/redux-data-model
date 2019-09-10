import * as allSagaEffects from "redux-saga/effects";
import {Model} from '../src';
import {sagaEffects} from '../src/model';

describe('Model', () => {
  let articleModel;

  beforeAll(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
    });
  });

  describe('namespace', () => {
    it('returns the namespace', () => {
      expect(articleModel.namespace).toEqual('articles');
    });
  });

  it('actionType returns the actionName with the namespace', () => {
    expect(articleModel.actionType('ola')).toEqual(`${articleModel.namespace}.ola`);
  });

  describe('actionCreator', () => {
    it('returns an object with type and all data', () => {
      const actionData = {1: 2};
      expect(articleModel.actionCreator('ola', actionData)).toEqual(
        {...actionData, type: articleModel.actionType('ola')}
      );
    });

    it('returns an object with the right type even when actionData defines type too', () => {
      const actionData = {type: 2, 1: 2};
      expect(articleModel.actionCreator('ola', actionData)).toEqual(
        {...actionData, type: articleModel.actionType('ola')}
      );
    });
  });

  describe('actionCreators', () => {
    it('returns an empty object when no reducers or effects exists', () => {
      expect(articleModel.actionCreators()).toEqual({});
    });

    describe('when reducers are present', () => {
      const loadSomethingReducerSpy = jest.fn();
      const modelX = new Model({
        namespace: 'articles',
        state: {},
        reducers: {
          // @ts-ignore
          loadSomethingReducer: loadSomethingReducerSpy,
        },
      });
      const actionCreatorSpy = jest.spyOn(modelX, 'actionCreator');
      const actionCreators = modelX.actionCreators();
      const actionData = {1: 2};


      it('returns an entry for the provided reducer', () => {
        expect(actionCreators).toEqual(
          {loadSomethingReducer: expect.anything()}
        );
      });

      it('calls actionCreator func when actionCreator entry is called', () => {
        actionCreators.loadSomethingReducer(actionData);
        expect(actionCreatorSpy).toHaveBeenCalledWith('loadSomethingReducer', actionData);
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingReducer(actionData)).toEqual(
          modelX.actionCreator('loadSomethingReducer', actionData)
        );
      });
    });

    describe('when effects are present', () => {
      const loadSomethingEffectSpy = jest.fn();
      const modelX = new Model({
        namespace: 'articles',
        state: {},
        effects: {
          // @ts-ignore
          loadSomethingEffect: loadSomethingEffectSpy,
        },
      });
      const actionCreatorSpy = jest.spyOn(modelX, 'actionCreator');
      const actionCreators = modelX.actionCreators();
      const actionData = {1: 2};

      it('returns an entry for the provided effect', () => {
        expect(actionCreators).toEqual(
          {loadSomethingEffect: expect.anything()}
        );
      });

      it('calls actionCreator func when actionCreator entry is called', () => {
        actionCreators.loadSomethingEffect(actionData);
        expect(actionCreatorSpy).toHaveBeenCalledWith('loadSomethingEffect', actionData);
      });

      it('returns result of actionCreator func', () => {
        expect(actionCreators.loadSomethingEffect(actionData)).toEqual(
          modelX.actionCreator('loadSomethingEffect', actionData)
        );
      });
    });
  });

  describe('selectors', () => {
    it('returns an empty object when no selectors exists', () => {
      expect(articleModel.actionCreators()).toEqual({});
    });

    describe('when selectors are present', () => {
      const selectASpy = jest.fn();
      const state = {};
      const modelX = new Model({
        namespace: 'articles',
        state,
        selectors: {
          // @ts-ignore
          selectA: selectASpy,
        },
      });
      const selectors = modelX.selectors();

      it('returns an entry for the provided selector', () => {
        expect(selectors).toEqual(
          {selectA: expect.anything()}
        );
      });

      it('calls selector func when selector entry is called', () => {
        selectors.selectA(state, 1);
        expect(selectASpy).toHaveBeenCalledWith(state, 1);
      });

      it('returns result of selector func', () => {
        expect(selectors.selectA(state)).toEqual(selectASpy.mock.results[0].value);
      });
    });
  });

  describe('reducers', () => {
    it('returns a non nil value when no reducers exist', () => {
      expect(articleModel.reducers()).toEqual(expect.anything());
    });

    describe('when reducers are present', () => {
      // @ts-ignore
      const reducerASpy = jest.fn().mockImplementation((state, action) => state.ola = 'hi');
      const state = {};
      const modelX = new Model({
        namespace: 'articles',
        state,
        reducers: {
          // @ts-ignore
          reducerA: reducerASpy,
        },
      });
      const reducers = modelX.reducers();
      const action = modelX.actionCreator('reducerA');

      it('calls reducer func when reducer entry is called', () => {
        reducers(state, action);
        expect(reducerASpy).toHaveBeenCalled();
      });

      it('returns result of reducer func', () => {
        expect(reducers(state, action)).toEqual({ola: 'hi'});
      });
    });
  });

  describe('effects', () => {
    it('returns an empty object when no effects exists', () => {
      expect(articleModel.effects()).toEqual({});
    });

    describe('when effects are present', () => {
      const effectASpy = jest.fn();
      const state = {};
      const modelX = new Model({
        namespace: 'articles',
        state,
        effects: {
          // @ts-ignore
          effectA: effectASpy,
        },
      });
      const effects = modelX.effects();

      it('returns an entry for the provided effect', () => {
        expect(effects).toEqual(
          {effectA: expect.anything()}
        );
      });

      it('calls effect func when selector entry is called', () => {
        effects.effectA({userId: 1});
        expect(effectASpy).toHaveBeenCalledWith({userId: 1}, sagaEffects);
      });

      it('returns result of effect func', () => {
        expect(effects.effectA({userId: 1})).toEqual(effectASpy.mock.results[0].value);
      });
    });
  });

  describe('reduxSagas', () => {
    it('returns an empty list when no effects exists', () => {
      expect(articleModel.reduxSagas).toEqual([]);
    });

    describe('when effects are present', () => {
      let gen;
      const effectASpy = jest.fn();
      const state = {};
      const modelX = new Model({
        namespace: 'articles',
        state,
        effects: {
          // @ts-ignore
          effectA: effectASpy,
        },
      });
      const actionData = {userId: 1};

      beforeEach(() => {
        gen = modelX.reduxSagas[0]();
      });

      it('uses takeEvery saga effect', () => {
        expect(gen.next().value).toEqual(
          allSagaEffects.takeEvery(expect.anything(), expect.anything()),
        );
      });

      it('passes the right arguments to the effectASpy effect', () => {
        expect(gen.next().value.payload.args).toEqual(
          [modelX.actionType('effectA'), expect.anything()],
        );
      });

      it('calls effectASpy with the right arguments', () => {
        gen.next().value.payload.args[1](actionData, sagaEffects);
        expect(effectASpy).toHaveBeenCalledWith(
          actionData, sagaEffects,
        );
      });
    });
  });
});
