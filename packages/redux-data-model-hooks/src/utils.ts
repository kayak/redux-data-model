import {Model} from "redux-data-model";

/**
 * @ignore
 */
export function checkIfModelIsCombined(
  model: Model,
) {
  if (!model.isLoaded) {
    throw {
      name: 'ModelNotCombinedError',
      message: `Models need to be combined with combineModelReducers prior to any usage. Now ` +
      `make this the case for: ${model.namespace}`,
    };
  }
}
