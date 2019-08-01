import { keys, omit } from 'lodash';
import { createSelector } from 'reselect';
import { DispatchProp } from 'react-redux';
import produce from 'immer';
import { Model } from './model';

export class Data {
  protected readonly _dispatch;

  protected readonly _model;

  protected readonly _data;

  protected readonly _scope;

  protected readonly _scopeId;

  private readonly _viewKeys;

  private readonly _controllerKeys;

  public constructor(dispatch: DispatchProp, model: Model, data, scope: string, scopeId: ScopeId) {
    this._dispatch = dispatch;
    this._model = model;
    this._data = data;
    this._scope = scope;
    this._scopeId = scopeId;

    this._viewKeys = keys(this._model.views);
    this._controllerKeys = keys(this._model.controllers);

    const proxy = new Proxy(data, {
      set: (object, key, value) => {
        object[key] = value;
        return true;
      },
      get: (object, key) => object[key],
    });

    for (const view of this._viewKeys) {
      const selector = this.viewSelectors(view).bind(this);
      proxy[view] = () => selector(proxy);
    }

    for (const controller of this._controllerKeys) {
      proxy[controller] = this.controllers(controller).bind(this);
    }

    return proxy;
  }

  public controllers(controller: string) {
    const verifyIsControllerValid = (controller: string): void => {
      if (!this._controllerKeys.includes(controller)) {
        throw {
          name: 'InvalidController',
          message: `The available controllers are: ${this._controllerKeys.join(', ')}.`,
        };
      }
    };

    verifyIsControllerValid(controller);

    const actions = this._model.actions();
    const controllerFunc = produce(this._model.controllers[controller]);

    return (...args) => {
      const dataWithoutViewsAndControllers = omit(this._data, [...this._viewKeys, ...this._controllerKeys]);
      const payload = [controllerFunc(dataWithoutViewsAndControllers, ...args)];
      this._dispatch(actions.set(this._scope, this._scopeId, payload));
    };
  }

  public viewSelectors(view: string) {
    const verifyIsViewValid = (view: string): void => {
      if (!this._viewKeys.includes(view)) {
        throw {
          name: 'InvalidView',
          message: `The available views are: ${this._viewKeys.join(', ')}.`,
        };
      }
    };

    verifyIsViewValid(view);

    const viewFunc = this._model.views[view];
    return createSelector([viewFunc], data => data);
  }
}
