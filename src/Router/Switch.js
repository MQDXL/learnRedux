import React from "react";
import RouterContext from './context'
import {pathToRegexp} from 'path-to-regexp'

export default class extends React.Component {
    static contextType = RouterContext
    render() {
        let {pathname} = this.context.location; // 当前地址栏中的路径
        let children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
        for (let i = 0; i < children.length; i++) {
            let child = children[i];
            let {path = '/', exact = false} = child.props;
            let paramNames = [];
            let regExp = pathToRegexp(path, paramNames, {end: false})
            let result = pathname.match(regExp);
            if(result){
               return child
            }
        }
        return null;
    }
}
