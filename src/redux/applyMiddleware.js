import compose from './compose'

export default function applyMiddleware(...middlewares) {
    return createStore => (...args) => { //...args = reducer initState 等
        const store = createStore(...args)
        let dispatch = () => {
            throw new Error(
                'Dispatching while constructing your middleware is not allowed. ' +
                'Other middleware would not be applied to this dispatch.'
            )
        }

        const middlewareAPI = {
            getState: store.getState,
            dispatch: (...args) => dispatch(...args)
        }
        // chain 一个数组
        const chain = middlewares.map(middleware => middleware(middlewareAPI))
        dispatch = compose(...chain)(store.dispatch)
        console.log('dispatch:________',dispatch);

        return {
            ...store,
            dispatch
        }
    }
}
