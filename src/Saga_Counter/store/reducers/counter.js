import * as types from '../actionTypes'

export default (state = {number: 0}, action) => {
    switch (action.type) {
        case types.INCREMENT:
            return {number: state.number + 1};
        case types.DECREMENT:
            return {number: state.number - 1};
        default:
            return state;

    }
}
