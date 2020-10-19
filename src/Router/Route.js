import React from "react";
/*拿到context传下来的 地址栏里的路径，跟 当前组件的path 进行匹配*/
import RouterContext from './context'
import {pathToRegexp} from 'path-to-regexp'

export default class Route extends React.Component {
    // 这一步必不可少，去取出context
    static contextType = RouterContext;

    render() {
        let {pathname} = this.context.location;
        let {path = '/', component: Component, exact = false} = this.props;
        let paramNames = [];
        let regExp = pathToRegexp(path, paramNames, {end: exact});
        let result = pathname.match(regExp)
        let props = {
            location: this.context.location,
            history: this.context.history
        }
        if (result) {
            paramNames = paramNames.map(item => item.name)
            let [url, ...values] = result;
            let params = {};
            for (let i = 0; i < paramNames.length; i++) {
                params[paramNames[i]] = values[i];
            }
            props.match = {
                params,
                path,
                url,
                isExact: url === pathname
            }
            return <Component {...props}/>
        }
        return null
    }
}
