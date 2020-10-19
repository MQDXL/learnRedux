import * as types from '../actionTypes'
export default {
    login(username,password) {
        return {type: types.LOGIN,payload:{username,password}}
    },
    logout(){
        return{
            type:types.LOGOUT
        }
    }

}
