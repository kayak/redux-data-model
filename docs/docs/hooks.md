---
title: Hooks
id: hooks
---

> WARNING: This requires the redux-data-model-hooks package to be installed.

Redux-Data-Model is a hooks-first library and it provides three distinct hooks as part of its public API. They are:

## useModelSelector
Returns the result of a given a selector, which has the state and perhaps additional arguments as arguments. For
more info see its [API](api/README.md#usemodelselector) reference.

#### Read data example:
```javascript
import {useModelSelector} from 'redux-data-model-hooks';
import {modelX} from './modelX';

export default function({page}) {
  // We assume here that modelX has a selector defined.
  // Fyi modelXSelectors arg will include all selectors defined on modelX.
  const xData = useModelSelector(modelX, (state, modelXSelectors) => modelXSelectors.dataByPage(page));

  return items.map(
    item => <span key={item.id}>{xData.label}</span>
  );
}
```

## useModelActions

Returns an object with all reducer/effect action creators, defined in the provided model, already bound with
redux's dispatch. For more info see its [API](api/README.md#usemodelactions) reference.

#### Read data example:
```javascript
import {useModelActions} from 'redux-data-model-hooks';
import {modelX} from './modelX';

export default function({page}) {
  // We assume here that modelX has a reducer called swapValue defined.
  // Fyi modelXActions will contain all reducers/effects defined on modelX.
  const modelXActions = useModelActions(modelX);

  return (<button onClick={modelXActions.swapValue}>Click here to swap value!</button>);
}
```
