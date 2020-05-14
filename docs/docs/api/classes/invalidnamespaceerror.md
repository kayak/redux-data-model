---
title: API - Errors - InvalidNamespaceError
sidebar_label: InvalidNamespaceError
id: api-classes-invalidnamespaceerror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [InvalidNamespaceError](invalidnamespaceerror.md)

# Class: InvalidNamespaceError

Thrown when the provided [namespace](../interfaces/modeloptions.md#namespace), for one of your models, has invalid characters.
Keep in mind that a namespace can only contain letters, numbers and/or dots, when nesting the data is needed.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **InvalidNamespaceError**

## Index

### Constructors

* [constructor](invalidnamespaceerror.md#constructor)

### Properties

* [message](invalidnamespaceerror.md#message)
* [name](invalidnamespaceerror.md#name)
* [stack](invalidnamespaceerror.md#optional-stack)
* [Error](invalidnamespaceerror.md#static-error)

## Constructors

###  constructor

\+ **new InvalidNamespaceError**(`namespaceRegex`: any): *[InvalidNamespaceError](invalidnamespaceerror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:44](https://github.com/kayak/redux-data-model/blob/11ed706/packages/redux-data-model/src/errors.ts#L44)*

**Parameters:**

Name | Type |
------ | ------ |
`namespaceRegex` | any |

**Returns:** *[InvalidNamespaceError](invalidnamespaceerror.md)*

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
