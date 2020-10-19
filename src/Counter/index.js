import React from 'react';
import {createStore, applyMiddleware} from '../redux'
import reducers from "./reducers";
import logger1 from './middleWare/logger1'
import logger2 from './middleWare/logger2'
let enhancer = applyMiddleware(logger1,logger2);
let store = createStore(reducers,enhancer);
export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            number1: store.getState().counter1,
            number2: store.getState().counter2,
        }
    }

    componentDidMount() {
        this.unSubscribe1 = store.subscribe(() => {
            this.setState({number1: store.getState().counter1})
        })
        this.unSubscribe2 = store.subscribe(() => {
            this.setState({number2: store.getState().counter2})
        })
    }

    componentWillUnmount() {
        this.unSubscribe1();
        this.unSubscribe2();
    }

    render() {
        return (
            <div>
                <div>
                    <p>{this.state.number1}</p>
                    <button onClick={() => {
                        store.dispatch({type: 'INCREMENT1'})
                    }}>+
                    </button>
                    <button onClick={() => {
                        store.dispatch({type: 'DECREMENT1'})
                    }}>-
                    </button>
                </div>
                <div>
                    <p>{this.state.number2}</p>
                    <button onClick={() => {
                        store.dispatch({type: 'INCREMENT2'})
                    }}>+
                    </button>
                    <button onClick={() => {
                        store.dispatch({type: 'DECREMENT2'})
                    }}>-
                    </button>
                </div>
            </div>
        )
    }
}
