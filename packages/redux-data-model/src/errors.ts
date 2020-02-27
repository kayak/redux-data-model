/**
 * @ignore
 */
const errorClassesIndexUrl = 'https://kayak.github.io/redux-data-model/docs/api/api-index#error-classes';

/**
 * Thrown when the provided [[ModelOptions.namespace|namespace]], for one of your models, isn't a string.
 *
 * @category Error
 */
export class NamespaceIsntAStringError extends Error {
  constructor(model) {
    super(
      `Namespace must be a string. The provided namespace type was: ${typeof model.namespace}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 * Thrown when the provided [[ModelOptions.namespace|namespace]], for one of your models, is an empty string.
 *
 * @category Error
 */
export class EmptyNamespaceError extends Error {
  constructor() {
    super(
      `Namespace must be a non empty string. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 * Thrown when the provided [[ModelOptions.namespace|namespace]], for one of your models, has invalid characters.
 * Keep in mind that a namespace can only contain letters, numbers and/or dots, when nesting the data is needed.
 *
 * @category Error
 */
export class InvalidNamespaceError extends Error {
  constructor (namespaceRegex) {
    super(
      `Namespace can only contain letters, numbers and/or dots, when nesting the data is needed. ` +
      `It was validated against the following regex: ${String(namespaceRegex)}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 *  Thrown when [[ModelOptions.reducers|reducer]] and/or [[ModelOptions.effects|effect]] action types
 *  are duplicated, for one of your models. So don't try to have a [[ModelOptions.reducers|reducer]]
 *  named the same way that an [[ModelOptions.effects|effect]].
 *
 * @category Error
 */
export class DuplicatedActionTypesError extends Error {
  constructor(model, reducerAndEffectActionTypes) {
    super(
      `Reducer and effect action types must be unique in [${model.namespace}] model. The provided ` +
      `reducer/effect action types were: ${reducerAndEffectActionTypes.join(', ')}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 *  Thrown when [[ModelOptions.blockingEffects|blocking effect]] action types don't have a matching
 *  [[ModelOptions.effects|effect]] action type, for one of your models.
 *  A [[ModelOptions.blockingEffects|blocking effect]] is meant to alter the default behavior of a pre-existing
 *  [[ModelOptions.effects|normal effect]], therefore it needs to be named the same way as the
 *  [[ModelOptions.effects|effect]] in question.
 *
 * @category Error
 */
export class BlockingEffectWithoutMatchingEffectError extends Error {
  constructor(model, effectActionTypes) {
    super(
      `Blocking effect action types should match a pre-existing effect action type in ` +
      `[${model.namespace}] model. The provided effect action types were: ${effectActionTypes.join(', ')}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 * Thrown when one of your models was not initialized on a [[combineModelReducers]] call, even though a react
 * component was dispatching actions that were meant to trigger its [[ModelOptions.reducers|reducers]] or a
 * mapStateToProps was using one of its [[ModelOptions.selectors|selectors]] for instance.
 *
 * @category Error
 */
export class ModelNotReduxInitializedError extends Error {
  constructor(model) {
    super(
      `Models need to be initialized with combineModelReducers prior to any usage. Now ` +
      `make this the case for: ${model.namespace}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 * Thrown when one of your models was not initialized on a [[modelRootSaga]] call, even though a react component
 * was dispatching actions that were meant to trigger its [[ModelOptions.effects|effects]] for instance.
 *
 * @category Error
 */
export class ModelNotSagaInitializedError extends Error {
  constructor(model) {
    super(
      `Models need to be initialized with modelRootSaga prior to any usage. Now ` +
      `make this the case for: ${model.namespace}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 * Thrown when multiple models have the same [[ModelOptions.namespace|namespace]]. So just name them differently.
 *
 * @category Error
 */
export class DuplicatedModelNamespaceError extends Error {
  constructor(namespaces) {
    super(
      `Namespace in models must be unique. The following namespaces, in order, were referenced in ` +
      `combineModelReducers: ${namespaces.join(', ')}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 * Thrown when provided action data isn't an object. When dispatching an action, the sole argument must be an
 * object.
 *
 * @category Error
 */
export class ActionDataIsntPlainObjectError extends Error {
  constructor(actionType) {
    super(
      `Action data must be a plain object, when calling action [${actionType}]. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}

/**
 * Thrown when an action type matching a model one wasn't initialized properly. That could happen when
 * dispatching actions without using the provided abstractions, such as by working around and
 * calling dispatch yourself.
 *
 * @category Error
 */
export class NonCompatibleActionError extends Error {
  constructor(action) {
    super(
      `The provided action lacks the internals for being redux-data-model-able. Be sure to ` +
      `use bindModelActionCreators instead of redux's bindActionCreators. The action in question ` +
      `is: ${JSON.stringify(action)}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = this.constructor.name;
  }
}