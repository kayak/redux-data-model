---
title: API - Errors - ActionDataIsntPlainObjectError
sidebar_label: ActionDataIsntPlainObjectError
id: api-classes-actiondataisntplainobjecterror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [ActionDataIsntPlainObjectError](actiondataisntplainobjecterror.md)

# Class: ActionDataIsntPlainObjectError

Thrown when provided action data isn't an object. When dispatching an action, the sole argument must be an
object.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **ActionDataIsntPlainObjectError**

## Index

### Constructors

* [constructor](actiondataisntplainobjecterror.md#constructor)

### Properties

* [message](actiondataisntplainobjecterror.md#message)
* [name](actiondataisntplainobjecterror.md#name)
* [stack](actiondataisntplainobjecterror.md#optional-stack)
* [Error](actiondataisntplainobjecterror.md#static-error)

## Constructors

###  constructor

\+ **new ActionDataIsntPlainObjectError**(`actionType`: any): *[ActionDataIsntPlainObjectError](actiondataisntplainobjecterror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:155](https://github.com/kayak/redux-data-model/blob/3a623f8/packages/redux-data-model/src/errors.ts#L155)*

**Parameters:**

Name | Type |
------ | ------ |
`actionType` | any |

**Returns:** *[ActionDataIsntPlainObjectError](actiondataisntplainobjecterror.md)*

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
