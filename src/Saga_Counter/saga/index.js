import {all, put,take} from "redux-saga/effects";
import * as types from "../store/actionTypes";

export default function* watchIncrementAsync() {
    console.log("开始执行sagad的generator!");
    for(let i=0;i<3;i++){
        // take 监听ASYNC_INCREMENT动作，如果有人向仓库派发了ASYNC_INCREMENT，向下继续执行
        const action = yield take(types.ASYNC_INCREMENT)
        console.log(action);
        yield put({type: types.INCREMENT})

    }
}

/*
export default function* rootSaga() {
    yield all([
        watchIncrementAsync()
    ])
}
*/
