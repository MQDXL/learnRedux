import * as types from '../actionTypes'
export default {
    increment() {
        return {type: types.INCREMENT}
    },
    async_increment() {
        return {type: types.ASYNC_INCREMENT}
    },
    decrement() {
        return {type: types.DECREMENT}
    }
}
