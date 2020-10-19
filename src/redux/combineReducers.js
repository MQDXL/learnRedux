import ActionTypes from './utils/actionTypes'
import warning from './utils/warning'
import isPlainObject from './utils/isPlainObject'

function getUndefinedStateErrorMessage(key, action) {
    const actionType = action && action.type
    const actionDescription =
        (actionType && `action "${String(actionType)}"`) || 'an action'

    return (
        `Given ${actionDescription}, reducer "${key}" returned undefined. ` +
        `To ignore an action, you must explicitly return the previous state. ` +
        `If you want this reducer to hold no value, you can return null instead of undefined.`
    )
}

function getUnexpectedStateShapeWarningMessage(
    inputState,
    reducers,
    action,
    unexpectedKeyCache
) {
    const reducerKeys = Object.keys(reducers)
    const argumentName =
        action && action.type === ActionTypes.INIT
            ? 'preloadedState argument passed to createStore'
            : 'previous state received by the reducer'

    if (reducerKeys.length === 0) {
        return (
            'Store does not have a valid reducer. Make sure the argument passed ' +
            'to combineReducers is an object whose values are reducers.'
        )
    }

    if (!isPlainObject(inputState)) {
        return (
            `The ${argumentName} has unexpected type of "` +
            {}.toString.call(inputState).match(/\s([a-z|A-Z]+)/)[1] +
            `". Expected argument to be an object with the following ` +
            `keys: "${reducerKeys.join('", "')}"`
        )
    }

    const unexpectedKeys = Object.keys(inputState).filter(
        key => !reducers.hasOwnProperty(key) && !unexpectedKeyCache[key]
    )

    unexpectedKeys.forEach(key => {
        unexpectedKeyCache[key] = true
    })

    if (action && action.type === ActionTypes.REPLACE) return

    if (unexpectedKeys.length > 0) {
        return (
            `Unexpected ${unexpectedKeys.length > 1 ? 'keys' : 'key'} ` +
            `"${unexpectedKeys.join('", "')}" found in ${argumentName}. ` +
            `Expected to find one of the known reducer keys instead: ` +
            `"${reducerKeys.join('", "')}". Unexpected keys will be ignored.`
        )
    }
}

function assertReducerShape(reducers) {
    Object.keys(reducers).forEach(key => {
        const reducer = reducers[key]
        const initialState = reducer(undefined, {type: ActionTypes.INIT})

        if (typeof initialState === 'undefined') {
            throw new Error(
                `Reducer "${key}" returned undefined during initialization. ` +
                `If the state passed to the reducer is undefined, you must ` +
                `explicitly return the initial state. The initial state may ` +
                `not be undefined. If you don't want to set a value for this reducer, ` +
                `you can use null instead of undefined.`
            )
        }

        if (
            typeof reducer(undefined, {
                type: ActionTypes.PROBE_UNKNOWN_ACTION()
            }) === 'undefined'
        ) {
            throw new Error(
                `Reducer "${key}" returned undefined when probed with a random type. ` +
                `Don't try to handle ${ActionTypes.INIT} or other actions in "redux/*" ` +
                `namespace. They are considered private. Instead, you must return the ` +
                `current state for any unknown actions, unless it is undefined, ` +
                `in which case you must return the initial state, regardless of the ` +
                `action type. The initial state may not be undefined, but can be null.`
            )
        }
    })
}

export default function combineReducers(reducers) {
    debugger;
    const reducerKeys = Object.keys(reducers)
    const finalReducers = {}
    // 就为过滤一下？？
    for (let i = 0; i < reducerKeys.length; i++) {
        const key = reducerKeys[i]

        if (process.env.NODE_ENV !== 'production') {
            if (typeof reducers[key] === 'undefined') {
                warning(`No reducer provided for key "${key}"`)
            }
        }

        if (typeof reducers[key] === 'function') {
            finalReducers[key] = reducers[key]
        }
    }
    const finalReducerKeys = Object.keys(finalReducers)

    // This is used to make sure we don't warn about the same
    // keys multiple times.
    let unexpectedKeyCache
    if (process.env.NODE_ENV !== 'production') {
        unexpectedKeyCache = {}
    }

    let shapeAssertionError
    try {
        // 用来判断你写的reducer 是否符合规范
        assertReducerShape(finalReducers)
    } catch (e) {
        shapeAssertionError = e
    }

    return function combination(state = {}, action) {
        if (shapeAssertionError) {
            throw shapeAssertionError
        }

        if (process.env.NODE_ENV !== 'production') {
            const warningMessage = getUnexpectedStateShapeWarningMessage(
                state,
                finalReducers,
                action,
                unexpectedKeyCache
            )
            if (warningMessage) {
                warning(warningMessage)
            }
        }

        let hasChanged = false
        const nextState = {}
        for (let i = 0; i < finalReducerKeys.length; i++) {
            const key = finalReducerKeys[i]
            const reducer = finalReducers[key]
            // 第一次的时候，createStore 没有初始化，state是{}
            const previousStateForKey = state[key]  // previousStateForKey是undefined, 每一个reducer 的默认值就生效了
            const nextStateForKey = reducer(previousStateForKey, action)   // 初始化的时候typa:ActionTypes.INIT 返回每一个reducer的state
            if (typeof nextStateForKey === 'undefined') {
                const errorMessage = getUndefinedStateErrorMessage(key, action)
                throw new Error(errorMessage)
            }
            nextState[key] = nextStateForKey   // store.getState().counter1 获取counter1的状态
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey
        }
        hasChanged =
            hasChanged || finalReducerKeys.length !== Object.keys(state).length
        return hasChanged ? nextState : state
    }
}
