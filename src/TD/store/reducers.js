import {CHANGE_INPUT, ADD_ITEM, DELETE_ITEM} from './actionTypes'

// 管理状态的
let defaultState = {
    inputValue: 'write something',
    data: [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
    ]
}
//action 就是store.dispatch（）的参数，reducers中不能修改state
export default function (state = defaultState, action) {
    if (action.type === CHANGE_INPUT) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.inputValue = action.value;
        return newState
    }
    if (action.type === DELETE_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.data.splice(action.index, 1)
        return newState;

    }
    if (action.type === ADD_ITEM) {
        let newState = JSON.parse(JSON.stringify(state))
        newState.data.push(newState.inputValue)
        newState.inputValue = ''
        return newState;

    }
    return state
}
