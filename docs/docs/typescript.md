---
title: Typescript
id: typescript
---

Yes. We do support [typescript]. The most important aspect is that you can define four specific templated types,
either when typing the ModelOptions or the Model itself. Both interfaces are declared as follows:

```typescript
interface ModelOptions<State={}, SelectorPayloads={}, ReducerPayloads={}, EffectPayloads={}>;
interface Model<State={}, SelectorPayloads={}, ReducerPayloads={}, EffectPayloads={}>
```

## Example

So assuming the following model:

```javascript
import {Model} from 'redux-data-model';

export const counterModel = new Model({
    namespace: 'counter',
    state: {
        count: 0,
    }
});
```

One could type its state as:

```typescript
import {Model} from 'redux-data-model';

type CounterState = {
    count: number;
};

export const counterModel = new Model<CounterState>({
    namespace: 'counter',
    state: {
        count: 0,
    },
});
```

Let's add a couple selectors and type them as well:


```typescript
import {Model} from 'redux-data-model';

type CounterState = {
    count: number;
};

type CounterSelectorPayloads = {
    count: {};
    countTimesX: {
        x: number;
    };
};

export const counterModel = new Model<CounterState, CounterSelectorPayloads>({
    namespace: 'counter',
    state: {
        count: 0,
    },
    selectors: {
        count: (state) => state.count,
        countTimesX: (state, { x }) => state.count * x,
    },
});
```

As you can assume, when typing selectors, you won't define their function shape. Instead you just type the
only variable aspect of it. Which are the parameters that the user can pass when calling the selector. The
same principle holds true for reducers and effects/blocking effects. As you can see in the following
example:

```javascript
import {Model} from 'redux-data-model';

type CounterState = {
    count: number;
};

type CounterSelectorPayloads = {
    count: {};
    countTimesX: {
        x: number;
    };
};

type CounterReducerPayloads = {
    decrement: {};
    incrementByX: {
        x: number;
    };
};

type CounterEffectPayloads = {
    asyncIncrement: {};
    asyncIncrementByX: {
        x: number;
    };
};

export const counterModel = new Model<CounterState, CounterSelectorPayloads, CounterReducerPayloads, CounterEffectPayloads>({
    namespace: 'counter',
    state: {
        count: 0,
    },
    selectors: {
        count: (state) => state.count,
        countTimesX: (state, { x }) => state.count * x,
    },
    reducers: {
        increment(state) {
          state.count += 1;
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
      *asyncIncrementByX(payload, { put }, { incrementByX }) {
          // This is not useful in practice, since there's no async behaviour per se, but is defined for
          // example's sake.
          yield put(incrementByX());
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

Those simple steps will ensure your models are thoroughly typed.

[typescript]: https://www.typescriptlang.org/