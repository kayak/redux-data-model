---
title: API - Classes - Model
sidebar_label: Model
id: api-classes-model
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [Model](model.md)

# Class: Model

Models are the most basic data structure/abstraction in this library. They require a set of options to be
provided when initializing them. The model will be used to generate the action types, actions, reducers,
dispatchers, and sagas, based on the [model's options](../interfaces/modeloptions.md) that were provided.

## Hierarchy

* **Model**

## Index

### Constructors

* [constructor](model.md#constructor)

### Properties

* [disableInitializationChecks](model.md#static-disableinitializationchecks)
* [disableProxyChecks](model.md#static-disableproxychecks)

### Accessors

* [blockingEffects](model.md#blockingeffects)
* [effects](model.md#effects)
* [isReduxInitialized](model.md#isreduxinitialized)
* [isSagaInitialized](model.md#issagainitialized)
* [namespace](model.md#namespace)
* [reducers](model.md#reducers)
* [reduxSagas](model.md#reduxsagas)
* [selectors](model.md#selectors)
* [state](model.md#state)

### Methods

* [actionCreators](model.md#actioncreators)
* [actionTypes](model.md#actiontypes)

## Constructors

###  constructor

\+ **new Model**(`options`: [ModelOptions](../interfaces/modeloptions.md)): *[Model](model.md)*

*Defined in [packages/redux-data-model/src/model.ts:281](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L281)*

Creates a model instance.

**`example`** 
const counterModel = new Model({
  namespace: 'counter',
  state: {
     count: 0,
  },
  selectors: {
      count: (state) => state.count,
  },
  reducers: {
     increment(state, action) {
       state.count += 1;
     },
     decrement(state, action) {
       state.count -= 1;
     },
  },
 // effects: {...}
 // blockingEffects: {...}
});

**`throws`** [NamespaceIsntAStringError](namespaceisntastringerror.md) When namespace isn't a string.

**`throws`** [EmptyNamespaceError](emptynamespaceerror.md) When namespace is an empty string.

**`throws`** [InvalidNamespaceError](invalidnamespaceerror.md) When namespace has invalid characters.

**`throws`** [DuplicatedActionTypesError](duplicatedactiontypeserror.md) When reducer and/or effect action types are duplicated.

**`throws`** [BlockingEffectWithoutMatchingEffectError](blockingeffectwithoutmatchingeffecterror.md) When blocking effect action types don't have a matching
                                                     effect action type.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [ModelOptions](../interfaces/modeloptions.md) | A model's options. |

**Returns:** *[Model](model.md)*

## Properties

### `Static` disableInitializationChecks

▪ **disableInitializationChecks**: *boolean* = false

*Defined in [packages/redux-data-model/src/model.ts:267](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L267)*

Whether [ModelNotReduxInitializedError](modelnotreduxinitializederror.md) and [ModelNotSagaInitializedError](modelnotsagainitializederror.md) should be thrown when the model
is used without it being integrated with Redux/Saga yet. Normally you only want to disable initialization
checks in your tests.

___

### `Static` disableProxyChecks

▪ **disableProxyChecks**: *boolean* = false

*Defined in [packages/redux-data-model/src/model.ts:272](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L272)*

Whether [UndefinedReducerOrEffectError](undefinedreduceroreffecterror.md) and [UndefinedSelectorError](undefinedselectorerror.md) should be thrown when a accessing
properties that were not defined. Normally you only want to disable initialization checks in your tests.

## Accessors

###  blockingEffects

• **get blockingEffects**(): *BlockingEffectMap*

*Defined in [packages/redux-data-model/src/model.ts:601](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L601)*

Returns the [blocking effects](../interfaces/modeloptions.md#optional-blockingeffects) as provided in the [constructor](model.md#constructor).

**Returns:** *BlockingEffectMap*

A blocking effect map.

___

###  effects

• **get effects**(): *EffectMap*

*Defined in [packages/redux-data-model/src/model.ts:592](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L592)*

Returns the [effects](../interfaces/modeloptions.md#optional-effects) as provided in the [constructor](model.md#constructor).

**Returns:** *EffectMap*

An effect map.

___

###  isReduxInitialized

• **get isReduxInitialized**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:538](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L538)*

Returns whether the model was initialized on a [combineModelReducers](../README.md#combinemodelreducers) call.

**Returns:** *boolean*

A boolean.

___

###  isSagaInitialized

• **get isSagaInitialized**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:547](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L547)*

Returns whether the model was initialized on a [modelRootSaga](../README.md#modelrootsaga) call.

**Returns:** *boolean*

A boolean.

___

###  namespace

• **get namespace**(): *string*

*Defined in [packages/redux-data-model/src/model.ts:556](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L556)*

Returns the [namespace](../interfaces/modeloptions.md#namespace) as provided in the [constructor](model.md#constructor).

**Returns:** *string*

A string.

___

###  reducers

• **get reducers**(): *ReducerMap*

*Defined in [packages/redux-data-model/src/model.ts:583](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L583)*

Returns the [reducers](../interfaces/modeloptions.md#optional-reducers) as provided in the [constructor](model.md#constructor).

**Returns:** *ReducerMap*

A reducer function.

___

###  reduxSagas

• **get reduxSagas**(): *Saga[]*

*Defined in [packages/redux-data-model/src/model.ts:523](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L523)*

Returns an array of sagas, one for each of the declared
[normal effects](../interfaces/modeloptions.md#optional-effects)/[blocking effects](../interfaces/modeloptions.md#optional-blockingeffects).
[Normal effects](../interfaces/modeloptions.md#optional-effects) will default to taking every action and calling its respective effect,
unless overridden by a [blocking effect](../interfaces/modeloptions.md#optional-blockingeffects).

**`throws`** [NonCompatibleActionError](noncompatibleactionerror.md) When [bindModelActionCreators](../README.md#bindmodelactioncreators) was not used to bind the action creators.

**Returns:** *Saga[]*

An array of sagas.

___

###  selectors

• **get selectors**(): *SelectorMap*

*Defined in [packages/redux-data-model/src/model.ts:574](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L574)*

Returns the [selectors](../interfaces/modeloptions.md#optional-selectors) as provided in the [constructor](model.md#constructor).

**Returns:** *SelectorMap*

A selectors map.

___

###  state

• **get state**(): *State*

*Defined in [packages/redux-data-model/src/model.ts:565](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L565)*

Returns the [initial state](../interfaces/modeloptions.md#state) as provided in the [constructor](model.md#constructor).

**Returns:** *State*

An initial state.

## Methods

###  actionCreators

▸ **actionCreators**(): *ActionCreatorsMapObject*

*Defined in [packages/redux-data-model/src/model.ts:395](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L395)*

Returns an object with action creators, one for each of the declared [reducers](../interfaces/modeloptions.md#optional-reducers) and
[effects](../interfaces/modeloptions.md#optional-effects). Only useful for testing purposes, read the docs section on testing for
more info, or when you need to process actions from a different model's
[reducers](../interfaces/modeloptions.md#optional-reducers)/[effects](../interfaces/modeloptions.md#optional-effects). Being the latter a common
approach when dispatching another model's actions within your [effects](../interfaces/modeloptions.md#optional-effects).

**Returns:** *ActionCreatorsMapObject*

An action creator's map object.

___

###  actionTypes

▸ **actionTypes**(): *ActionTypesMapObject*

*Defined in [packages/redux-data-model/src/model.ts:372](https://github.com/kayak/redux-data-model/blob/ff5e09a/packages/redux-data-model/src/model.ts#L372)*

Returns an object with action types, one for each of the declared [reducers](../interfaces/modeloptions.md#optional-reducers) and
[effects](../interfaces/modeloptions.md#optional-effects). Only useful for testing purposes, read the docs section on testing for
more info, or when you need to process actions from a different model's
[reducers](../interfaces/modeloptions.md#optional-reducers)/[effects](../interfaces/modeloptions.md#optional-effects). Being the latter a common
approach when normalising data.

**Returns:** *ActionTypesMapObject*

An action type's map object.
