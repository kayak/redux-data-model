---
title: API - Index
sidebar_label: Index
id: api-index
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](README.md)

# redux-data-model

## Index

### Classes

* [Model](classes/model.md)

### Interfaces

* [ModelOptions](interfaces/modeloptions.md)

### High Order Component (HOC) Functions

* [connectModel](README.md#connectmodel)

### React Hook Functions

* [useModelActions](README.md#usemodelactions)
* [useModelSelector](README.md#usemodelselector)

### Redux/Saga Setup Functions

* [bindModelActionCreators](README.md#bindmodelactioncreators)
* [combineModelReducers](README.md#combinemodelreducers)
* [modelRootSaga](README.md#modelrootsaga)

## High Order Component (HOC) Functions

###  connectModel

▸ **connectModel**(`models`: [Model](classes/model.md)[], `userProvidedMapStateToProps`: MapStateToPropsWithSelectors‹any, any, any›, `userProvidedMapDispatchToProps`: MapDispatchToPropsWithActionCreators‹any, any›): *any*

*Defined in [packages/redux-data-model/src/redux/connectModel.ts:21](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/redux/connectModel.ts#L21)*

Equivalent to redux's connect function. This should be used when the hooks api is not desired or
supported. Otherwise check [useModelActions](README.md#usemodelactions) and [useModelSelector](README.md#usemodelselector) up.

**`example`** 
const ConnectedComponent = connectModel([modelA, modelB], mapStateToProps, mapDispatchToProps)

**`throws`** {ModelNotCombinedError} When model was not loaded on a combineModelReducers call.

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`models` | [Model](classes/model.md)[] | - | An array of Model instances. |
`userProvidedMapStateToProps` | MapStateToPropsWithSelectors‹any, any, any› | null | A mapToProps equivalent, which has a third argument with all selectors. |
`userProvidedMapDispatchToProps` | MapDispatchToPropsWithActionCreators‹any, any› | null | A mapDispatchToProps equivalent, which has a third argument with all                                       models' action creators. |

**Returns:** *any*

A connect HOC.

___

## React Hook Functions

###  useModelActions

▸ **useModelActions**(`model`: [Model](classes/model.md)): *BoundActionCreatorsMapObject*

*Defined in [packages/redux-data-model-hooks/src/useModelActions.ts:21](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model-hooks/src/useModelActions.ts#L21)*

A react hook for returning already bound action creators for the provided model. If you don't want/need to use
the hooks api, check [connectModel](README.md#connectmodel) up.

**`example`** 
const modelActions = useModelActions(model);

**`throws`** {ModelNotCombinedError} When model was not loaded on a combineModelReducers call.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [Model](classes/model.md) | A model instance. |

**Returns:** *BoundActionCreatorsMapObject*

An object with already bound action creators. The bound action creators return a promise when invoked,
         which can be used to track if the action was properly processed (i.e. resolved) or caused an exception
         (i.e. rejected).

___

###  useModelSelector

▸ **useModelSelector**(`model`: [Model](classes/model.md), `selectorFunc`: SelectorFunction): *any*

*Defined in [packages/redux-data-model-hooks/src/useModelSelector.ts:21](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model-hooks/src/useModelSelector.ts#L21)*

A react hook for returning data from the provided model's state, by the means of one of its selectors. If you
don't want/need to use the hooks api, check [connectModel](README.md#connectmodel) up.

**`example`** 
const someDataFromState = useModelSelector(model, (state, selectors) => selectors.count(state));

**`throws`** {ModelNotCombinedError} When model was not loaded on a combineModelReducers call.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [Model](classes/model.md) | A model instance. |
`selectorFunc` | SelectorFunction | A selector func, which will call one of the selectors in the provided model. The first                     argument must be the entire redux state, followed by the selectors map of the model. |

**Returns:** *any*

Data from model's state.

___

## Redux/Saga Setup Functions

###  bindModelActionCreators

▸ **bindModelActionCreators**(`actionCreators`: ActionCreatorsMapObject, `dispatch`: Dispatch): *BoundNamespacedActionCreatorsMapObject*

*Defined in [packages/redux-data-model/src/redux/bindModelActionCreators.ts:24](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/redux/bindModelActionCreators.ts#L24)*

Turns an object whose values are action creators or nested objects with them, into an object with the
same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.
A Promise will be returned on every invocation, which can be used to track if the action was properly
processed (i.e. resolved) or caused an exception (i.e. rejected).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`actionCreators` | ActionCreatorsMapObject | a namespaced action creator's map object. This can have multiple levels of nesting,                       depending on the namespaces of the models involved. |
`dispatch` | Dispatch | A dispatch function available on the Store instance.. |

**Returns:** *BoundNamespacedActionCreatorsMapObject*

An object mimicking the original object, but with each function immediately dispatching the
         action returned by the corresponding action creator. And returning a Promise, which will resolve/
         reject once done.

___

###  combineModelReducers

▸ **combineModelReducers**(`models`: [Model](classes/model.md)[]): *ReducersMapObject*

*Defined in [packages/redux-data-model/src/redux/combineModelReducers.ts:34](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/redux/combineModelReducers.ts#L34)*

Returns a reducer map object that can be deconstructed into the combineReducers helper, from redux, so that
redux is aware of any reducers produced by models.

**`example`** 
const store = createStore(combineReducers({
  ...combineModelReducers([modelA, modelB]),
}), applyMiddleware(sagaMiddleware));

**`throws`** {DuplicatedModelNamespaceError} When multiple models have the same namespace.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`models` | [Model](classes/model.md)[] | An array of Model instances. |

**Returns:** *ReducersMapObject*

A reducer's map object.

___

###  modelRootSaga

▸ **modelRootSaga**(`sagaContainers`: [Model](classes/model.md)[]): *SagaIterator*

*Defined in [packages/redux-data-model/src/saga.ts:54](https://github.com/kayak/redux-data-model/blob/f81237f/packages/redux-data-model/src/saga.ts#L54)*

Returns a root saga generator that can be passed to sagaMiddleware's run function, so that redux-saga is aware
of any sagas produced by models.

**`example`** 
sagaMiddleware.run(() => modelRootSaga([modelA, modelB]));

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sagaContainers` | [Model](classes/model.md)[] | An array of Model instances. |

**Returns:** *SagaIterator*

A root saga.
