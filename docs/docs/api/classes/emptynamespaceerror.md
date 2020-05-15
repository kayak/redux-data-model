---
title: API - Errors - EmptyNamespaceError
sidebar_label: EmptyNamespaceError
id: api-classes-emptynamespaceerror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [EmptyNamespaceError](emptynamespaceerror.md)

# Class: EmptyNamespaceError

Thrown when the provided [namespace](../interfaces/modeloptions.md#namespace), for one of your models, is an empty string.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **EmptyNamespaceError**

## Index

### Constructors

* [constructor](emptynamespaceerror.md#constructor)

### Properties

* [message](emptynamespaceerror.md#message)
* [name](emptynamespaceerror.md#name)
* [stack](emptynamespaceerror.md#optional-stack)
* [Error](emptynamespaceerror.md#static-error)

## Constructors

###  constructor

\+ **new EmptyNamespaceError**(): *[EmptyNamespaceError](emptynamespaceerror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:28](https://github.com/kayak/redux-data-model/blob/1e00ebf/packages/redux-data-model/src/errors.ts#L28)*

**Returns:** *[EmptyNamespaceError](emptynamespaceerror.md)*

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
