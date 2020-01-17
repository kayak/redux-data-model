# React-Resux

[![NPM](https://img.shields.io/npm/v/react-resux.svg)](https://www.npmjs.com/package/react-resux)
[![Build Status](https://travis-ci.org/kayak/react-resux.png?branch=master)](https://travis-ci.org/kayak/react-resux)
[![Coverage Status](https://coveralls.io/repos/github/kayak/react-resux/badge.svg)](https://coveralls.io/github/kayak/react-resux)
[![David](https://img.shields.io/david/kayak/react-resux.svg)](https://david-dm.org/kayak/react-resux)
[![David](https://img.shields.io/david/dev/kayak/react-resux.svg)](https://david-dm.org/kayak/react-resux)
[![Bundle Phobia](https://img.shields.io/bundlephobia/minzip/react-resux)](https://bundlephobia.com/result?p=react-resux)
[![License](https://img.shields.io/npm/l/react-resux)](https://www.npmjs.com/package/react-resux)

# Introduction

Opinionated, Redux abstraction with built-in immutability, async and more. Heavily dva inspired.

## Installing

Using npm:

```bash
$ npm install react-resux react-resux-hooks --save
```

Using yarn:

```bash
$ yarn add react-resux react-resux-hooks
```

Naturally, the react-resux-hooks package is optional, in case you're willing to use our hooks API.

## Benefits

* Easy to use and learn. Only a few public interfaces (i.e. combineModelReducers, resuxRootSaga, Model, connectResux or equivalent hooks).
* Boilerplate reduction (i.e. actions, dispatchers, reducers).
* Immutability with normal JavaScript objects and arrays. No new APIs to learn!
* Async, typescript, memoised selectors, and hooks support.
* Tiny footprint (i.e. ~6KB).

## Demos

* [__counterWithConnectResux__](https://github.com/kayak/react-resux/tree/master/examples/counterWithConnectResux)
([Demo](https://codesandbox.io/s/github/kayak/react-resux/tree/master/examples/counterWithConnectResux)): 
Simple count example without hooks api.
* [__counterWithConnectResuxAndConfirmationDialog__](https://github.com/kayak/react-resux/tree/master/examples/counterWithConnectResuxAndConfirmationDialog)
([Demo](https://codesandbox.io/s/github/kayak/react-resux/tree/master/examples/counterWithConnectResuxAndConfirmationDialog)): 
Simple count example without hooks api and using a confirmation dialog, prior to incrementing/decrementing.
* [__counterWithConnectResuxWithNestedNamespace__](https://github.com/kayak/react-resux/tree/master/examples/counterWithConnectResuxWithNestedNamespace)
([Demo](https://codesandbox.io/s/github/kayak/react-resux/tree/master/examples/counterWithConnectResuxWithNestedNamespace)): 
Simple count example without hooks api. It uses a nested namespace, so that data can be grouped in different parts of the store.
* [__counterWithHooks__](https://github.com/kayak/react-resux/tree/master/examples/counterWithHooks)
([Demo](https://codesandbox.io/s/github/kayak/react-resux/tree/master/examples/counterWithHooks)):
Simple count example with hooks api.
* [__rest__](https://github.com/kayak/react-resux/tree/master/examples/rest)
([Demo](https://codesandbox.io/s/github/kayak/react-resux/tree/master/examples/rest)):
Multi model rest example, using hooks api. 
Data is fetched from [jsonplaceholder.typicode.com](http://jsonplaceholder.typicode.com/)

## Documentation

Documentation is available here: https://kayak.github.io/react-resux/

## License

Copyright 2019 KAYAK Germany, GmbH

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
