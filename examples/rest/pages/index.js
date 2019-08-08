import {
  AsyncResolver,
  combineModelReducers,
  Model,
  useModel,
  useService,
} from 'kaytum';
import {
  applyMiddleware,
  combineReducers,
  createStore,
} from 'redux';
import logger from 'redux-logger';

import {Provider} from 'react-redux';
import * as React from 'react';

const asyncResolver = new AsyncResolver();
const userModel = new Model({
  namespace: 'users',
  scopes: [],
  fields: {}
});
const postModel = new Model({
  namespace: 'posts',
  scopes: ['byUserId'],
  fields: {},
  views: {
    asItem: post => ({id: post.id, label: `${post.id}. ${post.title}`, status: post.published ? 'Done' : 'To Do'}),
  },
  controllers: {
    switchCompleted: post => post.published = !post.published,
  }
});

const userServiceSpec = {
  model: userModel,
  host: 'http://jsonplaceholder.typicode.com',
  urls: {
    byId: '/users/:id'
  }
};
const postServiceSpec = {
  model: postModel,
  host: 'http://jsonplaceholder.typicode.com',
  urls: {
    byId: '/posts/:id',
    byUserId: '/posts/',
  }
};
const store = createStore(combineReducers({
  models: combineModelReducers([postModel, userModel]),
  [asyncResolver.namespace]: asyncResolver.reducers(),
}), applyMiddleware(logger));

function TestComponent(props) {
  const userData = useModel(userModel);
  const postData = useModel(postModel);
  const userService = useService(userServiceSpec);
  const postService = useService(postServiceSpec);
  const [userId, setUserId] = React.useState(1);

  const userRequest = userService.byId(userId).get({pathParams: {id: userId}});
  const postRequest = postService.byUserId(userId).get({queryParams: {userId}});

  if (userRequest.isLoading) return `Loading user #${userId}...`;
  if (userRequest.error) return (
    <div>
      {userRequest.error} | <button onClick={() => setUserId(1)}>Fetch first user</button>
    </div>
  );

  const user = userData.byId(userId);

  let postItems = [];

  if (!postRequest.isLoading) {
      postItems = postData.byUserId(userId).asItem();
  }

  return (
    <>
      <div>
        <strong>User:</strong> {user.name}
      </div>
      <div>
        <button onClick={() => setUserId(userId + 1)}>Fetch next</button> |{' '}
        <button onClick={() => setUserId(userId + 10000000000)}>Fetch inexistent user</button>
      </div>
      <br/>
      <div>
        <strong>Posts:</strong> {postRequest.isLoading ? 'Loading posts...' : postItems.map(post => (
          <div key={post.id}>{post.label} | {post.status} |{' '}
            <button onClick={() => postData.byId(post.id).switchCompleted()}>Switch state</button>
          </div>
        ))}

        <button onClick={() => postData.byUserId(userId).switchCompleted()}>Switch state from all comments</button>
      </div>
      <br/>
      <hr/>
      <br/>
      <div><strong>User Request:</strong> {JSON.stringify(userRequest, null, 4)}</div>
      <div><strong>Post Request:</strong> {JSON.stringify(postRequest, null, 4)}</div>
      <br/>
      <div><strong>userData.byId(userId):</strong> {JSON.stringify(user, null, 4)}</div>
      <div><strong>postData.byUserId(userId).asItem():</strong> {JSON.stringify(postItems, null, 4)}</div>
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

