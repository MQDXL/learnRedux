import React from "react";
import {connect} from 'react-redux'
import actions from '../store/actions/login'

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.usernameRef = React.createRef();
        this.passwordRef = React.createRef();
        this.login = this.login.bind(this);
        this.logOut = this.logOut.bind(this)
    }

    login() {
        let username = this.usernameRef.current.value;
        let password = this.passwordRef.current.value;
        this.props.login(username,password)
    }

    logOut() {
        this.props.logout()
    }

    render() {
        let loginForm = (
            <>
                <label>username:</label><input ref={this.usernameRef} type="text"/>
                <label>password:</label><input ref={this.passwordRef} type="text"/>
                <button onClick={this.login}>登录</button>
                <button onClick={this.logOut}>退出</button>
            </>
        );
        let logOutForm = (
            <div>
                <label>username:{this.props.token}</label>
                <button onClick={this.logOut}>退出</button>
            </div>
        )
        return (
            <div>
                {this.props.token ? logOutForm : loginForm}
            </div>
        )
    }
}

export default connect(state => state.user, actions)(Login)
