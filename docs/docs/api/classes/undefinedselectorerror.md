---
title: API - Errors - UndefinedSelectorError
sidebar_label: UndefinedSelectorError
id: api-classes-undefinedselectorerror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [UndefinedSelectorError](undefinedselectorerror.md)

# Class: UndefinedSelectorError

Thrown when no [selector](../interfaces/modeloptions.md#optional-selectors) exists for the accessed property.
That's usually the case for typos. See [Model.disableProxyChecks](model.md#static-disableproxychecks) if you need to disable this check,
but keep in mind that is only recommended in tests.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **UndefinedSelectorError**

## Index

### Constructors

* [constructor](undefinedselectorerror.md#constructor)

### Properties

* [message](undefinedselectorerror.md#message)
* [name](undefinedselectorerror.md#name)
* [stack](undefinedselectorerror.md#optional-stack)
* [Error](undefinedselectorerror.md#static-error)

## Constructors

###  constructor

\+ **new UndefinedSelectorError**(`name`: any, `model`: any): *[UndefinedSelectorError](undefinedselectorerror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:209](https://github.com/kayak/redux-data-model/blob/8317b28/packages/redux-data-model/src/errors.ts#L209)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | any |
`model` | any |

**Returns:** *[UndefinedSelectorError](undefinedselectorerror.md)*

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
