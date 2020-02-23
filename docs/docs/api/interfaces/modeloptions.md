---
title: API - Interfaces - ModelOptions
sidebar_label: ModelOptions
id: api-interfaces-model-options
---

# Redux-Data-Model API Reference Guide

This reference guide lists all methods exposed by redux-data-model. Contributions like linguistic improvements, adding
more details to the descriptions or additional examples are highly appreciated! Please note that the docs are
generated from source.

[redux-data-model](../README.md) › [ModelOptions](modeloptions.md)

# Interface: ModelOptions

Model options are used for initialising a [Model](../classes/model.md) instance.

## Hierarchy

* **ModelOptions**

## Index

### Properties

* [blockingEffects](modeloptions.md#optional-blockingeffects)
* [effects](modeloptions.md#optional-effects)
* [namespace](modeloptions.md#namespace)
* [reducers](modeloptions.md#optional-reducers)
* [selectors](modeloptions.md#optional-selectors)
* [state](modeloptions.md#state)

## Properties

### `Optional` blockingEffects

• **blockingEffects**? : *BlockingEffectMap*

*Defined in [packages/redux-data-model/src/model.ts:223](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L223)*

Blocking effects are functions used for defining when/how [normal effects](modeloptions.md#optional-effects) will be
executed. By default, effects are wrapped by a
[takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect, from
[redux-saga](https://redux-saga.js.org/), which means that every dispatched action will be taken into account.
That behavior can be overridden though as long as the same name is kept, as used in the effect. If you also
want to keep the default behaviour, then name the blocking effect differently.
Alternatives to the [takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect are
[takeLeading](https://redux-saga.js.org/docs/api/#takeleadingpattern-saga-args),
[takeLatest](https://redux-saga.js.org/docs/api/#takelatestpattern-saga-args),
[debounce](https://redux-saga.js.org/docs/api/#debouncepattern-saga-args),
and [throttle](https://redux-saga.js.org/docs/api/#throttlepattern-saga-args) effects. In can fact you can even
build your own using loops and the [take](https://redux-saga.js.org/docs/api/#takepattern-saga-args) effect.

**`example`** 
*fetchPostsByUser(actionType, blockingSagaEffects, modelEffects) {
  yield blockingSagaEffects.debounce(300, actionType, modelEffects.fetchPostsByUser);
},

___

### `Optional` effects

• **effects**? : *EffectMap*

*Defined in [packages/redux-data-model/src/model.ts:203](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L203)*

Effects are functions used for performing asynchronous state changes. An effect will be triggered whenever
an action is dispatched, which contains an actionType equal to modelNamespace.effectName. They are wrapped
by a [takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect, from
[redux-saga](https://redux-saga.js.org/). An effect function receives an action, an object with saga's
effects, and the action creators as arguments respectively. For a list of saga's effects available to you see
[this](https://redux-saga.js.org/docs/api/#effect-creators).
The saga effects won't include take, takeMaybe, takeLeading, takeLatest, takeEvery, debounce, and throttle
effects. If you intend to use those look for [blocking effects](modeloptions.md#optional-blockingeffects) instead.

**`example`** 
*fetchPostsByUser({ userId }, sagaEffects, actionCreators) {
  try {
    const data = yield sagaEffects.call(fetchApi, `http://jsonplaceholder.typicode.com/posts/?user=${userId}`);
    yield sagaEffects.put(actionCreators.saveUser({data, userId}));
  } catch (error) {
    console.log(error)
  }
},

___

###  namespace

• **namespace**: *string*

*Defined in [packages/redux-data-model/src/model.ts:122](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L122)*

The namespace of a model will prefix all its reducers and effects' action types. This value must be unique
and, as a matter of fact, redux-data-model will enforce it. The namespace is effectively an object's path
in which the state will be stored, which can introduce new nesting levels in the store. This might be
useful if you need to put redux-data-model's data somewhere else that not on the root level of the store.

**`example`** namespace: 'pageA'

**`example`** namespace: 'pageB'

**`example`** namespace: 'projectA.pageA'

**`example`** namespace: 'projectA.pageB'

___

### `Optional` reducers

• **reducers**? : *ReducerMap*

*Defined in [packages/redux-data-model/src/model.ts:182](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L182)*

Reducers are functions used for synchronously changing the current state of a given model. A reducer will
be triggered whenever an action is dispatched, which contains a type equal to modelNamespace.reducerName.
A reducer function receives the entire state and the action as arguments respectively. It shouldn't return
data, like vanilla reducers. Instead it should change the state argument in place. Redux-data-model uses
[immer](https://github.com/immerjs/immer) under the hood, which means that the state is made immutable
by tracking property access.

**`example`** 
increment(state, action) {
  state.count += 1;
}

**`example`** 
decrement: (state, action) => {
  state.count -= 1;
}

**`example`** 
saveUser(state, { data, userId }) {
  state.userIds.append(userId);
  state.loadingById[userId] = false;
  state.userById[userId] = data;
}

___

### `Optional` selectors

• **selectors**? : *SelectorMap*

*Defined in [packages/redux-data-model/src/model.ts:158](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L158)*

Selectors are functions that receive the entire state and returns a piece of it. The first argument
of a selector function is the namespaced state, following by any other positional arguments passed
in an eventual call within a mapStateToProps. Last but not least, the last argument is the entire
redux state, which might be necessary when normalizing data. By default selectors won't memoize the
returned data, which can be useful to avoid any re-renders caused by shallow comparing its variables.
Although that's possible, a different syntax is needed. For such, a selector should be specified as an
array of N input selector functions, being N a positive number higher than one, and a result function,
which can apply more expensive transformations to any of the selectors data it has access to. This will
work in a way that the result function will be memoized, as long as a shallow comparison of the return
values of the input selectors evaluates to true. Redux-data-model uses
[reselect](https://github.com/reduxjs/reselect) under the hood for that.

**`example`** count: (state) => state,

**`example`** userIds: (state, allState) => allState.modelNamespace.userIds,

**`example`** userById: (state, userId) => state.userById[userId],

**`example`** isLoading: (state, userId, allState) => allState.modelNamespace.loadingById[userId],

**`example`** users: [
   state => state.userIds,
   state => state.userById,
   (userIds, userById) => userIds.map(id => userById[id])
 ],

___

###  state

• **state**: *State*

*Defined in [packages/redux-data-model/src/model.ts:134](https://github.com/kayak/redux-data-model/blob/334d989/packages/redux-data-model/src/model.ts#L134)*

State represents the initial state of the model's reducer.

**`example`** state: 0

**`example`** state: []

**`example`** state: {
  userIds: [],
  loadingById: {},
  userById: {},
}
