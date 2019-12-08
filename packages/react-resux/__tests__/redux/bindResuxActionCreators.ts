import {bindResuxActionCreators} from '../../src';

jest.mock('redux', () => ({combineReducers: jest.fn()}));

describe('bindResuxActionCreators', () => {
  let actionCreators;
  let dispatchSpy;
  let actionData;
  let boundActionDispatchers;

  beforeEach(() => {
    actionCreators = {
      actionA: jest.fn((...args) => ({...args, type: 'actionA'})),
    };
    dispatchSpy = jest.fn();
    actionData = {arg: 1};
    boundActionDispatchers = bindResuxActionCreators(actionCreators, dispatchSpy);
  });

  it('returns an object with the same shape', () => {
    expect(boundActionDispatchers).toEqual({actionA: expect.any(Function)});
  });

  describe('when bound action creator is called', () => {
    it('calls the provided dispatch using the action creator return as the only arg', () => {
      boundActionDispatchers.actionA(actionData);
      expect(dispatchSpy).toHaveBeenCalledWith(actionCreators.actionA.mock.results[0].value);
    });

    it('calls the provided action creator when bound action creator is called', () => {
      boundActionDispatchers.actionA(actionData);
      expect(actionCreators.actionA).toHaveBeenCalledWith(
        actionData, {resolve: expect.any(Function), reject: expect.any(Function)},
      );
    });

    describe('returned value', () => {
      it('is of type Promise', () => {
        const promise = boundActionDispatchers.actionA(actionData);
        expect(promise).toStrictEqual(expect.any(Promise));
      });

      describe('passes some internal metadata as part of the second argument of the action creator', () => {
        it('that amounts to the following shape', () => {
          boundActionDispatchers.actionA(actionData);
          expect(actionCreators.actionA.mock.results[0].value[1]).toEqual(
            {resolve: expect.any(Function), reject: expect.any(Function)},
          );
        });

        it('that can be used to resolve the promise', () => {
          const promise = boundActionDispatchers.actionA(actionData);
          const returnValue = 'hi';
          actionCreators.actionA.mock.results[0].value[1].resolve(returnValue);
          expect(promise).resolves.toBe(returnValue);
        });

        it('that can be used to reject the promise', () => {
          const promise = boundActionDispatchers.actionA(actionData);
          const error = new Error();
          actionCreators.actionA.mock.results[0].value[1].reject(error);
          expect(promise).rejects.toBe(error);
        });
      });
    });
  });
});
