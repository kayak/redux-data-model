import {Model} from '../../src';
import {connectModelImpl} from '../../src/redux/connectModelImpl';

jest.mock('../../src/redux/bindModelActionCreators', () => ({bindModelActionCreators: jest.fn()}));
const {bindModelActionCreators} = jest.requireMock('../../src/redux/bindModelActionCreators');

describe('connectModelImpl', () => {
  let state;
  let dispatch;
  let ownProps;
  let articleModel;
  let modelSelectorsSpy;
  let actionCreatorsSpy;
  let mapStateToPropsSpy;
  let mapDispatchToPropsSpy;

  beforeEach(() => {
    state = {};
    dispatch = jest.fn();
    ownProps = {};
    articleModel = new Model({
      namespace: 'articles',
      state: {},
    });
    articleModel.markAsReduxInitialized();
    Model.disableProxyChecks = true;
    modelSelectorsSpy = jest.spyOn(articleModel, 'modelSelectors').mockImplementation(
      // Implements an identity selector
      () => (data) => data
    );
    actionCreatorsSpy = jest.spyOn(articleModel, 'actionCreators').mockImplementation(
      // Implements an identity action creator
      () => (data) => data
    );
    mapStateToPropsSpy = jest.fn();
    mapDispatchToPropsSpy = jest.fn();
  });

  it('calls modelSelectors in article model', () => {
    connectModelImpl([articleModel]);
    expect(modelSelectorsSpy).toHaveBeenCalled();
  });

  it('returns a list with two items', () => {
    const result = connectModelImpl([articleModel]);
    expect(result).toHaveLength(2);
  });

  it('calls actionCreators in article model', () => {
    connectModelImpl([articleModel]);
    expect(actionCreatorsSpy).toHaveBeenCalled();
  });

  describe('mapStateToProps', () => {
    describe('default', () => {
      it('func returns null', () => {
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel],
        );
        expect(connectedMapStateToProps).toBeNull();
      });
    });

    describe('custom', () => {
      it('func passes state, ownProps and selectors', () => {
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel], mapStateToPropsSpy,
        );
        connectedMapStateToProps(state, ownProps);
        expect(mapStateToPropsSpy).toHaveBeenCalledWith(
          state, ownProps, {[articleModel.namespace]: modelSelectorsSpy.mock.results[0].value},
        );
      });

      it('func returns result from mapStateToProps call', () => {
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel], mapStateToPropsSpy,
        );
        const result = connectedMapStateToProps(state, ownProps);
        expect(result).toEqual(mapStateToPropsSpy.mock.results[0].value);
      });
    });
  });

  describe('mapDispatchToProps', () => {
    describe('default', () => {
      it('func returns result from bindModelActionCreators call', () => {
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel],
        );
        const result = connectedMapDispatchToProps(dispatch, ownProps);
        expect(result).toEqual({[articleModel.namespace]: bindModelActionCreators.mock.results[0].value});
      });
    });

    describe('custom', () => {
      it('func calls bindModelActionCreators with action creators and dispatch', () => {
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel], null, mapDispatchToPropsSpy,
        );
        connectedMapDispatchToProps(dispatch, ownProps);
        expect(bindModelActionCreators).toHaveBeenCalledWith(
          actionCreatorsSpy.mock.results[0].value, mapDispatchToPropsSpy.mock.calls[0][0],
        );
      });

      it('object calls bindModelActionCreators with action creators and dispatch', () => {
        const mapDispatchToPropsObject = {};
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel], null, mapDispatchToPropsObject,
        );
        connectedMapDispatchToProps(dispatch, ownProps);
        expect(bindModelActionCreators).toHaveBeenCalledWith(
          actionCreatorsSpy.mock.results[0].value, dispatch,
        );
      });

      it('func passes dispatch, ownProps and dispatchers', () => {
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel], null, mapDispatchToPropsSpy,
        );
        connectedMapDispatchToProps(dispatch, ownProps);
        expect(mapDispatchToPropsSpy).toHaveBeenCalledWith(
          dispatch, ownProps, {[articleModel.namespace]: bindModelActionCreators.mock.results[0].value},
        );
      });

      it('func returns result from bindModelActionCreators call', () => {
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel], null, mapDispatchToPropsSpy,
        );
        const result = connectedMapDispatchToProps(dispatch, ownProps);
        expect(result).toEqual(bindModelActionCreators.mock.results[0].value);
      });

      it('object returns result from bindModelActionCreators call', () => {
        const mapDispatchToPropsObject = {};
        // @ts-ignore
        const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
          [articleModel], null, mapDispatchToPropsObject,
        );
        const result = connectedMapDispatchToProps(dispatch, ownProps);
        expect(result).toEqual(bindModelActionCreators.mock.results[0].value);
      });
    });
  });

  describe('with nested namespace', () => {
    beforeEach(() => {
      articleModel = new Model({
        namespace: 'projectA.articles',
        state: {},
      });
      articleModel.markAsReduxInitialized();
      modelSelectorsSpy = jest.spyOn(articleModel, 'modelSelectors').mockImplementation(
        // Implements an identity selector
        () => (data) => data
      );
      actionCreatorsSpy = jest.spyOn(articleModel, 'actionCreators').mockImplementation(
        // Implements an identity action creator
        () => (data) => data
      );
      mapDispatchToPropsSpy = jest.fn();
    });

    it('calls actionCreators in article model', () => {
      connectModelImpl([articleModel]);
      expect(actionCreatorsSpy).toHaveBeenCalled();
    });

    it('passes selectors to the user provided map state to props func in a nested way', () => {
      // @ts-ignore
      const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
        [articleModel], mapStateToPropsSpy,
      );
      connectedMapStateToProps(state, ownProps);
      expect(mapStateToPropsSpy).toHaveBeenCalledWith(
        state, ownProps, {projectA: {articles: modelSelectorsSpy.mock.results[0].value}},
      );
    });

    it('passes dispatchers to the user provided map dispatch to props func in a nested way', () => {
      // @ts-ignore
      const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
        [articleModel], null, mapDispatchToPropsSpy,
      );
      connectedMapDispatchToProps(state, ownProps);
      expect(mapDispatchToPropsSpy).toHaveBeenCalledWith(
        state, ownProps, {projectA: {articles: bindModelActionCreators.mock.results[0].value}},
      );
    });
  });
});
