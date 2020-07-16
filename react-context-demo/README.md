# context 封装 redux + react-redux

redux

- store(dispatch,getState,subscribe)
- createStore(reducer,initState,enhancer)
- applyMiddleware(createStore,compose)
- bindActionCreators
- combineReducers

react-redux

- context
- provider
- connect

diy-react-redux

- Context API

useContext 返回的对象中提供了一个 Provider，替代 React-Redux 的 provider。
子组件中使用 useContext，可以直接获取到 Store 中的数据，不需要 Conenct 方法进行注入。

- useReducer Hooks

useReducer 提供了一个套通过 Reducer 规则改变 State 的处理逻辑，可以替代 Redux 中的 Reducer。
useReducer 还提供了 Dispatch 方法，替代 Redux Store 中的 Dispatch。
当调用 Dispatch 更新 Store 时，Provider 中的 Value 就会相应改变，从而触发 Provider 子组件更新，替代了 Redux 中的 Subscribe 事件监听。

- 封装 dispatch

redux 提供 redux-thunk，redux-saga 等中间件来处理异步，我们使用封装的 dipatch 函数来处理 promise 的 action 实现异步请求
