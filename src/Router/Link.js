import React from "react";
import RouterContext from './context'
export default class extends React.Component{
    static contextType = RouterContext
    render() {
        return(
            /*<a href={`#${this.props.to}`}>{this.props.children}</a> 只有hash 这是可以的，*/
            <a onClick={()=>this.context.history.push(this.props.to)}>{this.props.children}</a>
        )
    }
}
