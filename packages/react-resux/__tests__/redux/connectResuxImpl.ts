import {Model} from '../../src';
import {connectResuxImpl} from '../../src/redux/connectResuxImpl';

describe('connectResuxImpl', () => {
  let articleModel;
  let modelSelectorsSpy;
  let actionCreatorsSpy;
  let mapDispatchToPropsSpy;

  beforeEach(() => {
    articleModel = new Model({
      namespace: 'articles',
      state: {},
    });
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

  it('calls modelSelectors in article model', () => {
    connectResuxImpl([articleModel]);
    expect(modelSelectorsSpy).toHaveBeenCalled();
  });

  it('returns a list with two items', () => {
    const result = connectResuxImpl([articleModel]);
    expect(result).toHaveLength(2);
  });

  it('calls actionCreators in article model', () => {
    connectResuxImpl([articleModel]);
    expect(actionCreatorsSpy).toHaveBeenCalled();
  });

  it('passes dispatch and actionCreators to the user provided map state to props func', () => {
    // @ts-ignore
    const [connectedMapStateToProps, connectedMapDispatchToProps] = connectResuxImpl(
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
      connectResuxImpl([articleModel]);
      expect(actionCreatorsSpy).toHaveBeenCalled();
    });

    it('passes dispatch and actionCreators to the user provided map state to props func', () => {
      // @ts-ignore
      const [connectedMapStateToProps, connectedMapDispatchToProps] = connectResuxImpl(
        [articleModel], null, mapDispatchToPropsSpy,
      );
      connectedMapDispatchToProps(1);
      expect(mapDispatchToPropsSpy).toHaveBeenCalledWith(
        1, {projectA: {articles: actionCreatorsSpy.mock.results[0].value}},
      );
    });
  });
});
