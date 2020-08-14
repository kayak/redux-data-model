import {modelBlockingGenerator} from '../../src/saga';

describe('modelBlockingGenerator', () => {
  let effectASpy: any;
  let effectGenerator: any;
  let payload: any;
  let __actionInternals: any;
  let action: any;
  let gen: any;

  beforeEach(() => {
    payload = {};
    __actionInternals = {resolve: jest.fn(), reject: jest.fn()};
    action = {type: 'whatever', payload, __actionInternals};
    effectASpy = jest.fn().mockReturnValue('ola');

    effectGenerator = function *() {
      yield effectASpy();
    };

    gen = modelBlockingGenerator(effectGenerator)(action);
  });

  it('uses the provided effectFunc', () => {
    expect(gen.next().value).toEqual(
      effectGenerator(expect.anything(), expect.anything()).next().value,
    );
  });

  it('passes the right arguments to the effectASpy effect', () => {
    expect(gen.next().value).toEqual(
      effectASpy.mock.results[0].value,
    );
  });

  it('throws NonCompatibleActionError when action is not compatible', () => {
    const nonCompatibleAction = {type: 'whatever', payload: {}};
    // @ts-ignore
    gen = modelBlockingGenerator(effectGenerator)(nonCompatibleAction);
    expect(() => gen.next()).toThrow({
      name: 'NonCompatibleActionError',
      message: `The provided action lacks the internals for being redux-data-model-able. Be sure to use ` +
        `bindModelActionCreators instead of redux's bindActionCreators. The action in question ` +
        `is: ${JSON.stringify(nonCompatibleAction)}. ` +
        'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.',
    });
  });

  describe('when no exception occurred calls resolve', () => {
    it('with undefined as return value by default', () => {
      gen.next();
      gen.next();
      expect(__actionInternals.resolve).toHaveBeenCalledWith(undefined);
    });

    it('with effect return value when available', () => {
      const returnValue = 'finished';
      effectGenerator = function *() {
        yield effectASpy();
        return returnValue;
      };
      gen = modelBlockingGenerator(effectGenerator)(action);
      gen.next();
      gen.next();
      expect(__actionInternals.resolve).toHaveBeenCalledWith(returnValue);
    });
  });

  describe('when an exception occurs', () => {
    it('calls reject', () => {
      const error = new Error();
      effectASpy.mockImplementation(() => {
        throw error;
      });
      try {
        gen.next();
      } catch {}
      expect(__actionInternals.reject).toHaveBeenCalledWith(error);
    });

    it('rethrows the error', () => {
      const error = new Error();
      effectASpy.mockImplementation(() => {
        throw error;
      });
      expect(() => gen.next()).toThrow(error);
    });
  });
});
