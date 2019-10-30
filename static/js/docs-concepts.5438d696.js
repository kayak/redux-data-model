(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{"./docs/concepts.mdx":function(e,t,s){"use strict";s.r(t),s.d(t,"default",(function(){return c}));var a=s("./node_modules/babel-preset-react-app/node_modules/@babel/runtime/helpers/esm/objectWithoutProperties.js"),n=(s("./node_modules/react/index.js"),s("./node_modules/@mdx-js/react/dist/index.es.js")),r={},o="wrapper";function c(e){var t=e.components,s=Object(a.a)(e,["components"]);return Object(n.b)(o,Object.assign({},r,s,{components:t,mdxType:"MDXLayout"}),Object(n.b)("h1",{id:"concepts"},"Concepts"),Object(n.b)("p",null,"React-resux has only a few core concepts. Namely ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"#model"}),"models")," and ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"#subscriber"}),"subscribers"),"."),Object(n.b)("h2",{id:"model"},"Model"),Object(n.b)("p",null,"Models are the most basic data structure/abstraction in react-resux. They require a set of options to be provided\nwhen initializing them."),Object(n.b)("h4",{id:"example"},"Example:"),Object(n.b)("pre",null,Object(n.b)("code",Object.assign({parentName:"pre"},{className:"language-javascript"}),"import {Model} from 'react-resux';\nimport _ from 'lodash';\n\nasync function fetchApi(url) {\n  return await fetch(url).then(response => response.json());\n}\n\nexport const userModel = new Model({\n    // Mandatory options\n    namespace: 'users',\n    state: {\n        loading: {},\n        data: {},\n    },\n\n    // Optional options\n    selectors: {\n        loadingByUser: (state, userId) => _.get(state, `loading[${userId}]`, true),\n        userById: (state, userId) => _.get(state, `data[${userId}]`),\n    },\n    reducers: {\n        saveUser(state, {data, userId}) {\n          state.loading[userId] = false;\n          state.data[userId] = data;\n        },\n    },\n    effects: {\n        *fetchUser({userId}, {call, put}, {saveUser}) {\n            try {\n                const data = yield call(fetchApi, `http://jsonplaceholder.typicode.com/users/${userId}`);\n                yield put(saveUser({data, userId}));\n             } catch (error) {\n                console.log(error)\n             }\n        },\n    },\n});\n")),Object(n.b)("p",null,"A model consists of the set of state, selectors, actions, reducers and asynchrounous workflows (i.e. effects) that\nare related to a given entity (e.g.. users). Below you can find a more in depth description on the many options\nthat can be used during a model instantiation."),Object(n.b)("h3",{id:"model-options"},"Model Options"),Object(n.b)("p",null,"An object with a few key-value pairs. Being ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-resux/interfaces/modeloptions.md#namespace"}),"namespace")," and\n",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-resux/interfaces/modeloptions.md#state"}),"state")," mandatory, while\n",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-resux/interfaces/modeloptions.md#optional-selectors"}),"selectors"),",\n",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-resux/interfaces/modeloptions.md#optional-reducers"}),"reducers"),",\n",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-resux/interfaces/modeloptions.md#optional-effects"}),"effects")," are optional. For more info see\n",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-resux/interfaces/modeloptions.md"}),"this"),"."),Object(n.b)("h3",{id:"modelss-api"},"Models's API"),Object(n.b)("p",null,"For more info see ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-resux/classes/model.md"}),"this"),"."),Object(n.b)("h2",{id:"subscriber"},"Subscriber"),Object(n.b)("p",null,"Subscribers provide a way to link models' effects/reducers, so that they get triggered by the same non-namespaced\naction type, on a leading, latest, or every action basis. That is, they provide the means for generating redux sagas\nemploying ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"https://redux-saga.js.org/docs/api/#takeleadingpattern-saga-args"}),"takeLeading"),",\n",Object(n.b)("a",Object.assign({parentName:"p"},{href:"https://redux-saga.js.org/docs/api/#takelatestpattern-saga-args"}),"takeLatest"),", or\n",Object(n.b)("a",Object.assign({parentName:"p"},{href:"https://redux-saga.js.org/docs/api/#takeeverypattern-saga-args"}),"takeEvery")," effect creators. Those models' action\ncreators will be available within the subscriber's effects."),Object(n.b)("h4",{id:"example-1"},"Example:"),Object(n.b)("pre",null,Object(n.b)("code",Object.assign({parentName:"pre"},{className:"language-javascript"}),"import {Subscriber} from 'react-resux';\nimport {userModel} from './models';\n\nexport const pageSubscriber = new Subscriber([userModel]).takeLatest(\n  'fetchPage', [\n    (action, {users}) => users.fetchUser(action),\n  ]\n);\n")),Object(n.b)("h3",{id:"subscribers-api"},"Subscriber's API"),Object(n.b)("p",null,"For more info see ",Object(n.b)("a",Object.assign({parentName:"p"},{href:"/react-resux/classes/subscriber.md"}),"this"),"."))}c&&c===Object(c)&&Object.isExtensible(c)&&Object.defineProperty(c,"__filemeta",{enumerable:!0,configurable:!0,value:{name:"MDXContent",filename:"docs/concepts.mdx"}}),c.isMDXComponent=!0}}]);
//# sourceMappingURL=docs-concepts.6fcde877d4d4ed515707.js.map