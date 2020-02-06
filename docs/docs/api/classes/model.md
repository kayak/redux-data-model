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

### Accessors

* [effects](model.md#effects)
* [isLoaded](model.md#isloaded)
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

*Defined in [packages/redux-data-model/src/model.ts:184](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L184)*

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

**`throws`** {DuplicatedActionTypesError} When reducer and/or effect action types are duplicated.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`options` | [ModelOptions](../interfaces/modeloptions.md) | A model's options. |

**Returns:** *[Model](model.md)*

## Accessors

###  effects

• **get effects**(): *EffectMap*

*Defined in [packages/redux-data-model/src/model.ts:409](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L409)*

Returns the effects.

**Returns:** *EffectMap*

An effect map.

___

###  isLoaded

• **get isLoaded**(): *boolean*

*Defined in [packages/redux-data-model/src/model.ts:364](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L364)*

Returns whether the model was loaded on a combineModelReducers call.

**Returns:** *boolean*

A boolean.

___

###  namespace

• **get namespace**(): *string*

*Defined in [packages/redux-data-model/src/model.ts:373](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L373)*

Returns the namespace.

**Returns:** *string*

A string.

___

###  reducers

• **get reducers**(): *ReducerMap*

*Defined in [packages/redux-data-model/src/model.ts:400](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L400)*

Returns the reducers.

**Returns:** *ReducerMap*

A reducer function.

___

###  reduxSagas

• **get reduxSagas**(): *Saga[]*

*Defined in [packages/redux-data-model/src/model.ts:348](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L348)*

Returns an array of sagas, one for each of the declared effects. They will default to taking every action and
calling its respective effect.

**`throws`** {NonCompatibleActionError} When bindModelActionCreators was not used to bind the action creators.

**Returns:** *Saga[]*

An array of sagas.

___

###  selectors

• **get selectors**(): *SelectorMap*

*Defined in [packages/redux-data-model/src/model.ts:391](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L391)*

Returns the selectors.

**Returns:** *SelectorMap*

A selectors map.

___

###  state

• **get state**(): *State*

*Defined in [packages/redux-data-model/src/model.ts:382](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L382)*

Returns the initial state.

**Returns:** *State*

An initial state.

## Methods

###  actionCreators

▸ **actionCreators**(): *ActionCreatorsMapObject*

*Defined in [packages/redux-data-model/src/model.ts:273](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/model.ts#L273)*

Returns an object with action creators, one for each of the declared reducers and effects. Only useful for
testing purposes, read the docs section on testing for more info. Also supports the inner workings of this
class.

**Returns:** *ActionCreatorsMapObject*

an action creator's map object.
