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

# Class: Model ‹**State, SelectorPayloads, ReducerPayloads, EffectPayloads**›

Models are the most basic data structure/abstraction in this library. They require a set of options to be
provided when initializing them. The model will be used to generate the action types, actions, reducers,
dispatchers, and sagas, based on the [model's options](../interfaces/modeloptions.md) that were provided.

## Type parameters

▪ **State**

▪ **SelectorPayloads**

▪ **ReducerPayloads**

▪ **EffectPayloads**

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

\+ **new Model**(`options`: [ModelOptions](../interfaces/modeloptions.md)‹State, SelectorPayloads, ReducerPayloads, EffectPayloads›): *[Model](model.md)*

*Defined in [packages/redux-data-model/src/model.ts:226](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L226)*

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
     increment(state) {
       state.count += 1;
     },
     decrement(state) {
       state.count -= 1;
     },
     setCount(state, { value }) {
       state.count = value;
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
`options` | [ModelOptions](../interfaces/modeloptions.md)‹State, SelectorPayloads, ReducerPayloads, EffectPayloads› | A model's options. |

**Returns:** *[Model](model.md)*

## Properties

### `Static` disableInitializationChecks

▪ **disableInitializationChecks**: *boolean* = false

*Defined in [packages/redux-data-model/src/model.ts:210](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L210)*

Whether [ModelNotReduxInitializedError](modelnotreduxinitializederror.md) and [ModelNotSagaInitializedError](modelnotsagainitializederror.md) should be thrown when the model
is used without it being integrated with Redux/Saga yet. Normally you only want to disable initialization
checks in your tests, given they help developers to find out common mistakes soon.

___

### `Static` disableProxyChecks

▪ **disableProxyChecks**: *boolean* = false

*Defined in [packages/redux-data-model/src/model.ts:217](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L217)*

Whether [UndefinedReducerOrEffectError](undefinedreduceroreffecterror.md), [UndefinedSelectorError](undefinedselectorerror.md), [UndefinedSagaEffectError](undefinedsagaeffecterror.md), and
[UndefinedBlockingSagaEffectError](undefinedblockingsagaeffecterror.md) should be thrown when a accessing properties that were not defined.
Normally you only want to disable proxy checks in your tests, given they help developers to find out
common mistakes soon.

## Accessors

###  blockingEffects

• **get blockingEffects**(): *[BlockingEffectMap](../README.md#blockingeffectmap)‹[BlockingSagaEffects](../README.md#blockingsagaeffects), EffectPayloads›*

*Defined in [packages/redux-data-model/src/model.ts:572](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L572)*

Returns the [blocking effects](../interfaces/modeloptions.md#optional-blockingeffects) as provided in the [constructor](model.md#constructor).

**Returns:** *[BlockingEffectMap](../README.md#blockingeffectmap)‹[BlockingSagaEffects](../README.md#blockingsagaeffects), EffectPayloads›*

A blocking effect map.

___

###  effects

• **get effects**(): *[EffectMap](../README.md#effectmap)‹[SagaEffects](../README.md#sagaeffects), ReducerPayloads, EffectPayloads›*

*Defined in [packages/redux-data-model/src/model.ts:563](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L563)*

Returns the [effects](../interfaces/modeloptions.md#optional-effects) as provided in the [constructor](model.md#constructor).

**Returns:** *[EffectMap](../README.md#effectmap)‹[SagaEffects](../README.md#sagaeffects), ReducerPayloads, EffectPayloads›*

An effect map.

___

###  isReduxInitialized

• **get isReduxInitialized**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:509](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L509)*

Returns whether the model was initialized on a [combineModelReducers](../README.md#combinemodelreducers) call.

**Returns:** *boolean*

A boolean.

___

###  isSagaInitialized

• **get isSagaInitialized**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:518](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L518)*

Returns whether the model was initialized on a [modelRootSaga](../README.md#modelrootsaga) call.

**Returns:** *boolean*

A boolean.

___

###  namespace

• **get namespace**(): *string*

*Defined in [packages/redux-data-model/src/model.ts:527](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L527)*

Returns the [namespace](../interfaces/modeloptions.md#namespace) as provided in the [constructor](model.md#constructor).

**Returns:** *string*

A string.

___

###  reducers

• **get reducers**(): *[ReducerMap](../README.md#reducermap)‹State, ReducerPayloads›*

*Defined in [packages/redux-data-model/src/model.ts:554](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L554)*

Returns the [reducers](../interfaces/modeloptions.md#optional-reducers) as provided in the [constructor](model.md#constructor).

**Returns:** *[ReducerMap](../README.md#reducermap)‹State, ReducerPayloads›*

A reducer function.

___

###  reduxSagas

• **get reduxSagas**(): *Saga[]*

*Defined in [packages/redux-data-model/src/model.ts:494](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L494)*

Returns an array of sagas, one for each of the declared
[normal effects](../interfaces/modeloptions.md#optional-effects)/[blocking effects](../interfaces/modeloptions.md#optional-blockingeffects).
[Normal effects](../interfaces/modeloptions.md#optional-effects) will default to taking every action and calling its respective effect,
unless overridden by a [blocking effect](../interfaces/modeloptions.md#optional-blockingeffects).

**`throws`** [NonCompatibleActionError](noncompatibleactionerror.md) When [bindModelActionCreators](../README.md#bindmodelactioncreators) was not used to bind the action creators.

**Returns:** *Saga[]*

An array of sagas.

___

###  selectors

• **get selectors**(): *[SelectorMap](../README.md#selectormap)‹Immutable‹State›, SelectorPayloads›*

*Defined in [packages/redux-data-model/src/model.ts:545](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L545)*

Returns the [selectors](../interfaces/modeloptions.md#optional-selectors) as provided in the [constructor](model.md#constructor).

**Returns:** *[SelectorMap](../README.md#selectormap)‹Immutable‹State›, SelectorPayloads›*

A selectors map.

___

###  state

• **get state**(): *Immutable‹State›*

*Defined in [packages/redux-data-model/src/model.ts:536](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L536)*

Returns the [initial state](../interfaces/modeloptions.md#state) as provided in the [constructor](model.md#constructor).

**Returns:** *Immutable‹State›*

An initial state.

## Methods

###  actionCreators

▸ **actionCreators**(): *[ActionCreatorsMapObject](../README.md#actioncreatorsmapobject)‹ReducerPayloads & EffectPayloads›*

*Defined in [packages/redux-data-model/src/model.ts:353](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L353)*

Returns an object with action creators, one for each of the declared [reducers](../interfaces/modeloptions.md#optional-reducers) and
[effects](../interfaces/modeloptions.md#optional-effects). Only useful for testing purposes, read the docs section on testing for
more info, or when you need to process actions from a different model's
[reducers](../interfaces/modeloptions.md#optional-reducers)/[effects](../interfaces/modeloptions.md#optional-effects). Being the latter a common
approach when dispatching another model's actions within your [effects](../interfaces/modeloptions.md#optional-effects).

**Returns:** *[ActionCreatorsMapObject](../README.md#actioncreatorsmapobject)‹ReducerPayloads & EffectPayloads›*

An action creator's map object.

___

###  actionTypes

▸ **actionTypes**(): *[ActionTypesMapObject](../README.md#actiontypesmapobject)‹ReducerPayloads & EffectPayloads›*

*Defined in [packages/redux-data-model/src/model.ts:330](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L330)*

Returns an object with action types, one for each of the declared [reducers](../interfaces/modeloptions.md#optional-reducers) and
[effects](../interfaces/modeloptions.md#optional-effects). Only useful for testing purposes, read the docs section on testing for
more info, or when you need to process actions from a different model's
[reducers](../interfaces/modeloptions.md#optional-reducers)/[effects](../interfaces/modeloptions.md#optional-effects). Being the latter a common
approach when normalising data.

**Returns:** *[ActionTypesMapObject](../README.md#actiontypesmapobject)‹ReducerPayloads & EffectPayloads›*

An action type's map object.
