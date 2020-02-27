# Redux-Data-Model

[![NPM](https://img.shields.io/npm/v/redux-data-model.svg)](https://www.npmjs.com/package/redux-data-model)
[![Build Status](https://travis-ci.org/kayak/redux-data-model.png?branch=master)](https://travis-ci.org/kayak/redux-data-model)
[![Coverage Status](https://coveralls.io/repos/github/kayak/redux-data-model/badge.svg)](https://coveralls.io/github/kayak/redux-data-model)
[![David](https://img.shields.io/david/kayak/redux-data-model.svg)](https://david-dm.org/kayak/redux-data-model)
[![David](https://img.shields.io/david/dev/kayak/redux-data-model.svg)](https://david-dm.org/kayak/redux-data-model)
[![Bundle Phobia](https://img.shields.io/bundlephobia/minzip/redux-data-model)](https://bundlephobia.com/result?p=redux-data-model)
[![License](https://img.shields.io/npm/l/redux-data-model)](https://www.npmjs.com/package/redux-data-model)

# Introduction

Opinionated, Redux abstraction with built-in immutability, async and more. Heavily dva inspired.

## Installing

Using npm:

```bash
$ npm install redux-data-model redux-data-model-hooks --save
```

Using yarn:

```bash
$ yarn add redux-data-model redux-data-model-hooks
```

Naturally, the redux-data-model-hooks package is optional, in case you're willing to use our hooks API.

## Benefits

* Easy to use and learn. Only a few public interfaces (i.e. combineModelReducers, modelRootSaga, Model, connectModel or equivalent hooks).
* Boilerplate reduction (i.e. actions, dispatchers, reducers).
* Immutability with normal JavaScript objects and arrays. No new APIs to learn!
* Async, typescript, memoised selectors, and hooks support.
* Tiny footprint (i.e. ~6KB).

## Demos

* [__counterWithConnectModel__](https://github.com/kayak/redux-data-model/tree/master/examples/counterWithConnectModel)
([Demo](https://codesandbox.io/s/github/kayak/redux-data-model/tree/master/examples/counterWithConnectModel)): 
Simple count example, without hooks api.
* [__counterWithConnectModelAndDebouncedButtons__](https://github.com/kayak/redux-data-model/tree/master/examples/counterWithConnectModelAndDebouncedButtons)
([Demo](https://codesandbox.io/s/github/kayak/redux-data-model/tree/master/examples/counterWithConnectModelAndDebouncedButtons)): 
Simple count example, without hooks api, that debounces increment/decrement buttons for 3 seconds.
* [__counterWithConnectModelAndConfirmationDialog__](https://github.com/kayak/redux-data-model/tree/master/examples/counterWithConnectModelAndConfirmationDialog)
([Demo](https://codesandbox.io/s/github/kayak/redux-data-model/tree/master/examples/counterWithConnectModelAndConfirmationDialog)): 
Simple count example, without hooks api, that is using a confirmation dialog, prior to incrementing/decrementing.
* [__counterWithConnectModelWithNestedNamespace__](https://github.com/kayak/redux-data-model/tree/master/examples/counterWithConnectModelWithNestedNamespace)
([Demo](https://codesandbox.io/s/github/kayak/redux-data-model/tree/master/examples/counterWithConnectModelWithNestedNamespace)): 
Simple count example, without hooks api. It uses a nested namespace, so that data can be grouped in different parts of the store.
* [__counterWithHooks__](https://github.com/kayak/redux-data-model/tree/master/examples/counterWithHooks)
([Demo](https://codesandbox.io/s/github/kayak/redux-data-model/tree/master/examples/counterWithHooks)):
Simple count example, with hooks api.
* [__rest__](https://github.com/kayak/redux-data-model/tree/master/examples/rest)
([Demo](https://codesandbox.io/s/github/kayak/redux-data-model/tree/master/examples/rest)):
Multi model rest example, with hooks api. 
Data is fetched from [jsonplaceholder.typicode.com](http://jsonplaceholder.typicode.com/)
* [__restWithNormalization__](https://github.com/kayak/redux-data-model/tree/master/examples/restWithNormalization)
([Demo](https://codesandbox.io/s/github/kayak/redux-data-model/tree/master/examples/restWithNormalization)):
Multi model rest example, with hooks api, that employs selector memoization and reuses action types across models,
as a way to normalize data. Data is fetched from [jsonplaceholder.typicode.com](http://jsonplaceholder.typicode.com/)

## Documentation

Documentation is available here: https://kayak.github.io/redux-data-model/

## License

Copyright 2020 KAYAK Germany, GmbH

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Crafted with ♥ in Berlin.
