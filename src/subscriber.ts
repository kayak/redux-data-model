import {ActionCreatorsMapObject} from "redux";
import {Saga} from '@redux-saga/core';
import * as sagaEffects from 'redux-saga/effects'
import {Model} from './model';

export class Subscriber {
  public readonly models: Model[];
  public effectNames: string[];
  public reduxSagas: Saga[];

  public constructor(models: Model[]) {
    this.models = models;
    this.effectNames = [];
    this.reduxSagas = [];

    this.takeLatest = this.takeLatest.bind(this);
    this.takeLeading = this.takeLeading.bind(this);
    this.takeEvery = this.takeEvery.bind(this);
    this.modelActionCreators = this.modelActionCreators.bind(this);
  }

  /**
   * Returns an object with action creators, one for each of the declared effects. Only useful for testing purposes,
   * read the docs section on testing for more info. Also supports the inner workings of this class.
   *
   * @returns an action creator's map object.
   */
  public actionCreators(): ActionCreatorsMapObject {
    const actions = {};

    for (const effectName of this.effectNames) {
      actions[effectName] = (actionData: object = {}) => ({...actionData, type: effectName});
    }

    return actions;
  }

  /**
   * @ignore
   */
  public modelActionCreators(): Record<string, ActionCreatorsMapObject> {
    const modelActions = {};

    for (const model of this.models) {
      modelActions[model.namespace] = model.actionCreators();
    }

    return modelActions;
  }

  /**
   * @ignore
   */
  protected take(sagaEffect, actionType: string, actionGenerators): Subscriber {
    const modelActionCreators = this.modelActionCreators();

    this.effectNames.push(actionType);
    this.reduxSagas.push(
      ...actionGenerators.map(generator => function *() {
        yield sagaEffect(
          actionType, function *(action) {
            yield sagaEffects.put(generator(action, modelActionCreators));
          }
        );
      }
      )
    );

    return this;
  }

  /**
   * Adds a subscription, which will watch for the provided actionType. It will default to taking only the latest
   * action at any given moment and calling the respective action generator. This is useful for implementing
   * debounce/throttle like behaviours.
   *
   * @param actionType A string.
   * @param actionGenerators An array of action generators, shaped as function(action, modelActionCreators).
   * @returns this.
   */
  public takeLatest(actionType: string, actionGenerators): Subscriber {
    return this.take(sagaEffects.takeLatest, actionType, actionGenerators);
  }

  /**
   * Adds a subscription, which will watch for the provided actionType. It will default to taking only the leading
   * action at any given moment and calling the respective action generator. This is useful for implementing
   * debounce/throttle like behaviours.
   *
   * @param actionType A string.
   * @param actionGenerators An array of action generators, shaped as function(action, modelActionCreators).
   * @returns this.
   */
  public takeLeading(actionType: string, actionGenerators): Subscriber {
    return this.take(sagaEffects.takeLeading, actionType, actionGenerators);
  }

  /**
   * Adds a subscription, which will watch for the provided actionType. It will default to taking every action and
   * calling the respective action generator, which is equivalent to the behaviour of effects declared in models.
   *
   * @param actionType A string.
   * @param actionGenerators An array of action generators, shaped as function(action, modelActionCreators).
   * @returns this.
   */
  public takeEvery(actionType: string, actionGenerators): Subscriber {
    return this.take(sagaEffects.takeEvery, actionType, actionGenerators);
  }
}
