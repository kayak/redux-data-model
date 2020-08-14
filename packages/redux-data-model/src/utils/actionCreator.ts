import {isPlainObject} from 'lodash';
import {AnyAction} from "redux";
import {ActionDataIsntPlainObjectError} from "../errors";

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
  payload: any;
  __actionInternals: ActionInternalsObject | undefined;
}

/**
 * @ignore
 */
export function actionCreator(
  type: string, payload: any = {}, __actionInternals: ActionInternalsObject | undefined=undefined,
): ActionWithInternals {
  if (!isPlainObject(payload)) {
    throw new ActionDataIsntPlainObjectError(type);
  }

  return {type, payload, __actionInternals};
}
