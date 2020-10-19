import reducers from "./reducers";
import {createStore, applyMiddleware, compose} from 'redux'
import thunk from 'redux-thunk';

// 将管理状态的reducers 传入创建的store
// store 必须是唯一的，只要store能改变自己的数据 reducers 必须是函数
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
// thunk __REDUX_DEVTOOLS_EXTENSION_COMPOSE__ 都是中间件，但是createStore只接受两个参数，不能传第三个参数做中间件，所以写了一个增强函数
export default createStore(reducers,
    composeEnhancers
)
