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

interface UserState {
  loadingById: {
    [key: string]: boolean;
  };
  usersById: {
    [key: string]: any;
  };
};

export const userModel = new Model<UserState>({
  namespace: 'users',
  state: {
    loadingById: {},
    usersById: {},
  },
  selectors: {
    loadingByUser: (state, userId) => _.get(state, `loadingById[${userId}]`, true),
    userById: (state, userId) => _.get(state, `usersById[${userId}]`),
  },
  reducers: {
    saveUser(state, {data, userId}) {
      state.loadingById[userId] = false;
      state.usersById[userId] = data;
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

interface PostState {
  loadingById: {
    [key: string]: boolean;
  };
  postsByUserId: {
    [key: string]: any[];
  };
};

export const postModel = new Model<PostState>({
  namespace: 'posts',
  state: {
    loadingById: {},
    postsByUserId: {},
  },
  selectors: {
    loadingByUser: (state, userId) => _.get(state, `loadingById[${userId}]`, true),
    postsAsItems: (state, userId) => _.get(state, `postsByUserId[${userId}]`, []).map(
      (post: any) => ({id: post.id, label: `${post.id}. ${post.title}`, status: post.published ? 'Done' : 'To Do'})
    ),
  },
  reducers: {
    savePostsByUser(state, {data, userId}) {
      state.loadingById[userId] = false;
      state.postsByUserId[userId] = data;
    },
    switchPublishedByUser(state, {userId}) {
      state.postsByUserId[userId].forEach((post: any) => post.published = !post.published);
    },
    switchPublishedByUserAndPost(state, {userId, postId}) {
      const post = state.postsByUserId[userId].find((post: any) => post.id === postId);
      post.published = !post.published;
    },
  },
  effects: {
    *fetchPostsByUser({userId}, {call, put}, {savePostsByUser}) {
      try {
        const data = yield call(fetchApi, `//jsonplaceholder.typicode.com/posts/?user=${userId}`);
        yield put(savePostsByUser({data, userId}));
      } catch (error) {
        console.log(error)
      }
    },
  },
});

const sagaMiddleware = createSagaMiddleware();
const middlewares: any[] = [sagaMiddleware];

if (process.env.NODE_ENV === `development`) {
  middlewares.push(logger);
}

const store = createStore(combineReducers({
  ...combineModelReducers([postModel, userModel]),
}), applyMiddleware(...middlewares));

sagaMiddleware.run(() => modelRootSaga([userModel, postModel]));

function TestComponent() {
  const [userId, setUserId] = React.useState(1);
  const userActions = useModelActions(userModel);
  const postActions = useModelActions(postModel);

  // Only used for displaying entire state
  const allState = useSelector(state => state);

  const loadingUser = useModelSelector(userModel, (state, selectors) => selectors.loadingByUser(state, userId));
  const loadingPosts = useModelSelector(postModel, (state, selectors) => selectors.loadingByUser(state, userId));

  const user = useModelSelector(userModel, (state, selectors) => selectors.userById(state, userId));
  const postItems = useModelSelector(postModel, (state, selectors) => selectors.postsAsItems(state, userId));

  React.useEffect(() => {
    userActions.fetchUser({userId});
    postActions.fetchPostsByUser({userId});
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
        <strong>Posts:</strong> {loadingPosts ? 'Loading posts...' : postItems.map((post: any) => (
          <div key={post.id}>{post.label} | {post.status} |{' '}
            <button onClick={() => postActions.switchPublishedByUserAndPost({userId, postId: post.id})}>
              Switch state
            </button>
          </div>
        ))}

        <button onClick={() => postActions.switchPublishedByUser({userId})}>
          Switch state from all comments
        </button>
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

