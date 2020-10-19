import {call, put, take, fork, cancel, cancelled, all, race} from 'redux-saga/effects'

const delay = ms => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(ms)
    }, ms)
})
export default function* () {
    // race 自动取消失败的effects
    const {a, b} = yield race({
        a: call(delay, 1000),
        b: call(delay, 2000)
    })
    console.log("a", a)
    console.log("b", b)
}
