import {call,put,take,fork,cancel,cancelled,all,race} from 'redux-saga/effects'
import * as types from '../store/actionTypes'
const delay = ms=>new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(ms)
    },ms)
})
function * start (){
    while (true){
        yield call(delay,1000);
        yield put({type:types.INCREMENT})
    }
}
export default function *() {
     yield race({
       start:call(start),
         //如果监听到CANCEL_COUNTER ，表示任务完成，如果有一个任务完成，就表示race完成了，会取消其他的任务
       stop:take(types.CANCEL_COUNTER)
    })
}
