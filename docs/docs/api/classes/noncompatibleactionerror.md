---
title: API - Errors - NonCompatibleActionError
sidebar_label: NonCompatibleActionError
id: api-classes-noncompatibleactionerror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [NonCompatibleActionError](noncompatibleactionerror.md)

# Class: NonCompatibleActionError

Thrown when an action type matching a model one wasn't initialized properly. That could happen when
dispatching actions without using the provided abstractions, such as by working around and
calling dispatch yourself.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **NonCompatibleActionError**

## Index

### Constructors

* [constructor](noncompatibleactionerror.md#constructor)

### Properties

* [message](noncompatibleactionerror.md#message)
* [name](noncompatibleactionerror.md#name)
* [stack](noncompatibleactionerror.md#optional-stack)
* [Error](noncompatibleactionerror.md#static-error)

## Constructors

###  constructor

\+ **new NonCompatibleActionError**(`action`: any): *[NonCompatibleActionError](noncompatibleactionerror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:173](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/errors.ts#L173)*

**Parameters:**

Name | Type |
------ | ------ |
`action` | any |

**Returns:** *[NonCompatibleActionError](noncompatibleactionerror.md)*

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
