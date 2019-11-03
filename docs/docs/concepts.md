---
title: Concepts
id: concepts
---

React-resux has only a few core concepts. Namely [models](#model) and [subscribers](#subscriber).

## Model

Models are the most basic data structure/abstraction in react-resux. They require a set of options to be provided
when initializing them.

#### Example:
```javascript
import {Model} from 'react-resux';
import _ from 'lodash';

async function fetchApi(url) {
  return await fetch(url).then(response => response.json());
}

export const userModel = new Model({
    // Mandatory options
    namespace: 'users',
    state: {
        loading: {},
        data: {},
    },

    // Optional options
    selectors: {
        loadingByUser: (state, userId) => _.get(state, `loading[${userId}]`, true),
        userById: (state, userId) => _.get(state, `data[${userId}]`),
    },
    reducers: {
        saveUser(state, {data, userId}) {
          state.loading[userId] = false;
          state.data[userId] = data;
        },
    },
    effects: {
        *fetchUser({userId}, {call, put}, {saveUser}) {
            try {
                const data = yield call(fetchApi, `http://jsonplaceholder.typicode.com/users/${userId}`);
                yield put(saveUser({data, userId}));
             } catch (error) {
                console.log(error)
             }
        },
    },
});
```

A model consists of the set of state, selectors, actions, reducers and asynchrounous workflows (i.e. effects) that
are related to a given entity (e.g.. users). Below you can find a more in depth description on the many options
that can be used during a model instantiation.

### Model Options

An object with a few key-value pairs. Being [namespace](api/interfaces/modeloptions.md#namespace) and
[state](api/interfaces/modeloptions.md#state) mandatory, while
[selectors](api/interfaces/modeloptions.md#optional-selectors),
[reducers](api/interfaces/modeloptions.md#optional-reducers),
[effects](api/interfaces/modeloptions.md#optional-effects) are optional. For more info see
[this](api/interfaces/modeloptions.md).

### Models's API

For more info see [this](api/classes/model.md).

## Subscriber

Subscribers provide a way to link models' effects/reducers, so that they get triggered by the same non-namespaced
action type, on a leading, latest, or every action basis. That is, they provide the means for generating redux sagas
employing [takeLeading](https://redux-saga.js.org/docs/api/#takeleadingpattern-saga-args),
[takeLatest](https://redux-saga.js.org/docs/api/#takelatestpattern-saga-args), or
[takeEvery](https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args) effect creators. Those models' action
creators will be available within the subscriber's effects.

#### Example:
```javascript
import {Subscriber} from 'react-resux';
import {userModel} from './models';

export const pageSubscriber = new Subscriber([userModel]).takeLatest(
  'fetchPage', [
    (action, {users}) => users.fetchUser(action),
  ]
);
```

### Subscriber's API

For more info see [this](api/classes/subscriber.md).
