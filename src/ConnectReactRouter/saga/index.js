import {all,take,select} from "redux-saga/effects";
import helloSaga from './helloSaga'
import watchIncrementAsync from './watchIncrementAsync'
import login from "./login";
import race from "./race";
import reace_delete from "./reace_delete";

//This Saga yields an array with the results of calling our two sagas, helloSaga and watchIncrementAsync.

function * watchAndLog() {
    while (true){
        let action  = yield take("*")
        console.log('action:',action);
        // select 查询并分会状态 ,过滤函数可有可无
        let state = yield select((state)=>state.counter);
        console.log("state:",state);

    }
}

export default function* rootSaga() {
    // all返回一个数组包含  这两个sage的执行结果
    yield all([
        // 这两个执行过的Generators的返回值, 将并行执行
        helloSaga(),
        watchIncrementAsync(),
        login(),
        race(),
        reace_delete()
    ])
    // 会在all里的函数都执行完之后执行next，我们在 watchAndLog 有死循环，所以next 不会被打印
    console.log('next');
}
