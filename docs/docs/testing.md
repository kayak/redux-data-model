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
        increment(state) {
          state.count += 1;
        },
        decrement(state) {
          state.count -= 1;
        },
        incrementByX(state, { x }) {
          state.count += x;
        },
    },
    effects: {
      *asyncIncrement(payload, { put }, { increment }) {
          // This is not useful in practice, since there's no async behaviour per se, but is defined for
          // example's sake.
          yield put(increment());
      },
      *asyncDecrement(payload, { put }, { decrement }) {
          // This is not useful in practice, since there's no async behaviour per se, but is defined for
          // example's sake.
          yield put(decrement());
      },
    },
    blockingEffects: {
      *asyncIncrement(actionType, { debounce }, { asyncIncrement }) {
          // This overrides the asyncIncrement default behavior, which would be to use a takeEvery effect. Instead
          // it will use a debounce effect.
          yield debounce(300, actionType, asyncIncrement);
      },
    },
});
```

### Testing the [namespace]:

```javascript
it('namespace is set to counter', () => {
  expect(counterModel.namespace).toEqual('counter');
});
```

### Testing the [initial state][state]:

```javascript
it('initial state is properly set', () => {
  expect(counterModel.state).toEqual({
    count: 0,
  });
});
```

### Testing the [selectors]:

```javascript
const selectors = counterModel.selectors;

it('count selector returns the count', () => {
  const state = {...counterModel.state};
  expect(selectors.count(state)).toEqual(state.count);
});
```

### Testing the [reducers]:

```javascript
const payload = {}; // It's empty, since the reducers don't use the action's payload

it('increments reducer change count to current + 1', () => {
  const state = {...counterModel.state};
  counterModel.reducers.increment(state, payload);
  expect(state.count).toEqual(1);
});

it('decrements reducer change count to current - 1', () => {
  const state = {...counterModel.state};
  counterModel.reducers.decrement(state, payload);
  expect(state.count).toEqual(-1);
});
```

### Testing the [effects]:

Testing [effects] (i.e. sagas/generators) can feel very repetitive. Some options for increasing
productivity can be found on [Testing Sagas](https://redux-saga.js.org/docs/advanced/Testing.html).
Among those options it's noteworthy [redux-saga-test-plan](https://github.com/jfairbank/redux-saga-test-plan).

```javascript
import * as sagaEffects from 'redux-saga/effects'

const action = {}; // It's empty, since the effects don't use action's data
const actionCreators = counterModel.reducers;

it('asyncIncrement effect yields put increment reducer', () => {
  const gen = counterModel.effects.asyncIncrement(payload, sagaEffects, actionCreators);
  expect(gen.next().value).toEqual(
    sagaEffects.put(actionCreators.increment())
  );
});

it('asyncDecrement effect yields put decrement reducer', () => {
  const gen = counterModel.effects.asyncDecrement(payload, sagaEffects, actionCreators);
  expect(gen.next().value).toEqual(
    sagaEffects.put(actionCreators.decrement())
  );
});
```

### Testing the [blocking effects]:

Read the section above for more info on tips for testing sagas.

```javascript
import * as sagaEffects from 'redux-saga/effects'

const actionType = 'whatever';
const modelEffects = counterModel.effects;

it('asyncIncrement blocking effect yields debounce asyncIncrement effect for 300 milliseconds', () => {
  const gen = counterModel.blockingEffects.asyncIncrement(actionType, sagaEffects, modelEffects);
  expect(gen.next().value).toEqual(
    sagaEffects.debounce(300, actionType, modelEffects.asyncIncrement)
  );
});
```

In case you are wondering how to test effects that yields a value, such as the
[call](https://redux-saga.js.org/docs/api/#callfn-args) effect, you can set the value returned by an yield expression
inside a generator. That's possible by passing an argument to its
[next](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next) method.
Also, whenever you need to inject an exception within a generator, in order to test a try-catch block, you can use
the [throw](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/throw) method.

[namespace]: api/interfaces/modeloptions.md#namespace
[state]: api/interfaces/modeloptions.md#state
[selectors]: api/interfaces/modeloptions.md#optional-selectors
[reducers]: api/interfaces/modeloptions.md#optional-reducers
[effects]: api/interfaces/modeloptions.md#optional-effects
[blocking effects]: api/interfaces/modeloptions.md#optional-blockingeffects