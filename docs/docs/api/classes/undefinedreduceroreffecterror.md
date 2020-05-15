---
title: API - Errors - UndefinedReducerOrEffectError
sidebar_label: UndefinedReducerOrEffectError
id: api-classes-undefinedreduceroreffecterror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [UndefinedReducerOrEffectError](undefinedreduceroreffecterror.md)

# Class: UndefinedReducerOrEffectError

Thrown when no [reducer](../interfaces/modeloptions.md#optional-reducers)/[effect](../interfaces/modeloptions.md#optional-effects) exist for the accessed
property. That's usually the case for typos.
See [Model.disableProxyChecks](model.md#static-disableproxychecks) if you need to disable this check,
but keep in mind that is only recommended in tests.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **UndefinedReducerOrEffectError**

## Index

### Constructors

* [constructor](undefinedreduceroreffecterror.md#constructor)

### Properties

* [message](undefinedreduceroreffecterror.md#message)
* [name](undefinedreduceroreffecterror.md#name)
* [stack](undefinedreduceroreffecterror.md#optional-stack)
* [Error](undefinedreduceroreffecterror.md#static-error)

## Constructors

###  constructor

\+ **new UndefinedReducerOrEffectError**(`name`: any, `model`: any): *[UndefinedReducerOrEffectError](undefinedreduceroreffecterror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:192](https://github.com/kayak/redux-data-model/blob/3a623f8/packages/redux-data-model/src/errors.ts#L192)*

**Parameters:**

Name | Type |
------ | ------ |
`name` | any |
`model` | any |

**Returns:** *[UndefinedReducerOrEffectError](undefinedreduceroreffecterror.md)*

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
