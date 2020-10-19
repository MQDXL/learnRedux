import React from "react";
import Home from "./components/Home";
import Counter from "./components/Counter";
import {Route,Link} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from "./store";
import history from "./history";
import { ConnectedRouter } from 'connected-react-router'
import Login from './components/Login'
export default class extends React.Component{
    render() {
        return(
            <Provider store={store}>
                <ConnectedRouter history={history}>
                    <>
                        <ul>
                            <li>
                                <Link to='/' >Home</Link>
                            </li>
                            <li>
                                <Link to='/counter'>counter</Link>
                            </li>
                            <li>
                                <Link to='/login'>login</Link>
                            </li>
                        </ul>
                        <Route path='/' component={Home} exact={true}></Route>
                        <Route path='/counter' component={Counter}></Route>
                        <Route path='/login' component={Login}></Route>
                    </>
                </ConnectedRouter>
            </Provider>
        )
    }

}
