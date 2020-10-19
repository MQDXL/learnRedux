// 返回的是一个普通对象
export function take(actionType) {
    return{
        type:"TAKE",
        actionType
    }
}

export function put(action) {
    return{
        type:'PUT',
        action
    }
}
