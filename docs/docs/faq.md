---
title: FAQ
id: faq
---

## Is using vanilla redux/redux-sagas and react-resux together fine?
Yep, perfectly fine. No problem.

## How does this compare to dva?
[Dva] doesn't have selectors support. Also, [dva] includes [react-router] integration, which we think is out of
scope for a state management abstraction. Its documentation and community is mostly chinese based though.

## Are there similar alternatives to this library?
Besides [dva], there's [kea]. On the [mobx] side of the force there's also [mobx-state-tree].

## I like redux-thunks, redux-observable, redux-pack, or other async middleware. Is it possible to use anything other than redux-saga for effects in models?
No. That said we guarantee [redux-saga] won't disappoint you. If you strongly want to stick to any of those other
async [middlewares], but don't want to give up on react-resux, consider using react-resux without effects.

[dva]: https://github.com/dvajs/dva
[kea]: https://github.com/keajs/kea
[react-router]: https://github.com/ReactTraining/react-router
[mobx]: https://github.com/mobxjs/mobx
[mobx-state-tree]: https://github.com/mobxjs/mobx-state-tree
[redux-saga]: https://redux-saga.js.org/
[middlewares]: https://redux.js.org/advanced/middleware
