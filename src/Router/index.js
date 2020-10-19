import React from "react";
import Home from './components/Home'
import User from './components/User'
import Profile from './components/Profile'
import Router from './HashRouter'
import Route from './Route'
import Link from "./Link";
export default function () {
    return (
        <Router>
            <>
                <ul>
                    <li>
                        <Link to={{pathname:'/',state:{title:'Home'}}}>Home</Link>
                    </li>
                    <li>
                        <Link to='/user'>User</Link>
                    </li>
                    <li>
                        <Link to='/profile'>Profile</Link>
                    </li>
                </ul>
                <Route path='/' component={Home} exact ></Route>
                <Route path='/user' component={User}></Route>
                <Route path='/profile' component={Profile}></Route>
            </>
        </Router>
    )

}
