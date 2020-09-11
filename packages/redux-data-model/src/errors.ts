import {isEmpty} from 'lodash';
import {sagaEffects, blockingSagaEffects} from './saga';
import {Model} from './model';
import {AnyAction} from 'redux';

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
  constructor(model: Model<unknown, unknown, unknown, unknown>) {
    super(
      `Namespace must be a string. The provided namespace type was: ${typeof model.namespace}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'NamespaceIsntAStringError';
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
    this.name = 'EmptyNamespaceError';
  }
}

/**
 * Thrown when the provided [[ModelOptions.namespace|namespace]], for one of your models, has invalid characters.
 * Keep in mind that a namespace can only contain letters, numbers and/or dots, when nesting the data is needed.
 *
 * @category Error
 */
export class InvalidNamespaceError extends Error {
  constructor (namespaceRegex: RegExp) {
    super(
      `Namespace can only contain letters, numbers and/or dots, when nesting the data is needed. ` +
      `It was validated against the following regex: ${String(namespaceRegex)}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'InvalidNamespaceError';
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
  constructor(model: Model<unknown, unknown, unknown, unknown>, reducerAndEffectActionTypes: string[]) {
    super(
      `Reducer and effect action types must be unique in [${model.namespace}] model. The provided ` +
      `reducer/effect action types were: ${reducerAndEffectActionTypes.join(', ')}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'DuplicatedActionTypesError';
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
  constructor(model: Model<unknown, unknown, unknown, unknown>, effectActionTypes: string[]) {
    super(
      `Blocking effect action types should match a pre-existing effect action type in ` +
      `[${model.namespace}] model. The provided effect action types were: ${effectActionTypes.join(', ')}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'BlockingEffectWithoutMatchingEffectError';
  }
}

/**
 * Thrown when one of your models was not initialized on a [[combineModelReducers]] call, even though a react
 * component was dispatching actions that were meant to trigger its [[ModelOptions.reducers|reducers]] or a
 * mapStateToProps was using one of its [[ModelOptions.selectors|selectors]] for instance.
 * See [[Model.disableInitializationChecks]] if you need to disable this check,
 * but keep in mind that is only recommended in tests.
 *
 * @category Error
 */
export class ModelNotReduxInitializedError extends Error {
  constructor(model: Model<unknown, unknown, unknown, unknown>) {
    super(
      `Models need to be initialized with combineModelReducers prior to any usage. Now ` +
      `make this the case for: ${model.namespace}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'ModelNotReduxInitializedError';
  }
}

/**
 * Thrown when one of your models was not initialized on a [[modelRootSaga]] call, even though a react component
 * was dispatching actions that were meant to trigger its [[ModelOptions.effects|effects]] for instance.
 * See [[Model.disableInitializationChecks]] if you need to disable this check,
 * but keep in mind that is only recommended in tests.
 *
 * @category Error
 */
export class ModelNotSagaInitializedError extends Error {
  constructor(model: Model<unknown, unknown, unknown, unknown>) {
    super(
      `Models need to be initialized with modelRootSaga prior to any usage. Now ` +
      `make this the case for: ${model.namespace}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'ModelNotSagaInitializedError';
  }
}

/**
 * Thrown when multiple models have the same [[ModelOptions.namespace|namespace]]. So just name them differently.
 *
 * @category Error
 */
export class DuplicatedModelNamespaceError extends Error {
  constructor(namespaces: string[]) {
    super(
      `Namespace in models must be unique. The following namespaces, in order, were referenced in ` +
      `combineModelReducers: ${namespaces.join(', ')}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'DuplicatedModelNamespaceError';
  }
}

/**
 * Thrown when provided action data isn't an object. When dispatching an action, the sole argument must be an
 * object.
 *
 * @category Error
 */
export class ActionDataIsntPlainObjectError extends Error {
  constructor(actionType: string) {
    super(
      `Action data must be a plain object, when calling action [${actionType}]. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'ActionDataIsntPlainObjectError';
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
  constructor(action: AnyAction) {
    super(
      `The provided action lacks the internals for being redux-data-model-able. Be sure to ` +
      `use bindModelActionCreators instead of redux's bindActionCreators. The action in question ` +
      `is: ${JSON.stringify(action)}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'NonCompatibleActionError';
  }
}

/**
 * Thrown when no [[ModelOptions.reducers|reducer]]/[[ModelOptions.effects|effect]] exist for the accessed
 * property. That's usually the case for typos.
 * See [[Model.disableProxyChecks]] if you need to disable this check,
 * but keep in mind that is only recommended in tests.
 *
 * @category Error
 */
export class UndefinedReducerOrEffectError extends Error {
  constructor(name: string, model: Model<unknown, unknown, unknown, unknown>) {
    super(
      `No reducer/effect called [${name}] was found on [${model.namespace}] model. ` +
      `Available options are: ${Object.keys(model.actionTypes())}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'UndefinedReducerOrEffectError';
  }
}

/**
 * Thrown when no [[ModelOptions.selectors|selector]] exists for the accessed property.
 * That's usually the case for typos. See [[Model.disableProxyChecks]] if you need to disable this check,
 * but keep in mind that is only recommended in tests.
 *
 * @category Error
 */
export class UndefinedSelectorError extends Error {
  constructor(name: string, model: Model<unknown, unknown, unknown, unknown>) {
    super(
      `No selector called [${name}] was found on [${model.namespace}] model. ` +
      `Available options are: ${Object.keys(model.selectors)}. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'UndefinedSelectorError';
  }
}

/**
 * Thrown when no saga effect, among the intended ones, exists for the accessed property.
 * Keep in mind that some saga effects such as take, takeMaybe, takeLeading, takeLatest, takeEvery,
 * debounce, and throttle are only available for [[ModelOptions.blockingEffects|blocking effects]].
 * See [[Model.disableProxyChecks]] if you need to disable this check, but keep in mind that is
 * only recommended in tests.
 *
 * @category Error
 */
export class UndefinedSagaEffectError extends Error {
  constructor(name: string, model: Model<unknown, unknown, unknown, unknown>) {
    super(
      `No saga effect called [${name}] was found on [${model.namespace}] model. ` +
      `Available options are: ${Object.keys(sagaEffects)}. ` +
      `For being able to use other saga effects check blocking effects. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'UndefinedSagaEffectError';
  }
}

/**
 * Thrown when no saga effect, among the intended ones, exists for the accessed property.
 * Keep in mind that some saga effects such as put, putResolve, and select, are only available for
 * [[ModelOptions.effects|normal effects]]. See [[Model.disableProxyChecks]] if you need to
 * disable this check, but keep in mind that is only recommended in tests.
 *
 * @category Error
 */
export class UndefinedBlockingSagaEffectError extends Error {
  constructor(name: string, model: Model<unknown, unknown, unknown, unknown>) {
    super(
      `No saga effect called [${name}] was found on [${model.namespace}] model. ` +
      `Available options are: ${Object.keys(blockingSagaEffects)}. ` +
      `For being able to use other saga effects check normal effects. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'UndefinedBlockingSagaEffectError';
  }
}

/**
 * Thrown when the props passed from the parent component, mapStateToProps props, or mapDispatchToProps props
 * are conflicting (i.e. have the same name). To fix preferably change your mapStateToProps and mapDispatchToProps
 * implementation to remove the conflicts. Providing your own mergeProps is also an alternative, but keep in mind
 * this conflict check will be ignored when doing so.
 *
 * @category Error
 */
export class KeyConflictInMergePropsError extends Error {
  constructor(statePropConflicts: string[], dispatchPropConflicts: string[], ownPropsConflicts: string[]) {
    super(
      `A connectModel HOC has conflicts when merging the result of props from the parent component, ` +
      `mapStateToProps props, or mapDispatchToProps props. ` +
      `Conflicts are: \n\n` +
      `mapStateToProps conflicts: ${(isEmpty(statePropConflicts) ? '' : statePropConflicts.join(', '))}\n` +
      `mapDispatchToProps conflicts: ${(isEmpty(dispatchPropConflicts) ? '' : dispatchPropConflicts.join(', '))}\n` +
      `ownProps conflicts: ${(isEmpty(ownPropsConflicts) ? '' : ownPropsConflicts.join(', '))}` +
      `\n\nTo fix preferably change your mapStateToProps and mapDispatchToProps implementation ` +
      `to remove the conflicts. Providing your own mergeProps is also an alternative. ` +
      `See ${errorClassesIndexUrl} for more info.`
    );
    this.name = 'KeyConflictInMergePropsError';
  }
}
