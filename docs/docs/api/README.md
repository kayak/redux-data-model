---
title: API - Index
sidebar_label: Index
id: api-index
---

# React-Resux API Reference Guide

This reference guide lists all methods exposed by react-resux. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[react-resux](README.md)

# react-resux


## Index

### Classes

* [Model](classes/model.md)
* [Subscriber](classes/subscriber.md)

### Interfaces

* [ModelOptions](interfaces/modeloptions.md)

### High Order Component (HOC) Functions

* [connectResux](README.md#connectresux)

### React Hook Functions

* [useModelActions](README.md#usemodelactions)
* [useModelSelector](README.md#usemodelselector)
* [useSubscriberActions](README.md#usesubscriberactions)

### Redux/Saga Setup Functions

* [combineModelReducers](README.md#combinemodelreducers)
* [resuxRootSaga](README.md#resuxrootsaga)

## High Order Component (HOC) Functions

###  connectResux

▸ **connectResux**(`modelsOrSubscribers`: [Model](classes/model.md) | [Subscriber](classes/subscriber.md)[], `userProvidedMapStateToProps`: MapStateToPropsWithSelectors‹any, any, any›, `userProvidedMapDispatchToProps`: MapDispatchToPropsWithActionCreators‹any, any›): *any*

*Defined in [react-resux/src/redux.ts:84](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/redux.ts#L84)*

Equivalent to redux's connect function. This should be used when the hooks api is not desired or
supported. Otherwise check [useModelActions](README.md#usemodelactions), [useModelSelector](README.md#usemodelselector), and [useSubscriberActions](README.md#usesubscriberactions) up.

**`example`** 
const ConnectedComponent = connectResux([modelA, modelB], mapStateToProps, mapDispatchToProps)

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`modelsOrSubscribers` | [Model](classes/model.md) &#124; [Subscriber](classes/subscriber.md)[] | - | An array of either Model or Subscriber instances. |
`userProvidedMapStateToProps` | MapStateToPropsWithSelectors‹any, any, any› | null | A mapToProps equivalent, which has a third argument with all selectors. |
`userProvidedMapDispatchToProps` | MapDispatchToPropsWithActionCreators‹any, any› | null | A mapDispatchToProps equivalent, which has a third argument with all                                       models' action creators and a fourth argument with all subscriber's                                       action creators. |

**Returns:** *any*

A connect HOC.

___

## React Hook Functions

###  useModelActions

▸ **useModelActions**(`model`: [Model](classes/model.md)): *ActionCreatorsMapObject*

*Defined in [react-resux-hooks/src/useModelActions.ts:17](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux-hooks/src/useModelActions.ts#L17)*

A react hook for returning already bound action creators for the provided model. If you don't want/need to use
the hooks api, check [connectResux](README.md#connectresux) up.

**`example`** 
const modelActions = useModelActions(model);

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [Model](classes/model.md) | A model instance. |

**Returns:** *ActionCreatorsMapObject*

An object with already bound action creators.

___

###  useModelSelector

▸ **useModelSelector**(`model`: [Model](classes/model.md), `selectorFunc`: any): *Record‹string, function›*

*Defined in [react-resux-hooks/src/useModelSelector.ts:16](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux-hooks/src/useModelSelector.ts#L16)*

A react hook for returning data from the provided model's state, by the means of one of its selectors. If you
don't want/need to use the hooks api, check [connectResux](README.md#connectresux) up.

**`example`** 
const someDataFromState = useModelSelector(model, (state, selectors) => selectors.count(state));

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | [Model](classes/model.md) | A model instance. |
`selectorFunc` | any | - |

**Returns:** *Record‹string, function›*

Data from model's state.

___

###  useSubscriberActions

▸ **useSubscriberActions**(`subscriber`: [Subscriber](classes/subscriber.md)): *ActionCreatorsMapObject*

*Defined in [react-resux-hooks/src/useSubscriberActions.ts:17](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux-hooks/src/useSubscriberActions.ts#L17)*

A react hook for returning already bound action creators for the provided subscriber. If you don't want/need
to use the hooks api, check [connectResux](README.md#connectresux) up.

**`example`** 
const subscriberActions = useSubscriberActions(subscriber);

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`subscriber` | [Subscriber](classes/subscriber.md) | A subscriber instance. |

**Returns:** *ActionCreatorsMapObject*

An object with already bound action creators.

___

## Redux/Saga Setup Functions

###  combineModelReducers

▸ **combineModelReducers**(`models`: [Model](classes/model.md)[]): *ReducersMapObject*

*Defined in [react-resux/src/redux.ts:110](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/redux.ts#L110)*

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

###  resuxRootSaga

▸ **resuxRootSaga**(`sagaContainers`: [Model](classes/model.md) | [Subscriber](classes/subscriber.md)[]): *SagaIterator*

*Defined in [react-resux/src/redux.ts:140](https://github.com/kayak/kaytum/blob/164e3a8/packages/react-resux/src/redux.ts#L140)*

Returns a root saga generator that can be passed to sagaMiddleware's run function, so that redux-saga is aware
of any sagas produced by either models or subscribers.

**`example`** 
sagaMiddleware.run(() => resuxRootSaga([modelA, subscriberA]));

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`sagaContainers` | [Model](classes/model.md) &#124; [Subscriber](classes/subscriber.md)[] | An array of either Model or Subscriber instances. |

**Returns:** *SagaIterator*

A root saga.