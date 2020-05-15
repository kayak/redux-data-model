---
title: API - Errors - NamespaceIsntAStringError
sidebar_label: NamespaceIsntAStringError
id: api-classes-namespaceisntastringerror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [NamespaceIsntAStringError](namespaceisntastringerror.md)

# Class: NamespaceIsntAStringError

Thrown when the provided [namespace](../interfaces/modeloptions.md#namespace), for one of your models, isn't a string.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **NamespaceIsntAStringError**

## Index

### Constructors

* [constructor](namespaceisntastringerror.md#constructor)

### Properties

* [message](namespaceisntastringerror.md#message)
* [name](namespaceisntastringerror.md#name)
* [stack](namespaceisntastringerror.md#optional-stack)
* [Error](namespaceisntastringerror.md#static-error)

## Constructors

###  constructor

\+ **new NamespaceIsntAStringError**(`model`: any): *[NamespaceIsntAStringError](namespaceisntastringerror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:14](https://github.com/kayak/redux-data-model/blob/3a623f8/packages/redux-data-model/src/errors.ts#L14)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |

**Returns:** *[NamespaceIsntAStringError](namespaceisntastringerror.md)*

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
