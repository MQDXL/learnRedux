import React from "react";
import Counter from "./components/Counter";
import {Provider} from 'react-redux'
import store from "./store";
export default class extends React.Component{
    render() {
        return(
            <Provider store={store}>
                <Counter></Counter>
            </Provider>
        )
    }

}
