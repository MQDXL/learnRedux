import React from "react";
import Link from "../Link";
import Route from "../Route";
import Switch from '../Switch';
import Redirect from "../Redirect";
import UserAdd from "./UserAdd";
import UserList from "./UserList";

export default function () {
    return (
        <div>
            <ul>
                <li>
                    <Link to='/user/list'>用户列表</Link>
                </li>
                <li>
                    <Link to='/user/add'>添加用户</Link>
                </li>
            </ul>
            <div>
                <Switch>
                    <Route path='/user/list' component={UserList}></Route>
                    <Route path='/user/add' component={UserAdd}></Route>
                    <Redirect to='/user/list'></Redirect>
                </Switch>
            </div>
        </div>
    )

}
