import ActionTypes from './utils/actionTypes'
import isPlainObject from './utils/isPlainObject'
/*
* createStore(reducer, [preloadedState], [enhancer])
*enhancer:是一个函数
* reducer:是一个函数
* 返回了一个对象包含一下方法：
*       dispatch,
        subscribe,
        getState,
        replaceReducer
* */
export default function createStore(reducer, preloadedState, enhancer) {
    if (
        (typeof preloadedState === 'function' && typeof enhancer === 'function') ||
        (typeof enhancer === 'function' && typeof arguments[3] === 'function')
    ) {
        throw new Error(
            'It looks like you are passing several store enhancers to ' +
            'createStore(). This is not supported. Instead, compose them ' +
            'together to a single function.'
        )
    }
    // 第二个参数是function
    if (typeof preloadedState === 'function' && typeof enhancer === 'undefined') {
        enhancer = preloadedState
        preloadedState = undefined
    }

    if (typeof enhancer !== 'undefined') {
        if (typeof enhancer !== 'function') {
            throw new Error('Expected the enhancer to be a function.')
        }
        /*
        * const store = createStore(
            reducer,
            applyMiddleware(...middleware)
        )
        * store = applyMiddleWare(logger)(createStore)(reducer, preloadedState)
        * */
        return enhancer(createStore)(reducer, preloadedState)
    }

    if (typeof reducer !== 'function') {
        throw new Error('Expected the reducer to be a function.')
    }

    let currentReducer = reducer
    // preloadedState 定义的是整个store的初始值,大型项目中一般不传
    let currentState = preloadedState
    let currentListeners = []
    let nextListeners = currentListeners
    let isDispatching = false

    /*
    *  The goal here is to ensure that the listeners that are used by dispatch are a point in time, for when the dispatch started.
    * nextListeners === currentListeners 相等的时候clone 一份，why?
    * 当我们再修改nextSubscriptions(subscribe,unsubscribe) 的时候,不会影响 正在执行的dispatch，
    * */
    function ensureCanMutateNextListeners() {
        if (nextListeners === currentListeners) {
            nextListeners = currentListeners.slice()
        }
    }

    function getState() {
        if (isDispatching) {
            throw new Error(
                'You may not call store.getState() while the reducer is executing. ' +
                'The reducer has already received the state as an argument. ' +
                'Pass it down from the top reducer instead of reading it from the store.'
            )
        }

        return currentState
    }

    function subscribe(listener) {
        if (typeof listener !== 'function') {
            throw new Error('Expected the listener to be a function.')
        }

        if (isDispatching) {
            throw new Error(
                'You may not call store.subscribe() while the reducer is executing. ' +
                'If you would like to be notified after the store has been updated, subscribe from a ' +
                'component and invoke store.getState() in the callback to access the latest state. ' +
                'See https://redux.js.org/api-reference/store#subscribelistener for more details.'
            )
        }

        let isSubscribed = true
        // 第一次调用subscribe，nextListeners currentListeners相等，且都为空数组
        ensureCanMutateNextListeners()
        nextListeners.push(listener)

        return function unsubscribe() {
            if (!isSubscribed) {
                return
            }

            if (isDispatching) {
                throw new Error(
                    'You may not unsubscribe from a store listener while the reducer is executing. ' +
                    'See https://redux.js.org/api-reference/store#subscribelistener for more details.'
                )
            }

            isSubscribed = false
            // 调用unsubscribe 前调用了dispatch  current 与 next 是相等的，
            // unsubscribe 前没有调用dispatch current 与 next 是不相等的
            ensureCanMutateNextListeners()
            const index = nextListeners.indexOf(listener)
            nextListeners.splice(index, 1)
            currentListeners = null
        }
    }

    // dispatch() 用的是currentListeners
    function dispatch(action) {
        if (!isPlainObject(action)) {
            throw new Error(
                'Actions must be plain objects. ' +
                'Use custom middleware for async actions.'
            )
        }

        if (typeof action.type === 'undefined') {
            throw new Error(
                'Actions may not have an undefined "type" property. ' +
                'Have you misspelled a constant?'
            )
        }

        if (isDispatching) {
            throw new Error('Reducers may not dispatch actions.')
        }

        try {
            isDispatching = true
            // reducer 中的switch 中有一个default ,type: ActionTypes.INIT,我们不会定义，返回createStore 传入的state初始值
            currentState = currentReducer(currentState, action)
        } finally {
            isDispatching = false
        }
        const listeners = (currentListeners = nextListeners)
        for (let i = 0; i < listeners.length; i++) {
            const listener = listeners[i]
            listener()
        }

        return action
    }

    // 去拿传入的Reducer的 default 的state
    function replaceReducer(nextReducer) {
        if (typeof nextReducer !== 'function') {
            throw new Error('Expected the nextReducer to be a function.')
        }

        currentReducer = nextReducer;

        // This action has a similiar effect to ActionTypes.INIT.
        // Any reducers that existed in both the new and old rootReducer
        // will receive the previous state. This effectively populates
        // the new state tree with any relevant data from the old one.
        // 所有的reducer switch-case都没有定义ActionTypes.REPLACE 这个类型，所以直接执行 default,返回这个reducer保存的state
        dispatch({type: ActionTypes.REPLACE})
    }

    // When a store is created, an "INIT" action is dispatched so that every
    // reducer returns their initial state. This effectively populates
    // the initial state tree.
    // populates 赋值给
    // 所有的reducer switch-case都没有定义ActionTypes.INIT 这个类型，所以直接执行 default,返回这个reducer初始值
    // reducer 定义本模块的初始值，
    dispatch({type: ActionTypes.INIT})

    return {
        dispatch,
        subscribe,
        getState,
        replaceReducer
    }
}
