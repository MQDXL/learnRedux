import {createStore, applyMiddleware} from 'redux'
import {routerMiddleware} from 'connected-react-router'
import history from "../history";
import reducers from "./reducers/index";
import createSagaMiddleware from 'redux-saga'
import rootSaga from '../saga'
let sagaMiddleware = createSagaMiddleware();
let store = createStore(reducers,applyMiddleware(sagaMiddleware,routerMiddleware(history)));
// sagaMiddleware是一个执行器，可以启动执行 generator 只能有一个run方法
sagaMiddleware.run(rootSaga)
window.store = store;  // 为了方便调试
export default store
