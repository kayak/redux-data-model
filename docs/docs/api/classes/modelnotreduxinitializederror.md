---
title: API - Errors - ModelNotReduxInitializedError
sidebar_label: ModelNotReduxInitializedError
id: api-classes-modelnotreduxinitializederror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [ModelNotReduxInitializedError](modelnotreduxinitializederror.md)

# Class: ModelNotReduxInitializedError

Thrown when one of your models was not initialized on a [combineModelReducers](../README.md#combinemodelreducers) call, even though a react
component was dispatching actions that were meant to trigger its [reducers](../interfaces/modeloptions.md#optional-reducers) or a
mapStateToProps was using one of its [selectors](../interfaces/modeloptions.md#optional-selectors) for instance.
See [Model.disableInitializationChecks](model.md#static-disableinitializationchecks) if you need to disable this check,
but keep in mind that is only recommended in tests.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **ModelNotReduxInitializedError**

## Index

### Constructors

* [constructor](modelnotreduxinitializederror.md#constructor)

### Properties

* [message](modelnotreduxinitializederror.md#message)
* [name](modelnotreduxinitializederror.md#name)
* [stack](modelnotreduxinitializederror.md#optional-stack)
* [Error](modelnotreduxinitializederror.md#static-error)

## Constructors

###  constructor

\+ **new ModelNotReduxInitializedError**(`model`: any): *[ModelNotReduxInitializedError](modelnotreduxinitializederror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:102](https://github.com/kayak/redux-data-model/blob/1e00ebf/packages/redux-data-model/src/errors.ts#L102)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | any |

**Returns:** *[ModelNotReduxInitializedError](modelnotreduxinitializederror.md)*

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
