# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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


### Features

* returns a promise when calling action creators ([d5a57cb](https://github.com/kayak/redux-data-model/commit/d5a57cb636c63e306c1850d755e8097e5f3af968))





# 0.5.0 (2019-11-16)


### Bug Fixes

* fix examples and move shared dependencies to root package.json ([164e3a8](https://github.com/kayak/redux-data-model/commit/164e3a865cacb2ed9c4af9bb9d2fa3415ac0e610))
