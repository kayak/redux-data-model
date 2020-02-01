import {isPlainObject} from 'lodash';
import {AnyAction} from "redux";

/**
 * @ignore
 */
export interface ActionInternalsObject {
  resolve: Function;
  reject: Function;
}

/**
 * @ignore
 */
export interface ActionWithInternals extends AnyAction {
  type: string;
  payload: object;
  __actionInternals: ActionInternalsObject;
}

/**
 * @ignore
 */
export function actionCreator(
  type: string, payload: object = {}, __actionInternals: ActionInternalsObject=undefined,
): ActionWithInternals {
  if (!isPlainObject(payload)) {
    throw {
      name: 'ActionDataIsntPlainObjectError',
      message: `Action data must be a plain object, when calling action [${type}].`,
    };
  }

  return {type, payload, __actionInternals};
}
