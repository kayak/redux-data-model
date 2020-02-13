---
title: Testing
id: testing
---

> WARNING: Some initialization checks are performed, when a [Model](api/classes/model.md) gets used, so that
>          we ensure it was properly integrated with Redux/Redux Saga. Those checks are not useful when
>          running tests and can be disabled by setting 
>          [Model.disableInitializationChecks](api/classes/model.md#static-disableinitializationchecks) to true.

One of the main design decisions of this library, was to keep it easier to test the business logic in your selectors,
reducers, and effects, in spite of the abstraction. As a matter of fact, we believe it's actually simpler than
testing vanilla redux. Given the model below, let's try to test it with [jest](https://jestjs.io/).

## Model

### Example:
```javascript
import {Model} from 'redux-data-model';

Model.disableInitializationChecks = true;

export const counterModel = new Model({
    namespace: 'counter',
    state: {
        count: 0,
    },
    selectors: {
        count: (state) => state.count,
    },
    reducers: {
        increment(state, {}) {
          state.count += 1;
        },
        decrement(state, {}) {
          state.count -= 1;
        },
        incrementByX(state, {x}) {
          state.count += x;
        },
    },
    effects: {
      *asyncIncrement(action, { put }, { increment }) {
          // This is not useful in practice, since there's no async behaviour per se, but is defined for
          // example's sake.
          yield put(increment());
      },
      *asyncDecrement(action, { put }, { decrement }) {
          // This is not useful in practice, since there's no async behaviour per se, but is defined for
          // example's sake.
          yield put(decrement());
      },
    },
});
```

### Testing the namespace:

```javascript
it('namespace is set to counter', () => {
  expect(counterModel.namespace).toEqual('counter');
});
```

### Testing the initial state:

```javascript
it('initial state is properly set', () => {
  expect(counterModel.state).toEqual({
    count: 0,
  });
});
```

### Testing the reducers:

```javascript
const action = {}; // It's empty, since the reducers don't use the action's data

it('increments reducer change count to current + 1', () => {
  const state = {...counterModel.state};
  counterModel.reducers.increment(state, action);
  expect(state.count).toEqual(1);
});

it('decrements reducer change count to current - 1', () => {
  const state = {...counterModel.state};
  counterModel.reducers.decrement(state, action);
  expect(state.count).toEqual(-1);
});
```

### Testing the effects:

```javascript
import * as sagaEffects from 'redux-saga/effects'

const action = {}; // It's empty, since the effects don't use action's data
const actionCreators = counterModel.actionCreators();

it('asyncIncrement effect yields put increment reducer', () => {
  const gen = counterModel.effects.asyncIncrement(action, sagaEffects, actionCreators);
  expect(gen.next().value).toEqual(
    sagaEffects.put(actionCreators.increment())
  );
});

it('asyncDecrement effect yields put decrement reducer', () => {
  const gen = counterModel.effects.asyncDecrement(action, sagaEffects, actionCreators);
  expect(gen.next().value).toEqual(
    sagaEffects.put(actionCreators.decrement())
  );
});
```

In case you are wondering how to test blocking effects, such as the
[call](https://redux-saga.js.org/docs/api/#callfn-args) effect, you can set the value returned by an yield expression
inside a generator. That's possible by passing an argument to its
[next](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next) method.
Also, whenever you need to inject an exception within a generator, in order to test a try-catch block, you can use
the [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw) method.

