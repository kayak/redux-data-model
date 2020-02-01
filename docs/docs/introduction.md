---
title: Introduction
id: introduction
---

Opinionated, Redux abstraction with built-in immutability, async and more. Heavily dva inspired.

## Benefits

* Easy to use and learn. Only a few public interfaces (i.e. combineModelReducers, modelRootSaga, Model, connectModel or equivalent hooks).
* Boilerplate reduction (i.e. actions, dispatchers, reducers).
* Immutability with normal JavaScript objects and arrays. No new APIs to learn!
* Async, typescript, memoised selectors, and hooks support.
* Tiny footprint (i.e. ~6KB).

## Installation

Using npm:

```bash
$ npm install redux-data-model redux-data-model-hooks --save
```

Using yarn:

```bash
$ yarn add redux-data-model redux-data-model-hooks
```

Naturally, the redux-data-model-hooks package is optional, in case you're willing to use our hooks API.

## Getting started

We do a deep dive on how redux-data-model works in our [getting started](tutorial.md) tutorial. If you
are curious about the concepts involved or just want to grasp how our API looks like, read the
[concepts](concepts.md) section. For a good overview on how to test your code, see the
[testing](testing.md) section.
