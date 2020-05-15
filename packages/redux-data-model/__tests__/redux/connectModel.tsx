import {connect} from 'react-redux';
import {connectModel} from '../../src';

jest.mock('react-redux', () => ({connect: jest.fn()}));
jest.mock('../../src/redux/connectModelImpl', () => ({connectModelImpl: jest.fn(() => [jest.fn(), jest.fn()])}));
jest.mock('../../src/redux/wrapMergePropChecks', () => ({wrapMergePropChecks: jest.fn()}));
const {connectModelImpl} = jest.requireMock('../../src/redux/connectModelImpl');
const {wrapMergePropChecks} = jest.requireMock('../../src/redux/wrapMergePropChecks');

describe('connectModel', () => {
  let counterModel;

  beforeAll(() => {
    counterModel = {};
  });

  it('returns result of connect call', () => {
    const result = connectModel([counterModel]);
    expect(result).toEqual(connect.mock.results[0].value);
  });

  it('calls connectModelImpl with user defined mapStateToProps and mapDispatchToProps', () => {
    const models = [counterModel];
    const mapStateToProps = jest.fn();
    const mapDispatchToProps = jest.fn();
    connectModel(models, mapStateToProps, mapDispatchToProps);
    expect(connectModelImpl).toHaveBeenCalledWith(models, mapStateToProps, mapDispatchToProps);
  });

  it('calls connect with the mapStateToProps and mapDispatchToProps from connectModelImpl', () => {
    connectModel([counterModel]);
    expect(connect).toHaveBeenCalledWith(...connectModelImpl.mock.results[0].value, wrapMergePropChecks.mock.results[0].value, undefined);
  });

  describe('calls connect with a custom mergeProps', () => {
    let mergeProps;

    beforeEach(() => {
      mergeProps = jest.fn();
    });

    it('calls wrapMergePropChecks with the custom mergeProps', () => {
      connectModel([counterModel], null, null, mergeProps);
      expect(wrapMergePropChecks).toHaveBeenCalledWith(mergeProps);
    });

    it('calls connect with a mergeProps as the result of the wrapMergePropChecks call', () => {
      const mergeProps = jest.fn();
      connectModel([counterModel], null, null, mergeProps);
      expect(connect).toHaveBeenCalledWith(...connectModelImpl.mock.results[0].value, wrapMergePropChecks.mock.results[0].value, undefined);
    });
  });

  it('calls connect with an options argument if provided', () => {
    const options = {};
    connectModel([counterModel], null, null, null, options);
    expect(connect).toHaveBeenCalledWith(...connectModelImpl.mock.results[0].value, wrapMergePropChecks.mock.results[0].value, options);
  });
});
