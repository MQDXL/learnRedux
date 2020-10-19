import React from "react";
import {connect} from 'react-redux'
import actions from '../store/actions/counter'

class Counter extends React.Component {
    render() {
        return (
            <div>
                <p>{this.props.number}</p>
                <button onClick={this.props.increment}>+</button>
                <button onClick={this.props.async_increment}>async_+</button>
                <button onClick={this.props.decrement}>-</button>
            </div>
        )
    }
}

export default connect(state => state.counter, actions)(Counter)
