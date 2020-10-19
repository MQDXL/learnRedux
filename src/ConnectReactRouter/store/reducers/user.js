import * as types from '../actionTypes'

export default (state = {}, action) => {
    switch (action.type) {
        case types.LOGIN_SUCCESS:
            return {token:action.payload.token};
        case types.LOGOUT_SUCCESS:
            return {};
        default:
            return state;

    }
}
