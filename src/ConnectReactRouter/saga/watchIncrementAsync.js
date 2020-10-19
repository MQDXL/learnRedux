import {takeEvery, takeLatest, put,delay} from "redux-saga/effects";
import * as types from "../store/actionTypes";

////the incrementAsync Saga sleeps for 1 second via the call to delay(1000), then dispatches an INCREMENT action
function* incrementAsync() {
    // yield 一个promise saga会等这个promise完成，
    //当 middleware 取得一个 yield 后的 Promise，middleware 会暂停 Saga，直到 Promise 完成
/*    let msg = yield delay(1000);
    console.log(msg);*/
    //put is one example of what we call an Effect. Effects are plain JavaScript objects which contain instructions to be fulfilled by the middleware.
    //When a middleware retrieves an Effect yielded by a Saga, the Saga is paused until the Effect is fulfilled.
    yield put({type: types.INCREMENT})
}

export default function* watchIncrementAsync() {
    // 监听每一次的ASYNC_INCREMENT，派发ASYNC_INCREMENT时，就会调用另一个worker saga（incrementAsync） 去执行
    //允许并发
    //takeEvery, a helper function , to listen for dispatched INCREMENT_ASYNC actions and run incrementAsync each time.
    yield takeEvery(types.ASYNC_INCREMENT, incrementAsync);
    // 不允许并发
    //If "USER_FETCH_REQUESTED" gets
    //   dispatched while a fetch is already pending, that pending fetch is cancelled
    //   and only the latest one will be run.
    //yield takeLatest(types.ASYNC_INCREMENT, incrementAsync);

}

