---
title: Tutorial
id: tutorial
---

This tutorial will introduce you to the basics of redux-data-model by building a counter application which will both
display the current counter value as well as provide the means for incrementing/decrementing.
Additionaly, the application requires a confirmation step whenever its user tries to increment/decrement
the counter value.

## TLDR

This tutorial is composed of both the
[counterWithConnectModel](https://github.com/kayak/redux-data-model/tree/master/examples/counterWithConnectModel) and
[counterWithConnectModelAndConfirmationDialog](https://github.com/kayak/redux-data-model/tree/master/examples/counterWithConnectModelAndConfirmationDialog)
examples. In the end, our high order component ([HOC]) API will be replaced with its hook based equivalent,
as shown in the [counterWithHooks](https://github.com/kayak/redux-data-model/tree/master/examples/counterWithHooks) example.
To see all examples click [here](https://github.com/kayak/redux-data-model#demos).

## Prerequisites

This tutorial assumes that you know the basics of how to use [react]. If you don't know what [react] is and how to
use it, you may wish to read [this tutorial](https://facebook.github.io/react/tutorial/tutorial.html) first.

### Do I need to learn redux and react-redux?

Redux-data-model is heavily based on [redux] and [react-redux]. A basic understanding of [redux] will help you
being familiar with concepts such as reducers, actions, action creators, middlewares, etc, which redux-data-model
also depend upon. Likewise, knowing [react-redux] will help the connecting of the data with [react] components.

### Do I need to learn redux-saga?

Redux-data-model uses [redux-saga] for asynchronous bits, when implementing asynchronous workflows that would often
involve multiple reducers at different points in time. If you don't know what [redux-saga] is and how to
use it, you may wish to read [this tutorial](https://redux-saga.js.org/docs/introduction/BeginnerTutorial.html)
first.

## Overview

Redux-data-model is an opinionated, [redux] abstraction with built-in immutability, async and more. If the above sentence
confused you, don't worry. We will dive deeper together and explore what it means step by step.

## Getting Started

When building applications with redux-data-model, the first exercise that will help you building your application is
thinking about what is the minimal set of entities. In our example application we will deal with a counter, so we
need a counter entity. The counter entity will have a count attribute, in order to track the count number.

So far our entities and their attributes look like this:

* counter
  * count

## Creating our first model

Central to redux-data-model is the concept of a [model]. The [model] consists of the set of state, selectors, actions,
reducers and asynchrounous workflows (i.e. effects) that are related to a given entity. In other words, they
represent the boilerplate around a given reducer plus the async bits handled by some [redux middleware]. This
means that in order to make our application work, we need to describe to redux-data-model what our [model] looks like.

To define a [model] for an entity in redux-data-model is to provide a set of options when instantiating a [model] class.
Each instantiated [model] needs at least its namespace and initial state to be provided. Therefore, the simplest
[model] we could define would be:

```javascript
import {Model} from 'redux-data-model';

export const countModel = new Model({
    // Mandatory options
    namespace: 'counter',
    state: {
        count: 0,
    },
});
```

At this point were not even using this [model], so let's try to display that count value we defined in the state
option. Before proceeding with actual UI work, we'd need to hook our [model] to both [redux] and our favourite
[redux middleware] (i.e. [redux-saga]) for handling async workflows. The way we can do that is explained in the
[Integrating with Redux/Redux Saga] section. Assuming you've set up everything correctly, you can now try to see your
models' state in your application redux state, by using something like
[Redux DevTools](https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd).

For the sake of example, the application state would be somewhat similar to:

```json
{
  counter: {
    count: 0
  },
  // your other reducer's state
}
```

Notice that countModel.state is namespaced with the namespace option provided to the [model]. By now you probably
realised that [model]'s namespaces must be unique. And you'd be totally right to assume that. In fact redux-data-model
will enforce that when calling the [combineModelReducers] function. Enough of digressions though.

## Getting to the UI

Let's assume a very simple component, that just displays the counter's count. Something along the lines of:

```javascript
export function Counter({count}) {
  return count;
}
```

It doesn't have access to the counter [model] yet, so let's do that. Since redux-data-model uses [redux], we could just
use the [connect] high order component ([HOC]) like:

```javascript
import {connect} from 'react-redux';

export function Counter({count}) {
  return count;
}

function mapStateToProps(state, props) {
  return {
    count: state.counter.count,
  };
}

export default connect(mapStateToProps)(Counter);
```

That's all nice and swell, but redux-data-model actually provides more powerful constructs for connecting your components
to the redux state. For such we have two options. To use [connectModel] high order component ([HOC]) or the equivalent
[hooks] API. Later on we will dive into the [hooks] API, but for now [connectModel] will do the trick.

## Reading data through selectors

As you might have imagined, [connectModel] is to redux-data-model, what [connect] is to [redux]. In other words, it allows
your component to dispatch actions, for modifying the state, or reading from the state. But before we go about
using [connectModel], let's add a selector to our [model], so that we can read data from it.

```javascript
import {Model} from 'redux-data-model';

export const countModel = new Model({
    // Mandatory options
    namespace: 'counter',
    state: {
        count: 0,
    },
    selectors: {
      count: (namespacedState) => namespacedState.count
    },
});
```

Now let's change our component to use [connectModel]:

```javascript
import {connectModel} from 'redux-data-model';
import {countModel} from './models';

function CountComponent({count}) {
  return count;
}

function mapStateToProps(state, props, selectors) {
  return {
    count: selectors.counter.count(state),
  };
}

export default connectModel([countModel], mapStateToProps)(CountComponent);
```

So we can definitely see a few similarities between [connectModel] and [connect] here. Both have a user defined
mapStateToProps and, as a matter of fact, can also have a user defined mapDispatchToProps function. Notice
that the first argument of [connectModel] is the list of models the component is going to employ. You might have
also noticed that the [connectModel]'s mapStateToProps also gets a third argument. Namely the selectors object,
which contain namespaced references to all the selectors in the [connectModel]'s provided models. It's important
to mention that those selectors are all memoised under the hood, so that more complex selectors don't get
re-computed when data hasn't actually changed.

You can also provide extra arguments to the selectors, perhaps some id you get from the props. Just pass extra
positional arguments to the selector call in the mapStateToProps function. Such as in:

```javascript
function mapStateToProps(state, props, selectors) {
  return {
    count: selectors.counter.count(state, props.someValue),
  };
}
```

## Modifying data through reducers

Given we can now display the counter's count, how about adding two buttons to our UI. One for incrementing and
one for decrementing the count. Before we do any sort of UI work, we need to define those reducers in our [model]:

```javascript
import {Model} from 'redux-data-model';

export const countModel = new Model({
    // Mandatory options
    namespace: 'counter',
    state: {
        count: 0,
    },
    selectors: {
      count: (namespacedState) => namespacedState.count
    },
    reducers: {
      increment(state, action) {
        state.count += 1;
      },
      decrement(state, action) {
        state.count -= 1;
      },
      changeCountByX(state, {x}) {
        state.count += x;
      },
    }
});
```

Notice we have declared three different reducers. Those are mostly for example's sake, since changeCountByX alone
would suffice. More importantly, is the fact that we are changing the redux state inplace, which might seem a
terrible practice to some of you. That's not the case since redux-data-model will enforce immutability via property
accessors with [immer], so don't ever bother about destructuring/constructing data and/or deep copying values
ever again. As a consequence, you can just use shallow comparisons, in order to decide when you need to
re-render a component.

Despite that, you might be curious on how actions can trigger the reducers we have just created. That's actually
quite simple. See a few action examples below:

* {type: '@@counter.increment@@'}
* {type: '@@counter.decrement@@'}
* {type: '@@counter.changeCountByX@@', x: 1}

One can assume here they could dispatch those actions and have the respective [model]'s reducers triggered, that
won't work but the action types are precisely the same.
Unlike [connect], [connectModel] won't inject dispatch into connected components. That's because it sets a default
mapStateToProps, if you havent set any. This default mapDispatchToProps, would have a shape like:

```json
{
  modelANamespace: {
    modelAReducer1Name: (objectToBeMergedWithAction) => ...
    modelAEffect1Name: (objectToBeMergedWithAction) => ...
    // your other reducer and effect's
  },
  // your other models
}
```

So like selectors, in mapStateToProps, your default mapDispatchToProps is namespaced by the models' namespace.
Let's try to change the example with selectors, in order to use the default mapDispatchToProps for modifying our
redux state via reducers:

```javascript
import {connectModel} from 'redux-data-model';
import {countModel} from './models';

function CountComponent({count, counter}) {
  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={counter.increment}>Increment</button> | <button onClick={
          () => {
            // We could actually use decrement, but used this for showing how to pass parameters to your dispatchers
            counter.changeCountByX({x: -1});
          }
        }>Decrement</button>
      </div>
    </div>
  );
}

function mapStateToProps(state, props, selectors) {
  return {
    count: selectors.counter.count(state),
  };
}

export default connectModel([countModel], mapStateToProps)(CountComponent);
```

Simple right. We just needed to get the counter prop, since that's the namespace of the counter [model] and voilà.
But what about when you want to define a custom mapDispatchToProps, like when you need to mix vanilla [redux] with
redux-data-model. Like in react-redux, mapDispatchToProps can be declared in either a function form or a object shorthand
notation. As a function that would look like:

```javascript
import {connectModel} from 'redux-data-model';
import {countModel} from './models';

function CountComponent({count, increment, decrement}) {
  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={increment}>Increment</button> | <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
}

function mapStateToProps(state, props, selectors) {
  return {
    count: selectors.counter.count(state),
  };
}

function mapDispatchToProps(dispatch, props, actionCreators) {
  return {
    increment: () => dispatch(actionCreators.counter.increment()),
    decrement: () => dispatch(actionCreators.counter.decrement()),
  };
}

export default connectModel([countModel], mapStateToProps, mapDispatchToProps);
```

Meanwhile by using the object shorthand notation you could just have:

```javascript
import {connectModel} from 'redux-data-model';
import {countModel} from './models';

function CountComponent({count, increment, decrement}) {
  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={increment}>Increment</button> | <button onClick={decrement}>Decrement</button>
      </div>
    </div>
  );
}

function mapStateToProps(state, props, selectors) {
  return {
    count: selectors.counter.count(state),
  };
}

const mapDispatchToProps = {increment, decrement} = countModel.actionCreators();

export default connectModel([countModel], mapStateToProps, mapDispatchToProps);
```

All that said, you probably noticed that the default mapStateToProps is way easier to implement than both of these
solutions, so stick with it unless you have a good reason not to.

## Having a confirmation dialog

Now we have the basic functionality, we still need a confirmation step via a dialog, whenever users try to
increment/decrement the counter value. For such dialog we are going to use the [sweetalert2], but any would fit.

Although we could implement that with reducers, effects would better capture the logic and
allow for easier testability, that's harder when the logic for displaying plus confirming is on the component
level. Effects are essentially a way to implement asynchronous workflows that are very easy to test. Certainly
a consequence of effects being based on [redux-saga]. That said, let's see how our counter [model] should look
like with the bespoke effects:

```javascript
import {Model} from 'redux-data-model';
import Swal from "sweetalert2";

// Fyi async/await functions are just syntactic sugar for functions that return a promise
async function showConfirm(options) {
  const result = await Swal.fire({
    showCancelButton: true,
    showConfirmButton: true,
      ...options
  });
  if (result.value !== true) return false;
  return true;
}

export const countModel = new Model({
    // Mandatory options
    namespace: 'counter',
    state: {
        count: 0,
    },
    selectors: {
      count: (namespacedState) => namespacedState.count
    },
    reducers: {
      increment(state, action) {
        state.count += 1;
      },
      decrement(state, action) {
        state.count -= 1;
      },
      changeCountByX(state, {x}) {
        state.count += x;
      },
    },
    effects: {
      * confirmBeforeIncrementing(action, {call, put}, {increment, decrement}) {
        // Arguments are action, sagaEffects and actionCreators
        const hasConfirmed = yield call(showConfirm, {
          text: "Are you sure you want to increment?"
        });

        if (hasConfirmed) yield put(increment());
      },
      * confirmBeforeDecrementing(action, {call, put}, {increment, decrement}) {
        // Arguments are action, sagaEffects and actionCreators
        const hasConfirmed = yield call(showConfirm, {
          text: "Are you sure you want to decrement?"
        });

        if (hasConfirmed) yield put(decrement());
      },
    }
});
```

As you might have noticed by now, effects are just normal [redux-saga]'s sagas. For our example, a simple
[call](https://redux-saga.js.org/docs/api/) and a simple
[put](https://redux-saga.js.org/docs/api/#putaction) effect creators, are enough to do the job. How are we
going to use them in the component level, you might be wondering. And actually they're accessed the same way
as reducers on the component level. So you could just change your component to, assuming the one using a default
mapDispatchToProps:

```javascript
import {connectModel} from 'redux-data-model';
import {countModel} from './models';

function CountComponent({count, counter}) {
  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={counter.confirmBeforeIncrementing}>Increment</button> |
        <button onClick={counter.confirmBeforeDecrementing}>Decrement</button>
      </div>
    </div>
  );
}

function mapStateToProps(state, props, selectors) {
  return {
    count: selectors.counter.count(state),
  };
}

export default connectModel([countModel], mapStateToProps)(CountComponent);
```

Now let's say we need to redirect to another page, when the user is done with the incrementation (i.e. clicking
yes in the dialog), or that we need to display an error message if something went wrong (e.g. a REST request
within one of our effects raised an exception). That's actually quite easy to do. Every dispatcher returns a
promise when called. Dispatchers for effects will resolve if the effect was succesfull or reject if an exception
was raised within the effect (i.e. saga generator). In case of a reducer's dispatcher, an already resolved
promise is returned. That means we could change the code above to:

```javascript
import {connectModel} from 'redux-data-model';
import {countModel} from './models';

function CountComponent({count, counter}) {
  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={
            () => counter.confirmBeforeIncrementing().then(
                //...
            ).rejects(
                // shows an error message
            )}
        >
            Increment
        </button> |
        <button onClick={
            () => counter.confirmBeforeDecrementing().then(
                // ...
            ).rejects(
                // shows an error message
            )}>
                Decrement
         </button>
      </div>
    </div>
  );
}

function mapStateToProps(state, props, selectors) {
  return {
    count: selectors.counter.count(state),
  };
}

export default connectModel([countModel], mapStateToProps)(CountComponent);
```

Neat right? That covers basically all the functionality that the [model] class exposes. So now you can go ahead and
implement your own.

## Going further: Using our Hooks API

[Hooks] are the new sensation in the [react] world and rightfully so. In fact, we took them into account since
the get go. For such, we expose two [hooks], namely [useModelActions] and [useModelSelector]. So that we could,
write the previous examples as:

```javascript
import {useModelActions, useModelSelector} from 'redux-data-model';
import {countModel} from './models';

export default function CountComponent() {
  const {confirmBeforeIncrementing, confirmBeforeDecrementing} = useModelActions(counterModel);
  const count = useModelSelector(counterModel, (state, selectors) => selectors.count(state));

  return (
    <div>
      <div>Count: {count}</div>
      <div>
        <button onClick={confirmBeforeIncrementing}>Increment</button> |
        <button onClick={confirmBeforeDecrementing}>Decrement</button>
      </div>
    </div>
  );
}
```

It does look more compact than previous solutions, so we'd strongly recommend you to use [our Hooks API] instead of
the [connectModel] high order component ([HOC]).

[react]: https://reactjs.org/
[hooks]: https://reactjs.org/docs/hooks-reference.html
[HOC]: https://reactjs.org/docs/higher-order-components.html
[redux]: https://redux.js.org/
[react-redux]: https://react-redux.js.org/
[redux-saga]: https://redux-saga.js.org/
[connect]: https://react-redux.js.org/api/connect
[redux middleware]: https://redux.js.org/advanced/middleware
[sweetalert2]: https://sweetalert2.github.io/
[immer]: https://github.com/immerjs/immer

[model]: concepts#model
[connectModel]: api/README.md#connectmodel
[useModelActions]: api/README.md#usemodelactions
[useModelSelector]: api/README.md#usemodelselector
[combineModelReducers]: api/README.md#combinemodelreducers
[Integrating with Redux/Redux Saga]: redux-integration
[our Hooks API]: hooks
