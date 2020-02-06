import {Model} from 'redux-data-model';
import {checkIfModelIsCombined} from '../src/utils';

describe('checkIfModelIsCombined', () => {
  let modelOptions;
  let counterModel;

  beforeEach(() => {
    modelOptions = {
      namespace: 'counter',
      state: {},
    };
    counterModel = new Model(modelOptions);
  });

  it('throws when model has not been marked as loaded prior to usage', () => {
    expect(() => {
      checkIfModelIsCombined(counterModel);
    }).toThrow({
      name: '',
      message: `Models need to be combined with combineModelReducers prior to any usage. Now make this ` +
      `the case for: ${counterModel.namespace}`,
    });
  });

  it('does not thrown when model has been marked as loaded prior to usage', () => {
    expect(() => {
      counterModel.markAsLoaded();
      checkIfModelIsCombined(counterModel);
    }).not.toThrow();
  });
});
