import {actionCreator} from '../../src/utils';
import {identity} from 'lodash';

describe('actionCreator', () => {
  let __actionInternals;

  beforeEach(() => {
    __actionInternals = {resolve: identity, reject: identity};
  });

  it('returns an object with type, payload and __actionInternals', () => {
    const payload = {1: 2};
    expect(actionCreator('ola', payload, __actionInternals)).toEqual(
      {type: 'ola', payload, __actionInternals}
    );
  });

  it('returns an object with the right type even when payload defines type too', () => {
    const payload = {type: 2, 1: 2};
    expect(actionCreator('ola', payload, __actionInternals)).toEqual(
      {type: 'ola', payload, __actionInternals}
    );
  });

  it('throws when action data is not a plain object', () => {
    expect(() => actionCreator('ola', [])).toThrow({
      name: '',
      message: 'Action data must be a plain object, when calling action [ola]. ' +
      'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
    });
  });
});
