---
title: API - Errors - ModelNotSagaInitializedError
sidebar_label: ModelNotSagaInitializedError
id: api-classes-modelnotsagainitializederror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [ModelNotSagaInitializedError](modelnotsagainitializederror.md)

# Class: ModelNotSagaInitializedError

Thrown when one of your models was not initialized on a [modelRootSaga](../README.md#modelrootsaga) call, even though a react component
was dispatching actions that were meant to trigger its [effects](../interfaces/modeloptions.md#optional-effects) for instance.
See [Model.disableInitializationChecks](model.md#static-disableinitializationchecks) if you need to disable this check,
but keep in mind that is only recommended in tests.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **ModelNotSagaInitializedError**

## Index

### Constructors

* [constructor](modelnotsagainitializederror.md#constructor)

### Properties

* [message](modelnotsagainitializederror.md#message)
* [name](modelnotsagainitializederror.md#name)
* [stack](modelnotsagainitializederror.md#optional-stack)
* [Error](modelnotsagainitializederror.md#static-error)

## Constructors

###  constructor

\+ **new ModelNotSagaInitializedError**(`model`: [Model](model.md)‹unknown, unknown, unknown, unknown›): *[ModelNotSagaInitializedError](modelnotsagainitializederror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:124](https://github.com/kayak/redux-data-model/blob/2f50839/packages/redux-data-model/src/errors.ts#L124)*

**Parameters:**

Name | Type |
------ | ------ |
`model` | [Model](model.md)‹unknown, unknown, unknown, unknown› |

**Returns:** *[ModelNotSagaInitializedError](modelnotsagainitializederror.md)*

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

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:975

___

### `Static` Error

▪ **Error**: *ErrorConstructor*

Defined in node_modules/typedoc/node_modules/typescript/lib/lib.es5.d.ts:984
