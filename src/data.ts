import { keys, isArray, omit } from 'lodash';
import { createSelector } from 'reselect';
import { DispatchProp, batch } from 'react-redux';
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

    for (const viewKey of this._viewKeys) {
      const selector = this.viewSelectors(viewKey).bind(this);
      proxy[viewKey] = () => isArray(data) ? proxy.map(selector) : selector(proxy);
    }

    for (const controllerKey of this._controllerKeys) {
      const controller = this.controllers(controllerKey).bind(this);
      proxy[controllerKey] = controller;
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
    const controllerFunc = produce((...args) => { this._model.controllers[controller](...args); });

    return (...args) => {
      const data = isArray(this._data) ? this._data : [this._data];
      const payload = batch(
        () => data.map(instance => {
          const dataWithoutHelpers = omit(instance, [...this._viewKeys, ...this._controllerKeys]);
          return controllerFunc(dataWithoutHelpers, ...args)
        })
      );
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
