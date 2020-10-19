import React from "react";
import ReactDOM from 'react-dom';
import './index.css';

/*import './dvaCounter/index'*/
/*

函数组件
function Welcome(props) {
    return(
        <h1 id={props.id}>
            <span>hello</span>
            <span>world</span>
        </h1>
    )
}

*/
class Welcome extends React.Component{
    constructor(props) {
        super(props);
    }
    render() {
        return(
            <h1 id={this.props.id}>
                <span>hello</span>
                <span>world</span>
            </h1>
        )
    }
}
let element = React.createElement(Welcome,{id:'title'});
const rootElement =  document.getElementById('root');
/*
* 属性：父组件传过来的，自己不能控制，只读
* 状态：自己内部产生，自己维护，唯一改变状态setState
*
* */
class Counter extends  React.Component{
    /*
    * or 定义在了this上
    * state = {
    *   number:0
    * }
    * */
    constructor(props) {
        super(props);
        this.state = {number:0} //
    }
    render() {
        // 调用setState，会引起状态的改变和组件的刷新
        console.log('render');
        return(
            <div>
                <p>{this.state.number}</p>
                {/*每次调用函数，改变number状态，重新执行render，刷新页面*/}
                <button onClick={()=>this.setState({number:this.state.number+1})}>+</button>
            </div>
        )
    }
}



ReactDOM.render(
    <Counter></Counter>
 ,
    rootElement
);
