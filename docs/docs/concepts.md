---
title: Concepts
id: concepts
---

Redux-data-model has only a few core concepts.

## Model

[Models][model] are the most basic data structure/abstraction in redux-data-model. They require a set of
[options][model options] to be provided when initializing them.

#### Example:
```javascript
import {Model} from 'redux-data-model';
import _ from 'lodash';

async function fetchApi(url) {
  return await fetch(url).then(response => response.json());
}

export const userModel = new Model({
    // Mandatory options
    namespace: 'users',
    state: {
        userIds: [],
        loadingById: {},
        userById: {},
    },

    // Optional options
    selectors: {
        // Non memoized selectors
        loadingById: (state, userId) => _.get(state, `loadingById[${userId}]`, true),
        userById: (state, userId) => _.get(state, `userById[${userId}]`),
        // Memoized selectors
        users: [
          state => state.userIds,
          state => state.userById,
          (userIds, userById) => userIds.map(id => userById[id]),
        ],
    },
    reducers: {
        saveUser(state, { data, userId }) {
          state.userIds.append(userId);
          state.loadingById[userId] = false;
          state.userById[userId] = data;
        },
    },
    effects: {
        *fetchUser({ userId }, { call, put }, { saveUser }) {
            try {
                const data = yield call(fetchApi, `http://jsonplaceholder.typicode.com/users/${userId}`);
                yield put(saveUser({data, userId}));
             } catch (error) {
                console.log(error)
             }
        },
    },
    blockingEffects: {
        *fetchUser(actionType, { debounce }, { fetchUser }) {
            yield debounce(100, actionType, fetchUser);
        },
    },
});
```

A [model] consists of the set of state, selectors, reducers and asynchrounous workflows (i.e. effects and blocking
effects) that are related to a given entity (e.g. users). Below you can find a more in depth description on the
many [options][model options] that can be used during a model instantiation.

### Model Options

An object with a few key-value pairs. Being [namespace] and [state] mandatory, while
[selectors], [reducers], [effects], and [blocking effects] are optional. For more info see
[this][model options].

### Models's API

For more info see [this][model].

[model]: api/classes/model.md
[model options]: api/interfaces/modeloptions.md
[namespace]: api/interfaces/modeloptions.md#namespace
[state]: api/interfaces/modeloptions.md#state
[selectors]: api/interfaces/modeloptions.md#optional-selectors
[reducers]: api/interfaces/modeloptions.md#optional-reducers
[effects]: api/interfaces/modeloptions.md#optional-effects
[blocking effects]: api/interfaces/modeloptions.md#optional-blockingeffects