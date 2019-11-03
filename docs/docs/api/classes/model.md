---
title: API - Classes - Model
sidebar_label: Model
id: api-classes-model
---

# React-Resux API Reference Guide

This reference guide lists all methods exposed by react-resux. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[react-resux](../README.md) › [Model](model.md)

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

*Defined in [react-resux/src/model.ts:161](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/model.ts#L161)*

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

*Defined in [react-resux/src/model.ts:376](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/model.ts#L376)*

Returns the effects.

**Returns:** *EffectMap*

An effect map.

___

###  namespace

• **get namespace**(): *string*

*Defined in [react-resux/src/model.ts:340](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/model.ts#L340)*

Returns the namespace.

**Returns:** *string*

A string.

___

###  reducers

• **get reducers**(): *ReducerMap*

*Defined in [react-resux/src/model.ts:367](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/model.ts#L367)*

Returns the reducers.

**Returns:** *ReducerMap*

A reducer function.

___

###  reduxSagas

• **get reduxSagas**(): *Saga[]*

*Defined in [react-resux/src/model.ts:322](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/model.ts#L322)*

Returns an array of sagas, one for each of the declared effects. They will default to taking every action and
calling its respective effect. For taking only latest or leading actions, at any given moment, look for
subscribers instead.

**Returns:** *Saga[]*

An array of sagas.

___

###  selectors

• **get selectors**(): *SelectorMap*

*Defined in [react-resux/src/model.ts:358](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/model.ts#L358)*

Returns the selectors.

**Returns:** *SelectorMap*

A selectors map.

___

###  state

• **get state**(): *State*

*Defined in [react-resux/src/model.ts:349](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/model.ts#L349)*

Returns the initial state.

**Returns:** *State*

An initial state.

## Methods

###  actionCreators

▸ **actionCreators**(): *ActionCreatorsMapObject*

*Defined in [react-resux/src/model.ts:256](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/model.ts#L256)*

Returns an object with action creators, one for each of the declared reducers and effects. Only useful for
testing purposes, read the docs section on testing for more info. Also supports the inner workings of this
class.

**Returns:** *ActionCreatorsMapObject*

an action creator's map object.