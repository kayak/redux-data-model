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

### Error Classes

* [ActionDataIsntPlainObjectError](classes/actiondataisntplainobjecterror.md)
* [BlockingEffectWithoutMatchingEffectError](classes/blockingeffectwithoutmatchingeffecterror.md)
* [DuplicatedActionTypesError](classes/duplicatedactiontypeserror.md)
* [DuplicatedModelNamespaceError](classes/duplicatedmodelnamespaceerror.md)
* [EmptyNamespaceError](classes/emptynamespaceerror.md)
* [InvalidNamespaceError](classes/invalidnamespaceerror.md)
* [KeyConflictInMergePropsError](classes/keyconflictinmergepropserror.md)
* [ModelNotReduxInitializedError](classes/modelnotreduxinitializederror.md)
* [ModelNotSagaInitializedError](classes/modelnotsagainitializederror.md)
* [NamespaceIsntAStringError](classes/namespaceisntastringerror.md)
* [NonCompatibleActionError](classes/noncompatibleactionerror.md)
* [UndefinedBlockingSagaEffectError](classes/undefinedblockingsagaeffecterror.md)
* [UndefinedReducerOrEffectError](classes/undefinedreduceroreffecterror.md)
* [UndefinedSagaEffectError](classes/undefinedsagaeffecterror.md)
* [UndefinedSelectorError](classes/undefinedselectorerror.md)

### Other Classes

* [Model](classes/model.md)

### Interfaces

* [ActionCreator](interfaces/actioncreator.md)
* [ActionInternals](interfaces/actioninternals.md)
* [ActionWithPayload](interfaces/actionwithpayload.md)
* [EffectMapObject](interfaces/effectmapobject.md)
* [ModelOptions](interfaces/modeloptions.md)

### Type aliases

* [ActionCreatorsMapObject](README.md#actioncreatorsmapobject)
* [ActionType](README.md#actiontype)
* [ActionTypesMapObject](README.md#actiontypesmapobject)
* [BlockingEffectFunction](README.md#blockingeffectfunction)
* [BlockingEffectMap](README.md#blockingeffectmap)
* [BlockingSagaEffects](README.md#blockingsagaeffects)
* [BoundNamespacedActionCreatorsMapObject](README.md#boundnamespacedactioncreatorsmapobject)
* [EffectFunction](README.md#effectfunction)
* [EffectMap](README.md#effectmap)
* [EffectModelFunction](README.md#effectmodelfunction)
* [EffectModelMap](README.md#effectmodelmap)
* [MapDispatchToPropsWithActionCreators](README.md#mapdispatchtopropswithactioncreators)
* [MapDispatchToPropsWithActionCreatorsFunction](README.md#mapdispatchtopropswithactioncreatorsfunction)
* [MapStateToPropsWithSelectors](README.md#mapstatetopropswithselectors)
* [NamespacedActionCreatorsMapObject](README.md#namespacedactioncreatorsmapobject)
* [NamespacedDispatchersMapObject](README.md#namespaceddispatchersmapobject)
* [NamespacedSelectorsMapObject](README.md#namespacedselectorsmapobject)
* [ReducerFunction](README.md#reducerfunction)
* [ReducerMap](README.md#reducermap)
* [SagaEffects](README.md#sagaeffects)
* [SelectorFunction](README.md#selectorfunction)
* [SelectorMap](README.md#selectormap)
* [SelectorModelFunction](README.md#selectormodelfunction)
* [SelectorModelMap](README.md#selectormodelmap)

### High Order Component (HOC) Functions

* [connectModel](README.md#connectmodel)

### React Hook Functions

* [useModelActions](README.md#usemodelactions)
* [useModelSelector](README.md#usemodelselector)

### Redux/Saga Setup Functions

* [bindModelActionCreators](README.md#bindmodelactioncreators)
* [combineModelReducers](README.md#combinemodelreducers)
* [modelRootSaga](README.md#modelrootsaga)

## Type aliases

###  ActionCreatorsMapObject

Ƭ **ActionCreatorsMapObject**: *object*

*Defined in [packages/redux-data-model/src/baseTypes.ts:20](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L20)*

#### Type declaration:

___

###  ActionType

Ƭ **ActionType**: *string*

*Defined in [packages/redux-data-model/src/baseTypes.ts:5](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L5)*

___

###  ActionTypesMapObject

Ƭ **ActionTypesMapObject**: *object*

*Defined in [packages/redux-data-model/src/baseTypes.ts:12](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L12)*

#### Type declaration:

___

###  BlockingEffectFunction

Ƭ **BlockingEffectFunction**: *function*

*Defined in [packages/redux-data-model/src/baseTypes.ts:38](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L38)*

#### Type declaration:

▸ (`actionType`: ActionType, `blockingSagaEffects`: Effects, `modelEffects`: ModelEffect): *any*

**Parameters:**

Name | Type |
------ | ------ |
`actionType` | ActionType |
`blockingSagaEffects` | Effects |
`modelEffects` | ModelEffect |

___

###  BlockingEffectMap

Ƭ **BlockingEffectMap**: *object*

*Defined in [packages/redux-data-model/src/baseTypes.ts:53](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L53)*

#### Type declaration:

___

###  BlockingSagaEffects

Ƭ **BlockingSagaEffects**: *typeof blockingSagaEffects*

*Defined in [packages/redux-data-model/src/model.ts:69](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L69)*

___

###  BoundNamespacedActionCreatorsMapObject

Ƭ **BoundNamespacedActionCreatorsMapObject**: *object*

*Defined in [packages/redux-data-model/src/baseTypes.ts:77](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L77)*

#### Type declaration:

___

###  EffectFunction

Ƭ **EffectFunction**: *function*

*Defined in [packages/redux-data-model/src/baseTypes.ts:33](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L33)*

#### Type declaration:

▸ (`actionData`: PayloadAction, `sagaEffects`: Effects, `actionCreators`: [ActionCreatorsMapObject](README.md#actioncreatorsmapobject)‹ReducerPayloads›): *any*

**Parameters:**

Name | Type |
------ | ------ |
`actionData` | PayloadAction |
`sagaEffects` | Effects |
`actionCreators` | [ActionCreatorsMapObject](README.md#actioncreatorsmapobject)‹ReducerPayloads› |

___

###  EffectMap

Ƭ **EffectMap**: *object*

*Defined in [packages/redux-data-model/src/baseTypes.ts:50](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L50)*

#### Type declaration:

___

###  EffectModelFunction

Ƭ **EffectModelFunction**: *function*

*Defined in [packages/redux-data-model/src/baseTypes.ts:62](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L62)*

#### Type declaration:

▸ (`actionData?`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`actionData?` | any |

___

###  EffectModelMap

Ƭ **EffectModelMap**: *Record‹string, Saga›*

*Defined in [packages/redux-data-model/src/baseTypes.ts:67](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L67)*

___

###  MapDispatchToPropsWithActionCreators

Ƭ **MapDispatchToPropsWithActionCreators**: *[MapDispatchToPropsWithActionCreatorsFunction](README.md#mapdispatchtopropswithactioncreatorsfunction)‹TDispatchProps, TOwnProps› | TDispatchProps*

*Defined in [packages/redux-data-model/src/baseTypes.ts:87](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L87)*

___

###  MapDispatchToPropsWithActionCreatorsFunction

Ƭ **MapDispatchToPropsWithActionCreatorsFunction**: *function*

*Defined in [packages/redux-data-model/src/baseTypes.ts:81](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L81)*

#### Type declaration:

▸ (`dispatch`: Dispatch‹AnyAction›, `ownProps`: TOwnProps, `dispatchers`: [NamespacedDispatchersMapObject](README.md#namespaceddispatchersmapobject)): *TDispatchProps*

**Parameters:**

Name | Type |
------ | ------ |
`dispatch` | Dispatch‹AnyAction› |
`ownProps` | TOwnProps |
`dispatchers` | [NamespacedDispatchersMapObject](README.md#namespaceddispatchersmapobject) |

___

###  MapStateToPropsWithSelectors

Ƭ **MapStateToPropsWithSelectors**: *function*

*Defined in [packages/redux-data-model/src/baseTypes.ts:90](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L90)*

#### Type declaration:

▸ (`state`: State, `ownProps`: TOwnProps, `modelSelectors`: [NamespacedSelectorsMapObject](README.md#namespacedselectorsmapobject)): *TStateProps*

**Parameters:**

Name | Type |
------ | ------ |
`state` | State |
`ownProps` | TOwnProps |
`modelSelectors` | [NamespacedSelectorsMapObject](README.md#namespacedselectorsmapobject) |

___

###  NamespacedActionCreatorsMapObject

Ƭ **NamespacedActionCreatorsMapObject**: *Record‹string, any›*

*Defined in [packages/redux-data-model/src/baseTypes.ts:70](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L70)*

___

###  NamespacedDispatchersMapObject

Ƭ **NamespacedDispatchersMapObject**: *Record‹string, any›*

*Defined in [packages/redux-data-model/src/baseTypes.ts:71](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L71)*

___

###  NamespacedSelectorsMapObject

Ƭ **NamespacedSelectorsMapObject**: *Record‹string, any›*

*Defined in [packages/redux-data-model/src/baseTypes.ts:73](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L73)*

___

###  ReducerFunction

Ƭ **ReducerFunction**: *function*

*Defined in [packages/redux-data-model/src/baseTypes.ts:30](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L30)*

#### Type declaration:

▸ (`state`: State, `payload`: PayloadAction, `action`: [ActionWithPayload](interfaces/actionwithpayload.md)‹PayloadAction›): *void*

**Parameters:**

Name | Type |
------ | ------ |
`state` | State |
`payload` | PayloadAction |
`action` | [ActionWithPayload](interfaces/actionwithpayload.md)‹PayloadAction› |

___

###  ReducerMap

Ƭ **ReducerMap**: *object*

*Defined in [packages/redux-data-model/src/baseTypes.ts:47](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L47)*

#### Type declaration:

___

###  SagaEffects

Ƭ **SagaEffects**: *typeof sagaEffects*

*Defined in [packages/redux-data-model/src/model.ts:68](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/model.ts#L68)*

___

###  SelectorFunction

Ƭ **SelectorFunction**: *function*

*Defined in [packages/redux-data-model/src/baseTypes.ts:29](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L29)*

#### Type declaration:

▸ (`state`: State, `props`: Props, `allState`: any): *any*

**Parameters:**

Name | Type |
------ | ------ |
`state` | State |
`props` | Props |
`allState` | any |

___

###  SelectorMap

Ƭ **SelectorMap**: *object*

*Defined in [packages/redux-data-model/src/baseTypes.ts:42](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L42)*

#### Type declaration:

___

###  SelectorModelFunction

Ƭ **SelectorModelFunction**: *function*

*Defined in [packages/redux-data-model/src/baseTypes.ts:59](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L59)*

#### Type declaration:

▸ (`state`: State, `props?`: SelectorPayload): *any*

**Parameters:**

Name | Type |
------ | ------ |
`state` | State |
`props?` | SelectorPayload |

___

###  SelectorModelMap

Ƭ **SelectorModelMap**: *object*

*Defined in [packages/redux-data-model/src/baseTypes.ts:64](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/baseTypes.ts#L64)*

#### Type declaration:

## High Order Component (HOC) Functions

###  connectModel

▸ **connectModel**‹**TStateProps**, **TDispatchProps**, **TOwnProps**›(`models`: [Model](classes/model.md)‹any›[], `userProvidedMapStateToProps`: [MapStateToPropsWithSelectors](README.md#mapstatetopropswithselectors)‹TStateProps, TOwnProps, any› | null, `userProvidedMapDispatchToProps`: [MapDispatchToPropsWithActionCreators](README.md#mapdispatchtopropswithactioncreators)‹TDispatchProps, TOwnProps› | null, `mergeProps`: Function | null, `options?`: Record‹string, any›): *function*

*Defined in [packages/redux-data-model/src/redux/connectModel.ts:33](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/redux/connectModel.ts#L33)*

Equivalent to redux's [connect](https://react-redux.js.org/api/connect) function.
This should be used when the hooks api is not desired or supported.
Otherwise check [useModelActions](README.md#usemodelactions) and [useModelSelector](README.md#usemodelselector) up.

**`example`** 
const ConnectedComponent = connectModel([modelA, modelB], mapStateToProps);
const ConnectedComponent = connectModel([modelA, modelB], mapStateToProps, mapDispatchToProps);
const ConnectedComponent = connectModel([modelA, modelB], null, mapDispatchToProps);
const ConnectedComponent = connectModel([modelA, modelB], mapStateToProps, mapDispatchToProps, mergeProps, options);

**`throws`** [ModelNotReduxInitializedError](classes/modelnotreduxinitializederror.md) When model was not initialized on a [combineModelReducers](README.md#combinemodelreducers) call.

**`throws`** [ModelNotSagaInitializedError](classes/modelnotsagainitializederror.md) When model was not initialized on a [modelRootSaga](README.md#modelrootsaga) call.

**`throws`** [KeyConflictInMergePropsError](classes/keyconflictinmergepropserror.md) When the props passed from the parent component, mapStateToProps props,
                                         or mapDispatchToProps props are conflicting (i.e. have the same name).
                                         This check is ignored when a custom mergeProps function is provided.

**Type parameters:**

▪ **TStateProps**

▪ **TDispatchProps**

▪ **TOwnProps**

**Parameters:**

Name | Type | Default | Description |
------ | ------ | ------ | ------ |
`models` | [Model](classes/model.md)‹any›[] | - | An array of Model instances. |
`userProvidedMapStateToProps` | [MapStateToPropsWithSelectors](README.md#mapstatetopropswithselectors)‹TStateProps, TOwnProps, any› &#124; null | null | A mapToProps equivalent, which has a third argument with all selectors. |
`userProvidedMapDispatchToProps` | [MapDispatchToPropsWithActionCreators](README.md#mapdispatchtopropswithactioncreators)‹TDispatchProps, TOwnProps› &#124; null | null | A mapDispatchToProps equivalent, which has a third argument with all                                       models' dispatchers (i.e. already dispatch bound). |
`mergeProps` | Function &#124; null | null | See react-redux documentation for [mergeProps](                   https://react-redux.js.org/api/connect#mergeprops-stateprops-dispatchprops-ownprops-object). |
`options?` | Record‹string, any› | - | See react-redux documentation for [options](https://react-redux.js.org/api/connect#options-object). |

**Returns:** *function*

A connect HOC.

▸ ‹**C**›(`component`: C): *ConnectedComponent‹C, Omit‹GetProps‹C›, keyof Shared<TInjectedProps, GetProps<C>>› & TNeedsProps›*

**Type parameters:**

▪ **C**: *ComponentType‹Matching‹TInjectedProps, GetProps‹C›››*

**Parameters:**

Name | Type |
------ | ------ |
`component` | C |

___

## React Hook Functions

###  useModelActions

▸ **useModelActions**‹**ReducerPayloads**, **EffectPayloads**›(`model`: Model‹object, object, ReducerPayloads, EffectPayloads›): *[BoundNamespacedActionCreatorsMapObject](README.md#boundnamespacedactioncreatorsmapobject)‹ReducerPayloads & EffectPayloads›*

*Defined in [packages/redux-data-model-hooks/src/useModelActions.ts:27](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model-hooks/src/useModelActions.ts#L27)*

A react hook for returning already bound action creators for the provided model. If you don't want/need to use
the hooks api, check [connectModel](README.md#connectmodel) up.

**`example`** 
const modelActions = useModelActions(model);

**`throws`** [ModelNotReduxInitializedError](classes/modelnotreduxinitializederror.md) When model was not initialized on a [combineModelReducers](README.md#combinemodelreducers) call.

**`throws`** [ModelNotSagaInitializedError](classes/modelnotsagainitializederror.md) When model was not initialized on a [modelRootSaga](README.md#modelrootsaga) call.

**Type parameters:**

▪ **ReducerPayloads**

▪ **EffectPayloads**

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`model` | Model‹object, object, ReducerPayloads, EffectPayloads› | A model instance. |

**Returns:** *[BoundNamespacedActionCreatorsMapObject](README.md#boundnamespacedactioncreatorsmapobject)‹ReducerPayloads & EffectPayloads›*

An object with already bound action creators. The bound action creators return a promise when invoked,
         which can be used to track if the action was properly processed (i.e. resolved) or caused an exception
         (i.e. rejected).

___

###  useModelSelector

▸ **useModelSelector**‹**ReturnValue**, **State**, **SelectorPayloads**›(`model`: Model‹object, SelectorPayloads, object, object›, `selectorFunc`: function): *ReturnValue*

*Defined in [packages/redux-data-model-hooks/src/useModelSelector.ts:19](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model-hooks/src/useModelSelector.ts#L19)*

A react hook for returning data from the provided model's state, by the means of one of its selectors. If you
don't want/need to use the hooks api, check [connectModel](README.md#connectmodel) up.

**`example`** 
const someDataFromState = useModelSelector(model, (state, selectors) => selectors.count(state));

**`throws`** [ModelNotReduxInitializedError](classes/modelnotreduxinitializederror.md) When model was not initialized on a [combineModelReducers](README.md#combinemodelreducers) call.

**Type parameters:**

▪ **ReturnValue**

▪ **State**

▪ **SelectorPayloads**

**Parameters:**

▪ **model**: *Model‹object, SelectorPayloads, object, object›*

A model instance.

▪ **selectorFunc**: *function*

A selector func, which will call one of the selectors in the provided model. The first
                    argument must be the entire redux state, followed by the selectors map of the model.

▸ (`state`: State, `selectors`: [SelectorModelMap](README.md#selectormodelmap)‹any, SelectorPayloads›): *ReturnValue*

**Parameters:**

Name | Type |
------ | ------ |
`state` | State |
`selectors` | [SelectorModelMap](README.md#selectormodelmap)‹any, SelectorPayloads› |

**Returns:** *ReturnValue*

Data from model's state.

___

## Redux/Saga Setup Functions

###  bindModelActionCreators

▸ **bindModelActionCreators**(`actionCreators`: [ActionCreatorsMapObject](README.md#actioncreatorsmapobject)‹any›, `dispatch`: Dispatch): *[BoundNamespacedActionCreatorsMapObject](README.md#boundnamespacedactioncreatorsmapobject)*

*Defined in [packages/redux-data-model/src/redux/bindModelActionCreators.ts:24](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/redux/bindModelActionCreators.ts#L24)*

Turns an object whose values are action creators or nested objects with them, into an object with the
same keys, but with every action creator wrapped into a dispatch call so they may be invoked directly.
A Promise will be returned on every invocation, which can be used to track if the action was properly
processed (i.e. resolved) or caused an exception (i.e. rejected).

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`actionCreators` | [ActionCreatorsMapObject](README.md#actioncreatorsmapobject)‹any› | a namespaced action creator's map object. This can have multiple levels of nesting,                       depending on the namespaces of the models involved. |
`dispatch` | Dispatch | A dispatch function available on the Store instance.. |

**Returns:** *[BoundNamespacedActionCreatorsMapObject](README.md#boundnamespacedactioncreatorsmapobject)*

An object mimicking the original object, but with each function immediately dispatching the
         action returned by the corresponding action creator. And returning a Promise, which will resolve/
         reject once done.

___

###  combineModelReducers

▸ **combineModelReducers**(`models`: [Model](classes/model.md)‹any›[]): *ReducersMapObject*

*Defined in [packages/redux-data-model/src/redux/combineModelReducers.ts:35](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/redux/combineModelReducers.ts#L35)*

Returns a reducer map object that can be deconstructed into the combineReducers helper, from redux, so that
redux is aware of any reducers produced by models.

**`example`** 
const store = createStore(combineReducers({
  ...combineModelReducers([modelA, modelB]),
}), applyMiddleware(sagaMiddleware));

**`throws`** [DuplicatedModelNamespaceError](classes/duplicatedmodelnamespaceerror.md) When multiple models have the same namespace.

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`models` | [Model](classes/model.md)‹any›[] | An array of Model instances. |

**Returns:** *ReducersMapObject*

A reducer's map object.

___

###  modelRootSaga

▸ **modelRootSaga**(`models`: [Model](classes/model.md)‹any›[]): *SagaIterator*

*Defined in [packages/redux-data-model/src/saga.ts:121](https://github.com/kayak/redux-data-model/blob/6bdca53/packages/redux-data-model/src/saga.ts#L121)*

Returns a root saga generator that can be passed to sagaMiddleware's run function, so that redux-saga is aware
of any sagas produced by models.

**`example`** 
sagaMiddleware.run(() => modelRootSaga([modelA, modelB]));

**Parameters:**

Name | Type | Description |
------ | ------ | ------ |
`models` | [Model](classes/model.md)‹any›[] | An array of Model instances. |

**Returns:** *SagaIterator*

A root saga.
