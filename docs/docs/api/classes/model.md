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
dispatchers, and sagas, based on the model's options that were provided.

## Hierarchy

* **Model**

## Index

### Constructors

* [constructor](model.md#constructor)

### Properties

* [disableInitializationChecks](model.md#static-disableinitializationchecks)

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

## Constructors

###  constructor

\+ **new Model**(`options`: [ModelOptions](../interfaces/modeloptions.md)): *[Model](model.md)*

*Defined in [packages/redux-data-model/src/model.ts:247](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L247)*

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

**`throws`** {NamespaceIsntAStringError} When namespace isn't a string.

**`throws`** {EmptyNamespaceError} When namespace is an empty string.

**`throws`** {InvalidNamespaceError} When namespace has invalid characters.

**`throws`** {DuplicatedActionTypesError} When reducer and/or effect action types are duplicated.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [ModelOptions](../interfaces/modeloptions.md) | A model's options. |

**Returns:** *[Model](model.md)*

## Properties

### `Static` disableInitializationChecks

▪ **disableInitializationChecks**: *boolean* = false

*Defined in [packages/redux-data-model/src/model.ts:238](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L238)*

Whether ModelNotReduxInitializedError and ModelNotSagaInitializedError should be thrown when the model
is used without it being integrated with Redux/Saga yet. Normally you only want to disable initialization
checks in your tests.

## Accessors

###  blockingEffects

• **get blockingEffects**(): *BlockingEffectMap*

*Defined in [packages/redux-data-model/src/model.ts:561](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L561)*

Returns the [blocking effects](../interfaces/modeloptions.md#optional-blockingeffects) as provided in the [constructor](model.md#constructor).

**Returns:** *BlockingEffectMap*

A blocking effect map.

___

###  effects

• **get effects**(): *EffectMap*

*Defined in [packages/redux-data-model/src/model.ts:552](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L552)*

Returns the [effects](../interfaces/modeloptions.md#optional-effects) as provided in the [constructor](model.md#constructor).

**Returns:** *EffectMap*

An effect map.

___

###  isReduxInitialized

• **get isReduxInitialized**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:498](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L498)*

Returns whether the model was initialized on a [combineModelReducers](../README.md#combinemodelreducers) call.

**Returns:** *boolean*

A boolean.

___

###  isSagaInitialized

• **get isSagaInitialized**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:507](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L507)*

Returns whether the model was initialized on a [modelRootSaga](../README.md#modelrootsaga) call.

**Returns:** *boolean*

A boolean.

___

###  namespace

• **get namespace**(): *string*

*Defined in [packages/redux-data-model/src/model.ts:516](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L516)*

Returns the [namespace](../interfaces/modeloptions.md#namespace) as provided in the [constructor](model.md#constructor).

**Returns:** *string*

A string.

___

###  reducers

• **get reducers**(): *ReducerMap*

*Defined in [packages/redux-data-model/src/model.ts:543](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L543)*

Returns the [reducers](../interfaces/modeloptions.md#optional-reducers) as provided in the [constructor](model.md#constructor).

**Returns:** *ReducerMap*

A reducer function.

___

###  reduxSagas

• **get reduxSagas**(): *Saga[]*

*Defined in [packages/redux-data-model/src/model.ts:483](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L483)*

Returns an array of sagas, one for each of the declared
[normal effects](../interfaces/modeloptions.md#optional-effects)/[blocking effects](../interfaces/modeloptions.md#optional-blockingeffects).
[Normal effects](../interfaces/modeloptions.md#optional-effects) will default to taking every action and calling its respective effect,
unless overridden by a [blocking effect](../interfaces/modeloptions.md#optional-blockingeffects).

**`throws`** {NonCompatibleActionError} When [bindModelActionCreators](../README.md#bindmodelactioncreators) was not used to bind the action creators.

**Returns:** *Saga[]*

An array of sagas.

___

###  selectors

• **get selectors**(): *SelectorMap*

*Defined in [packages/redux-data-model/src/model.ts:534](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L534)*

Returns the [selectors](../interfaces/modeloptions.md#optional-selectors) as provided in the [constructor](model.md#constructor).

**Returns:** *SelectorMap*

A selectors map.

___

###  state

• **get state**(): *State*

*Defined in [packages/redux-data-model/src/model.ts:525](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L525)*

Returns the [initial state](../interfaces/modeloptions.md#state) as provided in the [constructor](model.md#constructor).

**Returns:** *State*

An initial state.

## Methods

###  actionCreators

▸ **actionCreators**(): *ActionCreatorsMapObject*

*Defined in [packages/redux-data-model/src/model.ts:342](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L342)*

Returns an object with action creators, one for each of the declared [reducers](../interfaces/modeloptions.md#optional-reducers),
[effects](../interfaces/modeloptions.md#optional-effects) and [blocking effects](../interfaces/modeloptions.md#optional-blockingeffects).
Only useful for testing purposes, read the docs section on testing for more info, or when you need to dispatch
actions from a different model's
[effects](../interfaces/modeloptions.md#optional-effects)/[blocking effects](../interfaces/modeloptions.md#optional-blockingeffects).

**Returns:** *ActionCreatorsMapObject*

An action creator's map object.
