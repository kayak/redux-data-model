import {isPlainObject} from 'lodash';
import {AnyAction} from "redux";
import {ActionInternals} from '../baseTypes';
import {ActionDataIsntPlainObjectError} from "../errors";

/**
 * @ignore
 */
export interface ActionWithInternals extends AnyAction {
  type: string;
  payload: any;
  __actionInternals: ActionInternals | undefined;
}

/**
 * @ignore
 */
export function actionCreator(
  type: string, payload: any = {}, __actionInternals: ActionInternals | undefined=undefined,
): ActionWithInternals {
  if (!isPlainObject(payload)) {
    throw new ActionDataIsntPlainObjectError(type);
  }

  return {type, payload, __actionInternals};
}
