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

*Defined in [packages/redux-data-model/src/model.ts:193](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L193)*

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

*Defined in [packages/redux-data-model/src/model.ts:185](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L185)*

Whether ModelNotReduxInitializedError and ModelNotSagaInitializedError should be thrown when the model
is used without it being integrated with Redux/Saga yet. Normally you only want to disable initialization
checks in your tests.

## Accessors

###  effects

• **get effects**(): *EffectMap*

*Defined in [packages/redux-data-model/src/model.ts:457](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L457)*

Returns the effects.

**Returns:** *EffectMap*

An effect map.

___

###  isReduxInitialized

• **get isReduxInitialized**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:403](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L403)*

Returns whether the model was initialized on a [combineModelReducers](../README.md#combinemodelreducers) call.

**Returns:** *boolean*

A boolean.

___

###  isSagaInitialized

• **get isSagaInitialized**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:412](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L412)*

Returns whether the model was initialized on a [modelRootSaga](../README.md#modelrootsaga) call.

**Returns:** *boolean*

A boolean.

___

###  namespace

• **get namespace**(): *string*

*Defined in [packages/redux-data-model/src/model.ts:421](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L421)*

Returns the namespace.

**Returns:** *string*

A string.

___

###  reducers

• **get reducers**(): *ReducerMap*

*Defined in [packages/redux-data-model/src/model.ts:448](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L448)*

Returns the reducers.

**Returns:** *ReducerMap*

A reducer function.

___

###  reduxSagas

• **get reduxSagas**(): *Saga[]*

*Defined in [packages/redux-data-model/src/model.ts:387](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L387)*

Returns an array of sagas, one for each of the declared effects. They will default to taking every action and
calling its respective effect.

**`throws`** {NonCompatibleActionError} When bindModelActionCreators was not used to bind the action creators.

**Returns:** *Saga[]*

An array of sagas.

___

###  selectors

• **get selectors**(): *SelectorMap*

*Defined in [packages/redux-data-model/src/model.ts:439](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L439)*

Returns the selectors.

**Returns:** *SelectorMap*

A selectors map.

___

###  state

• **get state**(): *State*

*Defined in [packages/redux-data-model/src/model.ts:430](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L430)*

Returns the initial state.

**Returns:** *State*

An initial state.

## Methods

###  actionCreators

▸ **actionCreators**(): *ActionCreatorsMapObject*

*Defined in [packages/redux-data-model/src/model.ts:284](https://github.com/kayak/redux-data-model/blob/2a860dd/packages/redux-data-model/src/model.ts#L284)*

Returns an object with action creators, one for each of the declared reducers and effects. Only useful for
testing purposes, read the docs section on testing for more info. Also supports the inner workings of this
class.

**Returns:** *ActionCreatorsMapObject*

an action creator's map object.
