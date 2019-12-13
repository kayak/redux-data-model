---
title: API - Classes - Subscriber
sidebar_label: Subscriber
id: api-classes-subscriber
---

# React-Resux API Reference Guide

This reference guide lists all methods exposed by react-resux. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[react-resux](../README.md) › [Subscriber](subscriber.md)

# Class: Subscriber

Subscribers provide a way to link models' effects/reducers, so that they get triggered by the same non-namespaced
action type, on a leading, latest, or every action basis. That is, they provide the means for generating redux
sagas employing takeLeading, takeLatest, or takeEvery effects.

## Hierarchy

* **Subscriber**

## Index

### Constructors

* [constructor](subscriber.md#constructor)

### Properties

* [effectNames](subscriber.md#effectnames)
* [models](subscriber.md#models)

### Accessors

* [reduxSagas](subscriber.md#reduxsagas)

### Methods

* [actionCreators](subscriber.md#actioncreators)
* [takeEvery](subscriber.md#takeevery)
* [takeLatest](subscriber.md#takelatest)
* [takeLeading](subscriber.md#takeleading)

## Constructors

###  constructor

\+ **new Subscriber**(`models`: [Model](model.md)[]): *[Subscriber](subscriber.md)*

*Defined in [packages/react-resux/src/subscriber.ts:16](https://github.com/kayak/react-resux/blob/6030822/packages/react-resux/src/subscriber.ts#L16)*

Creates a subscriber instance.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`models` | [Model](model.md)[] | An array of model instances.  |

**Returns:** *[Subscriber](subscriber.md)*

## Properties

###  effectNames

• **effectNames**: *string[]*

*Defined in [packages/react-resux/src/subscriber.ts:15](https://github.com/kayak/react-resux/blob/6030822/packages/react-resux/src/subscriber.ts#L15)*

___

###  models

• **models**: *[Model](model.md)[]*

*Defined in [packages/react-resux/src/subscriber.ts:14](https://github.com/kayak/react-resux/blob/6030822/packages/react-resux/src/subscriber.ts#L14)*

## Accessors

###  reduxSagas

• **get reduxSagas**(): *Saga[]*

*Defined in [packages/react-resux/src/subscriber.ts:130](https://github.com/kayak/react-resux/blob/6030822/packages/react-resux/src/subscriber.ts#L130)*

Returns an array of sagas, one for each of the declared effects.

**Returns:** *Saga[]*

An array of sagas.

## Methods

###  actionCreators

▸ **actionCreators**(): *ActionCreatorsMapObject*

*Defined in [packages/react-resux/src/subscriber.ts:40](https://github.com/kayak/react-resux/blob/6030822/packages/react-resux/src/subscriber.ts#L40)*

Returns an object with action creators, one for each of the declared effects. Only useful for testing purposes,
read the docs section on testing for more info. Also supports the inner workings of this class.

**Returns:** *ActionCreatorsMapObject*

an action creator's map object.

___

###  takeEvery

▸ **takeEvery**(`actionType`: string, `actionGenerators`: any): *[Subscriber](subscriber.md)*

*Defined in [packages/react-resux/src/subscriber.ts:121](https://github.com/kayak/react-resux/blob/6030822/packages/react-resux/src/subscriber.ts#L121)*

Adds a subscription, which will watch for the provided actionType. It will default to taking every action and
calling the respective action generator, which is equivalent to the behaviour of effects declared in models.
It uses a [takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect under the hood.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`actionType` | string | A string. |
`actionGenerators` | any | An array of action generators, shaped as function(action, modelActionCreators). |

**Returns:** *[Subscriber](subscriber.md)*

this.

___

###  takeLatest

▸ **takeLatest**(`actionType`: string, `actionGenerators`: any): *[Subscriber](subscriber.md)*

*Defined in [packages/react-resux/src/subscriber.ts:94](https://github.com/kayak/react-resux/blob/6030822/packages/react-resux/src/subscriber.ts#L94)*

Adds a subscription, which will watch for the provided actionType. It will default to taking only the latest
action at any given moment and calling the respective action generator. This is useful for implementing
debounce/throttle like behaviours. It uses a
[takeLatest](https://redux-saga.js.org/docs/api/#takelatestpattern-saga-args) effect under the hood.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`actionType` | string | A string. |
`actionGenerators` | any | An array of action generators, shaped as function(action, modelActionCreators). |

**Returns:** *[Subscriber](subscriber.md)*

this.

___

###  takeLeading

▸ **takeLeading**(`actionType`: string, `actionGenerators`: any): *[Subscriber](subscriber.md)*

*Defined in [packages/react-resux/src/subscriber.ts:108](https://github.com/kayak/react-resux/blob/6030822/packages/react-resux/src/subscriber.ts#L108)*

Adds a subscription, which will watch for the provided actionType. It will default to taking only the leading
action at any given moment and calling the respective action generator. This is useful for implementing
debounce/throttle like behaviours. It uses a
[takeLeading](https://redux-saga.js.org/docs/api/#takeleadingpattern-saga-args) effect under the hood.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`actionType` | string | A string. |
`actionGenerators` | any | An array of action generators, shaped as function(action, modelActionCreators). |

**Returns:** *[Subscriber](subscriber.md)*

this.
