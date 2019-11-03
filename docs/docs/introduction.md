---
title: Introduction
id: introduction
---

Opinionated, Redux abstraction with built-in immutability, async and more. Heavily dva inspired.

## Benefits

* Easy to use and learn. Only a few public interfaces (i.e. combineModelReducers, subscribersRootSaga, Model, Subscriber, connectResux or equivalent hooks).
* Boilerplate reduction (i.e. actions, dispatchers, reducers).
* Immutability with normal JavaScript objects and arrays. No new APIs to learn!
* Async, typescript, memoised selectors, and hooks support.
* Tiny footprint (i.e. ~6KB).

## Installation

Using npm:

```bash
$ npm install react-resux react-resux-hooks --save
```

Using yarn:

```bash
$ yarn add react-resux react-resux-hooks
```

Naturally, the react-resux-hooks package is optional, in case you're willing to use our hooks API.

## Getting started

We do a deep dive on how react-resux works in our [getting started](tutorial.md) tutorial. If you
are curious about the concepts involved or just want to grasp how our API looks like, read the
[concepts](concepts.md) section. For a good overview on how to test your code, see the
[testing](testing.md) section.
