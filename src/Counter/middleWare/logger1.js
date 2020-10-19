function logger({ getState }) {
    return next => action => {
        console.log('老状态1', getState())
        console.log('logger1_next:',next);
        // Call the next dispatch method in the middleware chain.
        // 这个next 是logger2传过来的，
        // 即logger2 (action)=>{
        //          console.log('老状态2', getState())
        //         const returnValue = next(action)
        //         console.log('新状态2', getState())
        //         return returnValue
        // }
        const returnValue = next(action)

        console.log('新状态1', getState())


        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}
export default logger
