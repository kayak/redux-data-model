---
title: API - Errors - UndefinedBlockingSagaEffectError
sidebar_label: UndefinedBlockingSagaEffectError
id: api-classes-undefinedblockingsagaeffecterror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [UndefinedBlockingSagaEffectError](undefinedblockingsagaeffecterror.md)

# Class: UndefinedBlockingSagaEffectError ‹**State**›

Thrown when no saga effect, among the intended ones, exists for the accessed property.
Keep in mind that some saga effects such as put, putResolve, and select, are only available for
[normal effects](../interfaces/modeloptions.md#optional-effects). See [Model.disableProxyChecks](model.md#static-disableproxychecks) if you need to
disable this check, but keep in mind that is only recommended in tests.

## Type parameters

▪ **State**

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **UndefinedBlockingSagaEffectError**

## Index

### Constructors

* [constructor](undefinedblockingsagaeffecterror.md#constructor)

### Properties

* [message](undefinedblockingsagaeffecterror.md#message)
* [name](undefinedblockingsagaeffecterror.md#name)
* [stack](undefinedblockingsagaeffecterror.md#optional-stack)
* [Error](undefinedblockingsagaeffecterror.md#static-error)

## Constructors

###  constructor

\+ **new UndefinedBlockingSagaEffectError**(`name`: string, `model`: [Model](model.md)‹State›): *[UndefinedBlockingSagaEffectError](undefinedblockingsagaeffecterror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:251](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/errors.ts#L251)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | string |
`model` | [Model](model.md)‹State› |

**Returns:** *[UndefinedBlockingSagaEffectError](undefinedblockingsagaeffecterror.md)*

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
