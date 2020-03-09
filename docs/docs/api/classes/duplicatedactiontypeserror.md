---
title: API - Errors - DuplicateActionTypesError
sidebar_label: DuplicateActionTypesError
id: api-classes-duplicatedactiontypeserror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [DuplicatedActionTypesError](duplicatedactiontypeserror.md)

# Class: DuplicatedActionTypesError

Thrown when [reducer](../interfaces/modeloptions.md#optional-reducers) and/or [effect](../interfaces/modeloptions.md#optional-effects) action types
 are duplicated, for one of your models. So don't try to have a [reducer](../interfaces/modeloptions.md#optional-reducers)
 named the same way that an [effect](../interfaces/modeloptions.md#optional-effects).

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **DuplicatedActionTypesError**

## Index

### Constructors

* [constructor](duplicatedactiontypeserror.md#constructor)

### Properties

* [message](duplicatedactiontypeserror.md#message)
* [name](duplicatedactiontypeserror.md#name)
* [stack](duplicatedactiontypeserror.md#optional-stack)
* [Error](duplicatedactiontypeserror.md#static-error)

## Constructors

###  constructor

\+ **new DuplicatedActionTypesError**(`model`: any, `reducerAndEffectActionTypes`: any): *[DuplicatedActionTypesError](duplicatedactiontypeserror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:62](https://github.com/kayak/redux-data-model/blob/8317b28/packages/redux-data-model/src/errors.ts#L62)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |
`reducerAndEffectActionTypes` | any |

**Returns:** *[DuplicatedActionTypesError](duplicatedactiontypeserror.md)*

## Properties

###  message

• **message**: *string*

*Inherited from [NamespaceIsntAStringError](namespaceisntastringerror.md).[message](namespaceisntastringerror.md#message)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:974

___

###  name

• **name**: *string*

*Inherited from [NamespaceIsntAStringError](namespaceisntastringerror.md).[name](namespaceisntastringerror.md#name)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:973

___

### `Optional` stack

• **stack**? : *string*

*Inherited from [NamespaceIsntAStringError](namespaceisntastringerror.md).[stack](namespaceisntastringerror.md#optional-stack)*

*Overrides [NamespaceIsntAStringError](namespaceisntastringerror.md).[stack](namespaceisntastringerror.md#optional-stack)*

Defined in node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typescript/lib/lib.es5.d.ts:984
