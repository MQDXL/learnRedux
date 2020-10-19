import React from "react";
import dva, {connect} from 'dva'
import {Router, Route} from "dva/router";
import keyMaster from 'keymaster'
import createLogger from 'redux-logger'


let app = dva({
    onAction:createLogger  //就是 applyMiddleware(createLogger);
});
// model 定义数据模型，相当与combineReducers
/*
* state = {
*   counter1:{
*       number:0
*   },
*   counter2:{
*       number:0
*   }
* }
*
*
* */
const delay = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve();
    }, ms)
})
// 异步怎么做, actionType 在model中写的话，不加命名空间，不然要加命名空间
app.model({
    namespace: 'counter1',
    state: {number: 0},
    // 同步操作
    reducers: {
        // 属性名就是action-typ,值是一个函数，用来计算新的状态
        // store.dispatch({type:'counter1/add'}); 向仓库派发动作，会执行add函数  要加上命名空间
        add(state) {
            return {number: state.number + 1}
        },
        minus(state) {
            return {number: state.number - 1}
        },
        log(state){
            console.log("reducers state log");
            return {number:100}
        }
    },
    // 如果想实现异步操作的话，要使用effects
    effects: {
        * asyncAdd(action, {put, call}) { // asyncAdd actionType
            // effects 中没有delay
            yield call(delay, 1000);
            yield put({type: 'add'});

        },
        // effects reducers 中有相同的action 两者都会派发，reducer中的action 先执行，将状态更新了
        *log(action,{select}){
            // 同过select获取我们state中的数据，可以传递过率函数
            let state = select((state)=>state.counter1);
            //let state = select(); 拿到全部的state状态
            console.log("effects state log");
            return state
        }
    },
    // 可以订阅路由的变化，键盘的输入，websocket的连接
    subscriptions:{
        //
        changeTitle({history}){
            // 监听路由的变化，做出更改
            history.listen((location)=>{
                console.log(location)
                document.title = location.pathname;
            })
        },
        keyboard({dispatch}){
            // 监听空格键
            keyMaster("space",()=>{
                dispatch({type:'add'});

            })

        }
    }
});
app.model({
    namespace: 'counter2',
    state: {number: 0},
    reducers: {
        // 属性名就是action-typ,值是一个函数，用来计算新的状态
        add(state) {
            return {number: state.number + 1}

        },
        minus(state) {
            return {number: state.number - 1}
        }
    }
});

function Counter1(props) {
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={() => props.dispatch({type: 'counter1/add'})}>+</button>
            <button onClick={() => props.dispatch({type: 'counter1/asyncAdd'})}>asyncAdd</button>
            <button onClick={() => props.dispatch({type: 'counter1/log'})}>log</button>
            <button onClick={() => props.dispatch({type: 'counter1/minus'})}>-</button>
        </div>
    )
}

let ConnectedCounter1 = connect((state) => state.counter1)(Counter1);

function Counter2(props) {
    return (
        <div>
            <p>{props.number}</p>
            <button onClick={() => props.dispatch({type: 'counter2/add'})}>+</button>
            <button onClick={() => props.dispatch({type: 'counter2/minus'})}>-</button>
        </div>
    )
}

let ConnectedCounter2 = connect((state) => state.counter2)(Counter2);
// history 可以在app.router 中解构出来
app.router(({history}) => (
    <Router history={history}>
        <>
            <Route path='/counter1' component={ConnectedCounter1}></Route>
            <Route path='/counter2' component={ConnectedCounter2}></Route>
        </>

    </Router>
));
// 渲染到root忠
app.start("#root")
