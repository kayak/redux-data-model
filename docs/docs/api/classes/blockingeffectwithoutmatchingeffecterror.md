---
title: API - Errors - BlockingEffectWithoutMatchingEffectError
sidebar_label: BlockingEffectWithoutMatchingEffectError
id: api-classes-blockingeffectwithoutmatchingeffecterror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [BlockingEffectWithoutMatchingEffectError](blockingeffectwithoutmatchingeffecterror.md)

# Class: BlockingEffectWithoutMatchingEffectError ‹**State**›

Thrown when [blocking effect](../interfaces/modeloptions.md#optional-blockingeffects) action types don't have a matching
 [effect](../interfaces/modeloptions.md#optional-effects) action type, for one of your models.
 A [blocking effect](../interfaces/modeloptions.md#optional-blockingeffects) is meant to alter the default behavior of a pre-existing
 [normal effect](../interfaces/modeloptions.md#optional-effects), therefore it needs to be named the same way as the
 [effect](../interfaces/modeloptions.md#optional-effects) in question.

## Type parameters

▪ **State**

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **BlockingEffectWithoutMatchingEffectError**

## Index

### Constructors

* [constructor](blockingeffectwithoutmatchingeffecterror.md#constructor)

### Properties

* [message](blockingeffectwithoutmatchingeffecterror.md#message)
* [name](blockingeffectwithoutmatchingeffecterror.md#name)
* [stack](blockingeffectwithoutmatchingeffecterror.md#optional-stack)
* [Error](blockingeffectwithoutmatchingeffecterror.md#static-error)

## Constructors

###  constructor

\+ **new BlockingEffectWithoutMatchingEffectError**(`model`: [Model](model.md)‹State›, `effectActionTypes`: string[]): *[BlockingEffectWithoutMatchingEffectError](blockingeffectwithoutmatchingeffecterror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:84](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/errors.ts#L84)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [Model](model.md)‹State› |
`effectActionTypes` | string[] |

**Returns:** *[BlockingEffectWithoutMatchingEffectError](blockingeffectwithoutmatchingeffecterror.md)*

## Properties

###  message

• **message**: *string*

*Inherited from [NamespaceIsntAStringError](namespaceisntastringerror.md).[message](namespaceisntastringerror.md#message)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [NamespaceIsntAStringError](namespaceisntastringerror.md).[name](namespaceisntastringerror.md#name)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *undefined | string*

*Inherited from [NamespaceIsntAStringError](namespaceisntastringerror.md).[stack](namespaceisntastringerror.md#optional-stack)*

*Overrides [NamespaceIsntAStringError](namespaceisntastringerror.md).[stack](namespaceisntastringerror.md#optional-stack)*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984
