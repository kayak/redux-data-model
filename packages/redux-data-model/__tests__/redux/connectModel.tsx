import {connect} from 'react-redux';
import {connectModel} from '../../src';

jest.mock('react-redux', () => ({connect: jest.fn()}));
jest.mock('../../src/redux/connectModelImpl', () => ({connectModelImpl: jest.fn(() => [jest.fn(), jest.fn()])}));
const {connectModelImpl} = jest.requireMock('../../src/redux/connectModelImpl');

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
    expect(connect).toHaveBeenCalledWith(...connectModelImpl.mock.results[0].value, undefined, undefined);
  });

  it('calls connect with a mergeProps argument if provided', () => {
    const mergeProps = jest.fn();
    connectModel([counterModel], null, null, mergeProps);
    expect(connect).toHaveBeenCalledWith(...connectModelImpl.mock.results[0].value, mergeProps, undefined);
  });

  it('calls connect with an options argument if provided', () => {
    const options = {};
    connectModel([counterModel], null, null, null, options);
    expect(connect).toHaveBeenCalledWith(...connectModelImpl.mock.results[0].value, null, options);
  });
});
