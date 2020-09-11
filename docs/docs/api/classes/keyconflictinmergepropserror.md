---
title: API - Errors - KeyConflictInMergePropsError
sidebar_label: KeyConflictInMergePropsError
id: api-classes-keyconflictinmergepropserror
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [KeyConflictInMergePropsError](keyconflictinmergepropserror.md)

# Class: KeyConflictInMergePropsError

Thrown when the props passed from the parent component, mapStateToProps props, or mapDispatchToProps props
are conflicting (i.e. have the same name). To fix preferably change your mapStateToProps and mapDispatchToProps
implementation to remove the conflicts. Providing your own mergeProps is also an alternative, but keep in mind
this conflict check will be ignored when doing so.

## Hierarchy

* [Error](namespaceisntastringerror.md#static-error)

  ↳ **KeyConflictInMergePropsError**

## Index

### Constructors

* [constructor](keyconflictinmergepropserror.md#constructor)

### Properties

* [message](keyconflictinmergepropserror.md#message)
* [name](keyconflictinmergepropserror.md#name)
* [stack](keyconflictinmergepropserror.md#optional-stack)
* [Error](keyconflictinmergepropserror.md#static-error)

## Constructors

###  constructor

\+ **new KeyConflictInMergePropsError**(`statePropConflicts`: string[], `dispatchPropConflicts`: string[], `ownPropsConflicts`: string[]): *[KeyConflictInMergePropsError](keyconflictinmergepropserror.md)*

*Defined in [packages/redux-data-model/src/errors.ts:272](https://github.com/kayak/redux-data-model/blob/2f50839/packages/redux-data-model/src/errors.ts#L272)*

**Parameters:**

Name | Type |
------ | ------ |
`statePropConflicts` | string[] |
`dispatchPropConflicts` | string[] |
`ownPropsConflicts` | string[] |

**Returns:** *[KeyConflictInMergePropsError](keyconflictinmergepropserror.md)*

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
