import {wrapMergePropChecks} from '../../src/redux/wrapMergePropChecks';

jest.mock('redux', () => ({combineReducers: jest.fn()}));

describe('wrapMergePropChecks', () => {
  let ownProps;
  let stateProps;
  let dispatchProps;
  let mergePropsFunc;

  beforeAll(() => {
    ownProps = {a: true};
    stateProps = {b: true};
    dispatchProps = {c: true};
  });

  describe('default mergeProps', () => {
    beforeEach(() => {
      mergePropsFunc = wrapMergePropChecks();
    });

    it.each([
      [{a: true}, {a: true}, {a: true}, {mapStateToProps: 'a', mapDispatchToProps: 'a', ownProps: 'a'}],
      [{a: true, b: true}, {a: true, c: true}, {a: true, d:true}, {mapStateToProps: 'a', mapDispatchToProps: 'a', ownProps: 'a'}],
      [{a: true, b: true}, {b: true}, {d:true}, {mapStateToProps: 'b', mapDispatchToProps: 'b', ownProps: ''}],
      [{a: true, b: true}, {c: true}, {b:true}, {mapStateToProps: 'b', mapDispatchToProps: '', ownProps: 'b'}],
      [{a: true, b: true}, {c: true}, {c:true}, {mapStateToProps: '', mapDispatchToProps: 'c', ownProps: 'c'}],
    ])(
    'throws when there is a conflict among the props (mapStateToProps=%j, mapDispatchToProps=%j, ownProps=%j)',
    // @ts-ignore
    (
      mapStateToProps, mapDispatchToProps, ownProps, expected,
    ) => {
      expect(() => {
        mergePropsFunc(mapStateToProps, mapDispatchToProps, ownProps);
      }).toThrow({
        name: '',
        message: (
          `A connectModel HOC has conflicts when merging the result of props from the parent component, ` +
          `mapStateToProps props, or mapDispatchToProps props. ` +
          `Conflicts are: \n\n` +
          `mapStateToProps conflicts: ${expected.mapStateToProps}\n` +
          `mapDispatchToProps conflicts: ${expected.mapDispatchToProps}\n` +
          `ownProps conflicts: ${expected.ownProps}\n` +
          `\nTo fix preferably change your mapStateToProps and mapDispatchToProps implementation ` +
          `to remove the conflicts. Providing your own mergeProps is also an alternative. ` +
          'See https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes for more info.'
        ),
      });
    });

    describe('when no prop conflict exists', () => {
      it('returns { ...ownProps, ...stateProps, ...dispatchProps }', () => {
        expect(mergePropsFunc(ownProps, stateProps, dispatchProps)).toEqual({ ...ownProps, ...stateProps, ...dispatchProps });
      });

      it('does not thrown', () => {
        expect(() => {
          mergePropsFunc(ownProps, stateProps, dispatchProps);
        }).not.toThrow();
      });
    });
  });

  describe('custom mergeProps', () => {
    let customMergeProps;

    beforeEach(() => {
      customMergeProps = jest.fn((a, b, c) => ({...a, ...b, ...c}));
      mergePropsFunc = wrapMergePropChecks(customMergeProps);
    });

    it('returns the provided mergeProps', () => {
      expect(mergePropsFunc).toEqual(customMergeProps);
    });

    it('does not thrown even when prop conflict exists', () => {
      expect(() => {
        mergePropsFunc(ownProps, stateProps, dispatchProps);
      }).not.toThrow();
    });
  });
});
