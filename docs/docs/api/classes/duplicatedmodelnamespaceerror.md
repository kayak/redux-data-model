---
title: API - Errors - DuplicatedModelNamespaceError
sidebar_label: DuplicatedModelNamespaceError
id: api-classes-duplicatedmodelnamespaceerror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [DuplicatedModelNamespaceError](duplicatedmodelnamespaceerror.md)

# Class: DuplicatedModelNamespaceError

Thrown when multiple models have the same [namespace](../interfaces/modeloptions.md#namespace). So just name them differently.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **DuplicatedModelNamespaceError**

## Index

### Constructors

* [constructor](duplicatedmodelnamespaceerror.md#constructor)

### Properties

* [message](duplicatedmodelnamespaceerror.md#message)
* [name](duplicatedmodelnamespaceerror.md#name)
* [stack](duplicatedmodelnamespaceerror.md#optional-stack)
* [Error](duplicatedmodelnamespaceerror.md#static-error)

## Constructors

###  constructor

\+ **new DuplicatedModelNamespaceError**(`namespaces`: any): *[DuplicatedModelNamespaceError](duplicatedmodelnamespaceerror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:137](https://github.com/kayak/redux-data-model/blob/11ed706/packages/redux-data-model/src/errors.ts#L137)*

**Parameters:**

Name | Type |
------ | ------ |
`namespaces` | any |

**Returns:** *[DuplicatedModelNamespaceError](duplicatedmodelnamespaceerror.md)*

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
