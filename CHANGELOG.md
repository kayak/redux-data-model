# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [0.11.0](https://github.com/kayak/redux-data-model/compare/v0.10.1...v0.11.0) (2020-05-15)


### Features

* add check to avoid key conflicts when merging connectModel props ([49b9147](https://github.com/kayak/redux-data-model/commit/49b9147a1a6aa48691bdd208274ad01246b653a3))
* add mergeProps and options args to connectModel ([3a623f8](https://github.com/kayak/redux-data-model/commit/3a623f8063d84e049d8f0b1fa0ff35fda805111a))





## [0.10.1](https://github.com/kayak/redux-data-model/compare/v0.10.0...v0.10.1) (2020-05-14)


### Bug Fixes

* ensure exceptions are properly logged on root saga ([0c6e139](https://github.com/kayak/redux-data-model/commit/0c6e13991059799a6ac3496f9001d2795733379d))





# [0.10.0](https://github.com/kayak/redux-data-model/compare/v0.9.0...v0.10.0) (2020-03-30)


### Bug Fixes

* fix issue with return value from effect action creators ([3372091](https://github.com/kayak/redux-data-model/commit/3372091ba5846909f2bf6de0715ff83e1deef8ed))


### Features

* add proxy check to blocking and normal saga effects args ([a690e37](https://github.com/kayak/redux-data-model/commit/a690e3779efa905d17da7ceea382af55fef0bdf9))





# [0.9.0](https://github.com/kayak/redux-data-model/compare/v0.8.0...v0.9.0) (2020-03-01)


### Bug Fixes

* fix blocking effects, which should not use yield star ([06a42e3](https://github.com/kayak/redux-data-model/commit/06a42e3a12e45c61646d29205f374975288f8273))


### Features

* add checks for undefined selectors/reducers/effects ([0253755](https://github.com/kayak/redux-data-model/commit/02537559f17de59695de8514d90a054fc66b0773))
* add support to memoized selectors with array sintax ([2b1609d](https://github.com/kayak/redux-data-model/commit/2b1609d9b877c5161f70359344e60e7132ad89d3)), closes [#3](https://github.com/kayak/redux-data-model/issues/3)
* add support to reusing other model's actions for normalisation ([07a4f7b](https://github.com/kayak/redux-data-model/commit/07a4f7b9f8f348daad19d8d8607bafb6c5489ac1))
* introduce blocking effects to model class ([334d989](https://github.com/kayak/redux-data-model/commit/334d9892bf15ced817272abdd721eab865459bae))





# [0.8.0](https://github.com/kayak/redux-data-model/compare/v0.7.1...v0.8.0) (2020-02-13)


### Features

* allows the disabling of initialization checks in Model ([c661132](https://github.com/kayak/redux-data-model/commit/c661132af2b6a1c9c14626a86593b6d1ae52109d))





## [0.7.1](https://github.com/kayak/redux-data-model/compare/v0.7.0...v0.7.1) (2020-02-12)


### Bug Fixes

* fix combineModelReducers check, which was moved to the model level ([7e0e541](https://github.com/kayak/redux-data-model/commit/7e0e541eacd373ed6cfa1bf3b1b987cc994bd496))





# [0.7.0](https://github.com/kayak/redux-data-model/compare/v0.6.2...v0.7.0) (2020-02-06)


### Features

* check if an uncombined model is used when interfacing react ([1a40797](https://github.com/kayak/redux-data-model/commit/1a40797fa6fa3df9f88015c34a3ec34dba186777))





## [0.6.2](https://github.com/kayak/redux-data-model/compare/v0.6.1...v0.6.2) (2019-12-17)


### Bug Fixes

* change model reducers to receive the payload straight away ([6a249f6](https://github.com/kayak/redux-data-model/commit/6a249f609907224e2c2a58ae44d76841039387bd))





## [0.6.1](https://github.com/kayak/redux-data-model/compare/v0.6.0...v0.6.1) (2019-12-13)


### Bug Fixes

* add action internals to action creator of subscriber model ([45af66c](https://github.com/kayak/redux-data-model/commit/45af66cd69a0e07691ebd7092a0be88825b9933b))





# [0.6.0](https://github.com/kayak/redux-data-model/compare/v0.5.0...v0.6.0) (2019-12-13)


### Bug Fixes

* bump redux-data-model version in redux-data-model-hooks package ([d37f8e5](https://github.com/kayak/redux-data-model/commit/d37f8e5563164ec1285c659e7f5f75ecd44f8858))


### Features

* returns a promise when calling action creators ([d5a57cb](https://github.com/kayak/redux-data-model/commit/d5a57cb636c63e306c1850d755e8097e5f3af968))





# 0.5.0 (2019-11-16)


### Bug Fixes

* fix examples and move shared dependencies to root package.json ([164e3a8](https://github.com/kayak/redux-data-model/commit/164e3a865cacb2ed9c4af9bb9d2fa3415ac0e610))
* package lock files from examples need to be tracked or lerna fails ([f518b86](https://github.com/kayak/redux-data-model/commit/f518b86e8c7ceb4b4a20ab7f5e9497689db680b9))



## 0.3.2 (2019-09-26)



## 0.3.1 (2019-09-26)



# 0.3.0 (2019-09-26)


### Features

* add action creators as the last argument in model effects ([d0a21b4](https://github.com/kayak/redux-data-model/commit/d0a21b40aa73c65a27b18588cebbb3159cb037d6))
* make first argument of selectors their namespaced state ([7c1f54e](https://github.com/kayak/redux-data-model/commit/7c1f54eb065aaa860836d17812e36a1f904a8e9d))



## 0.2.1 (2019-09-19)



# 0.2.0 (2019-09-18)


### Features

* major API revamp based on dva ([e66c7c8](https://github.com/kayak/redux-data-model/commit/e66c7c8fad9c6cf3cf2c8ac73db31ab67b255c77))



# 0.1.0 (2019-08-08)


### Bug Fixes

* fix a couple of bugs in models and data classes ([e0e8928](https://github.com/kayak/redux-data-model/commit/e0e8928112a4f6a335364e3acfd56d151c40eb1e))
* fix json syntax error in release-it config ([55718f7](https://github.com/kayak/redux-data-model/commit/55718f7de7d091f274ea249c30abd7666aa7c1f7))


### Features

* add codebase and tests ([b60256a](https://github.com/kayak/redux-data-model/commit/b60256ab83724d45c565af6e45baecbe820baa81))
* make useModel default to models namespace ([f3cd4aa](https://github.com/kayak/redux-data-model/commit/f3cd4aad615a3a18561205ea1ce251afb7307d85))
