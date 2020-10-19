import * as types from '../actionTypes'
import {push} from 'connected-react-router'
export default {
    increment() {
        return {type: types.INCREMENT}
    },
    async_increment() {
        return {type: types.ASYNC_INCREMENT}
    },
    decrement() {
        return {type: types.DECREMENT}
    },
    stop() {
        return {type: types.CANCEL_COUNTER}
    },
    goHome(){
        return push('/'); // push执行会返回一个action,返回之后直接派发出去
    }
}
