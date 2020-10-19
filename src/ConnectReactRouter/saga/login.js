import {call,put,take,fork,cancel,cancelled} from 'redux-saga/effects'
import * as types from '../store/actionTypes'
import Api from '../Api'
function * login(username,password) {
    try {
       Api.setItem("loading",'true')
        const token = yield call(Api.login,username,password)
        Api.setItem("loading",'false')
        yield put({type:types.LOGIN_SUCCESS,payload:{token}})

    }catch (e) {
        alert(e)
        yield put({type:types.LOGIN_ERROR,error:e})
        Api.setItem("loading",'false')

    }finally {
        // generator 是否被取消
        if(yield cancelled()){
            Api.setItem("loading",'false')
        }
    }
}
export default function *() {
    while (true){
        let {payload:{username,password}} = yield take(types.LOGIN)
        const task = yield fork(login,username,password)

        const action = yield take(types.LOGOUT)
        if(action.type === types.LOGOUT){
            yield cancel(task)
        }
        yield put({type:types.LOGOUT_SUCCESS})

    }
}
