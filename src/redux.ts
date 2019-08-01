import { Reducer, AnyAction, compose } from 'redux';
import { Model } from './model';

export function combineModelReducers(models: Model[]): Reducer<unknown, AnyAction> {
  return compose(...models.map(model => model.reducers()));
}
