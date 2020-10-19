import React from "react";
import {BrowserRouter as Router, Switch, Route, Link, useRouteMatch, useParams} from 'react-router-dom'

export default function () {
    return (
        <Router>
            <div>
                <nav>
                    <ul>
                        <li><Link to='/'>Home</Link></li>
                        <li><Link to='/about'>About</Link></li>
                        <li><Link to='/users'>Users</Link></li>
                        <li><Link to='/topics'>topics</Link></li>
                    </ul>
                </nav>
                {/*  // 渲染第一个匹配到的URL 路径*/}
                <Switch>
                    <Route path='/about' children={<About/>}></Route>
                    <Route path="/topics" children={<Topics/>}></Route>
                    <Route path='/users' children={<Users/>}></Route>
                    {/* 要写在最后一个  */}
                    <Route path='/' children={<Home/>}></Route>
                </Switch>
            </div>
        </Router>
    )
}

function About() {
    return <h2>About</h2>
}

function Home() {
    return <h2>HOME</h2>
}

function Users() {
    return <h2>Users</h2>
}

function Topics() {
    let match = useRouteMatch();
    console.log('useRouteMatch', match);
    return (
        <div>
            <h2>Topics</h2>
            <ul>
                <li>
                    <Link to={`${match.url}/components`}>components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/wanglu`}>wanglu</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>
            <Switch>
                <Route path={`${match.path}/:topicId`}>
                    <Topic/>
                </Route>
                {/*默认显示的子页面*/}
                <Route path={match.path}>
                    <h3>Please select a topic.</h3>
                </Route>
            </Switch>
        </div>
    )
}

function Topic() {
    let match = useRouteMatch();
    console.log('Topic_match:', match);
    let params = useParams();
    console.log('params:', params);
    return <h3>Requested topic ID: {params.topicId}</h3>;
}
