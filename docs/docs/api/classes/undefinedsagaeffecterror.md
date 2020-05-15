---
title: API - Errors - UndefinedSagaEffectError
sidebar_label: UndefinedSagaEffectError
id: api-classes-undefinedsagaeffecterror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [UndefinedSagaEffectError](undefinedsagaeffecterror.md)

# Class: UndefinedSagaEffectError

Thrown when no saga effect, among the intended ones, exists for the accessed property.
Keep in mind that some saga effects such as take, takeMaybe, takeLeading, takeLatest, takeEvery,
debounce, and throttle are only available for [blocking effects](../interfaces/modeloptions.md#optional-blockingeffects).
See [Model.disableProxyChecks](model.md#static-disableproxychecks) if you need to disable this check, but keep in mind that is
only recommended in tests.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **UndefinedSagaEffectError**

## Index

### Constructors

* [constructor](undefinedsagaeffecterror.md#constructor)

### Properties

* [message](undefinedsagaeffecterror.md#message)
* [name](undefinedsagaeffecterror.md#name)
* [stack](undefinedsagaeffecterror.md#optional-stack)
* [Error](undefinedsagaeffecterror.md#static-error)

## Constructors

###  constructor

\+ **new UndefinedSagaEffectError**(`name`: any, `model`: any): *[UndefinedSagaEffectError](undefinedsagaeffecterror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:230](https://github.com/kayak/redux-data-model/blob/3a623f8/packages/redux-data-model/src/errors.ts#L230)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | any |
`model` | any |

**Returns:** *[UndefinedSagaEffectError](undefinedsagaeffecterror.md)*

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
