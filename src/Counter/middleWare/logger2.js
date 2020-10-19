function logger({ getState }) {
    return next => action => {
        console.log('老状态2', getState())


        // Call the next dispatch method in the middleware chain.
        const returnValue = next(action) // 这个next 是store.dispatch

        console.log('新状态2', getState())


        // This will likely be the action itself, unless
        // a middleware further in chain changed it.
        return returnValue
    }
}
export default logger
