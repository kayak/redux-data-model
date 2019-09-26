import {
  combineModelReducers,
  Model,
  resuxRootSaga,
  Subscriber,
  useModelActions,
  useModelSelector,
  useSubscriberActions,
} from 'react-resux';
import createSagaMiddleware from 'redux-saga';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import logger from 'redux-logger';
import * as _ from 'lodash';
import {
  Provider,
  useSelector,
} from 'react-redux';
import * as React from 'react';
import JSONTree from 'react-json-tree';

async function fetchApi(url) {
  return await fetch(url).then(response => response.json());
}

export const userModel = new Model({
    namespace: 'users',
    state: {
        loading: {},
        data: {},
    },
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

export const postModel = new Model({
    namespace: 'posts',
    state: {
        loading: {},
        postsByUserId: {},
    },
    selectors: {
        loadingByUser: (state, userId) => _.get(state, `loading[${userId}]`, true),
        postsAsItems: (state, userId) => _.get(state, `postsByUserId[${userId}]`, []).map(
          post => ({id: post.id, label: `${post.id}. ${post.title}`, status: post.published ? 'Done' : 'To Do'})
        ),
    },
    reducers: {
        savePostsByUser(state, {data, userId}) {
            state.loading[userId] = false;
            state.postsByUserId[userId] = data;
        },
        switchPublishedByUser(state, {userId}) {
            state.postsByUserId[userId].forEach(post => post.published = !post.published);
        },
        switchPublishedByUserAndPost(state, {userId, postId}) {
            const post = state.postsByUserId[userId].find(post => post.id === postId);
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

export const pageSubscriber = new Subscriber([userModel, postModel]).takeLatest(
  'fetchPage', [
    (action, {users}) => users.fetchUser(action),
    (action, {posts}) => posts.fetchPostsByUser(action),
  ]
);

const sagaMiddleware = createSagaMiddleware();

const store = createStore(combineReducers({
  ...combineModelReducers([postModel, userModel]),
}), applyMiddleware(logger, sagaMiddleware));

sagaMiddleware.run(() => resuxRootSaga([userModel, postModel, pageSubscriber]));


function TestComponent() {
  const [userId, setUserId] = React.useState(1);
  const pageActions = useSubscriberActions(pageSubscriber);
  const postActions = useModelActions(postModel);

  // Only used for displaying entire state
  const allState = useSelector(state => state);

  const loadingUser = useModelSelector(userModel, (state, selectors) => selectors.loadingByUser(state, userId));
  const loadingPosts = useModelSelector(postModel, (state, selectors) => selectors.loadingByUser(state, userId));

  const user = useModelSelector(userModel, (state, selectors) => selectors.userById(state, userId));
  const postItems = useModelSelector(postModel, (state, selectors) => selectors.postsAsItems(state, userId));

  React.useEffect(() => {
    pageActions.fetchPage({userId});
  }, [userId]);

  if (loadingUser) return `Loading user #${userId}...`;

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
        <strong>Posts:</strong> {loadingPosts ? 'Loading posts...' : postItems.map(post => (
          <div key={post.id}>{post.label} | {post.status} |{' '}
            <button onClick={() => postActions.switchPublishedByUserAndPost({userId, postId: post.id})}>
              Switch state
            </button>
          </div>
        ))}

        <button onClick={() => postActions.switchPublishedByUser({userId})}>Switch state from all comments</button>
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

