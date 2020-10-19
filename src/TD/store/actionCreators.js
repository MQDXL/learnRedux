import {CHANGE_INPUT, ADD_ITEM, DELETE_ITEM} from './actionTypes'

export const changeInputAction = (value) => {
    return{
        type: CHANGE_INPUT,
            value
    }
}
export const addItem = (value) => {
    return{
        type: ADD_ITEM
    }
}
export const deleteItem = (index) => {
    return{
        type: DELETE_ITEM,
        index
    }
}
