import React from 'react'

function UserGreeting(props) {
    return (<h1>Welcome Back!</h1>)
}

function GuestGreeting(props) {
    return <h1>Please sign in !</h1>
}

function LogginControl(props) {
    console.log('prop:', props);
    const isLoggedIn = props.isLoggedIn;
    if (isLoggedIn) {
        return <UserGreeting></UserGreeting>
    } else {
        return <GuestGreeting/>
    }
}

function LoginButton(props) {
    return (
        <button onClick={props.onClick}>
            Login
        </button>
    );
}

function LogoutButton(props) {
    return (
        <button onClick={props.onClick}>
            Logout
        </button>
    );
}

export default class LoginControl extends React.Component {
    constructor(props) {
        super(props);
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleLogoutClick = this.handleLogoutClick.bind(this);
        this.state = {isLoggedIn: false}
    }

    handleLoginClick() {
        this.setState({isLoggedIn: true})
    }

    handleLogoutClick() {
        this.setState({isLoggedIn: false})
    }

    render() {
        let button = this.state.isLoggedIn ? <LogoutButton onClick={this.handleLogoutClick}/> :
            <LoginButton onClick={this.handleLoginClick}/>
        /* 向子组件传递函数*/
        return (
            <div>
                <LogginControl isLoggedIn={this.state.isLoggedIn}/>
                {button}
            </div>
        )
    }
}
