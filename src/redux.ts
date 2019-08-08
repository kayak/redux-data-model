import { Reducer, AnyAction } from 'redux';
import { Model } from './model';

export function combineModelReducers(models: Model[]): Reducer<unknown, AnyAction> {
  const reducers = models.map(model => model.reducers());
  return (state, action) => {
    let reducedState = state;

    for (const reducer of reducers) {
      reducedState = reducer(reducedState, action);
    }

    return reducedState;
  }
}
