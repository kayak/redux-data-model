import {Model} from '../../src';
import {connectModelImpl} from '../../src/redux/connectModelImpl';

describe('connectModelImpl', () => {
  let articleModel;
  let modelSelectorsSpy;
  let actionCreatorsSpy;
  let mapDispatchToPropsSpy;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
    });
    articleModel.markAsLoaded();
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

  it('throws when model has not been marked as loaded prior to usage', () => {
    expect(() => {
      articleModel = new Model({
        namespace: 'articles',
        state: {},
      });
      connectModelImpl([articleModel]);
    }).toThrow({
      name: '',
      message: `Models need to be combined with combineModelReducers prior to any usage. Now make this ` +
      `the case for: ${articleModel.namespace}`,
    });
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

  it('passes dispatch and actionCreators to the user provided map state to props func', () => {
    // @ts-ignore
    const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
      [articleModel], null, mapDispatchToPropsSpy,
    );
    connectedMapDispatchToProps(1);
    expect(mapDispatchToPropsSpy).toHaveBeenCalledWith(
      1, {[articleModel.namespace]: actionCreatorsSpy.mock.results[0].value},
    );
  });

  describe('with nested namespace', () => {
    beforeEach(() => {
      articleModel = new Model({
        namespace: 'projectA.articles',
        state: {},
      });
      articleModel.markAsLoaded();
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

    it('passes dispatch and actionCreators to the user provided map state to props func', () => {
      // @ts-ignore
      const [connectedMapStateToProps, connectedMapDispatchToProps] = connectModelImpl(
        [articleModel], null, mapDispatchToPropsSpy,
      );
      connectedMapDispatchToProps(1);
      expect(mapDispatchToPropsSpy).toHaveBeenCalledWith(
        1, {projectA: {articles: actionCreatorsSpy.mock.results[0].value}},
      );
    });
  });
});
