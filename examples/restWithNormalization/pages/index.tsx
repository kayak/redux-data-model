import {combineModelReducers, Model, modelRootSaga,} from 'redux-data-model';
import {useModelActions, useModelSelector,} from 'redux-data-model-hooks';
import createSagaMiddleware from 'redux-saga';
import {applyMiddleware, combineReducers, createStore,} from 'redux';
import logger from 'redux-logger';
import * as _ from 'lodash';
import {Provider, useSelector,} from 'react-redux';
import * as React from 'react';
import JSONTree from 'react-json-tree';
import fetch from 'isomorphic-unfetch';

async function fetchApi(url: string) {
  return await fetch(url).then(response => response.json());
}

interface User {
  id: number;
  name: string;
  address: number;
}

interface UserState {
  loadingById: {
    [key: string]: boolean;
  };
  usersById: {
    [key: string]: User;
  };
};

interface UserSelectorPayloads {
  loadingByUser: {
    userId: number;
  };
  userById: {
    userId: number;
  };
};

interface UserReducerPayloads {
  saveUser: {
    data: User;
    userId: number;
  };
};

interface UserEffectPayloads {
  fetchUser: {
    userId: number;
  };
};

export const userModel = new Model<
UserState, UserSelectorPayloads, UserReducerPayloads, UserEffectPayloads
>({
  namespace: 'users',
  state: {
    loadingById: {},
    usersById: {},
  },
  selectors: {
    loadingByUser: (state, {userId}) => _.get(state, `loadingById[${userId}]`, true),
    userById: [
      (state, {userId}) => _.get(state, `usersById[${userId}]`),
      (_state, {userId}, allState) => _.get(allState, `addresses.addressesByUserId[${userId}]`),
      (user, address) => ({...user, address})
    ],
  },
  reducers: {
    saveUser(state, {data, userId}) {
      state.loadingById[userId] = false;
      state.usersById[userId] = {
        id: data.id,
        name: data.name,
        address: data.id,
      };
    },
  },
  effects: {
    *fetchUser({userId}, {call, put}, actionCreators) {
      try {
        const data = yield call(fetchApi, `//jsonplaceholder.typicode.com/users/${userId}`);
        yield put(actionCreators.saveUser({data, userId}));
      } catch (error) {
        console.log(error)
      }
    },
  },
});

interface AddressState {
  addressesByUserId: {
    [key: number]: string;
  };
};

export const addressModel = new Model<AddressState>({
  namespace: 'addresses',
  state: {
    addressesByUserId: {},
  },
  reducers: {
    [userModel.actionTypes().saveUser](
      state: AddressState,
      {data, userId}: {
        data: {
          address: string;
        };
        userId: number;
      }
    ) {
      state.addressesByUserId[userId] = data.address;
    },
  },
});

const sagaMiddleware = createSagaMiddleware();
const middlewares: any[] = [sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(combineReducers({
  ...combineModelReducers([addressModel, userModel]),
}), applyMiddleware(...middlewares));

sagaMiddleware.run(() => modelRootSaga([userModel, addressModel]));

function TestComponent() {
  const [userId, setUserId] = React.useState(1);
  const userActions = useModelActions(userModel);

  // Only used for displaying entire state
  const allState = useSelector(state => state);

  const loadingUser = useModelSelector(userModel, (state, selectors) => selectors.loadingByUser(state, {userId}));

  const user = useModelSelector(userModel, (state, selectors) => selectors.userById(state, {userId}));

  React.useEffect(() => {
    userActions.fetchUser({userId});
  }, [userId]);

  if (loadingUser) return (<div>Loading user #{userId}...</div>);

  return (
    <>
      <div>
        <strong>User:</strong> {user.name}
      </div>
      <div>
        <button onClick={() => setUserId(userId + 1)}>Fetch next</button>
      </div>
      <br/>
      <div>
        <strong>Address:</strong> {JSON.stringify(user.address)}
      </div>
      <br/>
      <hr/>
      <br/>
      <div>
        <strong>State (Open console to see actions as they are triggered):</strong>
        <JSONTree data={allState} />
      </div>
    </>
  );
}

export default () => {
  return (
    <Provider store={store}>
      <TestComponent />
    </Provider>
  );
};

