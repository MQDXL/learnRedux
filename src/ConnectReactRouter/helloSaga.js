import {all, takeEvery, put} from 'redux-saga/effects'
import * as types from './store/actionTypes'

export function* helloSaga() {
    console.log(1111111);
}
function delay(ms) {
    return new Promise(function (resolve,reject) {
        setTimeout(function () {
            resolve("oooook__")
        },ms)
    })
}
function* incrementAsync() {
    console.log('incrementAsync');
    // yield 一个promise saga会等这个promise完成，

    let msg = yield delay(1000);
    console.log(msg);
    //yield put({type: types.ASYNC_INCREMENT})
}

export function* watchIncrementAsync() {
    // 监听每一次的ASYNC_INCREMENT，派发ASYNC_INCREMENT时，就会调用另一个worker saga 去执行
    yield takeEvery(types.ASYNC_INCREMENT, incrementAsync);
}

/*
* saga分三种：
* 1、rootSaga 入口，用来组织和调用别的saga 的（generator）
* 2、监听saga 监听向仓库派发的动作，如果监听到某些动作，通知worker去执行
* 3、worker saga 真正干活的
*
* */
export default function* rootSaga() {
    yield all([
        helloSaga(),
        watchIncrementAsync()
    ])
    // 会在all里的函数都执行完之后执行next
    console.log('next');
}
