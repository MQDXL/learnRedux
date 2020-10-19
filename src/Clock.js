import React from 'react'

class Clock extends React.Component {
    constructor(props) {
        super(props); // 必须这样调用
        this.state = {date: new Date()}// 构造函数是唯一可以给 this.state 直接赋值的地方：

    }
    //  after the component output has been rendered to the DOM 组件被挂在到DOM后执行
    componentDidMount() {
        // 随便在this 上挂载数据，只要其不参数数据流
        this.timerID = setInterval(()=>{
            this.tick()
        },1000)
    }

    componentWillUnmount() {
        clearInterval(this.timerID);
    }
    tick(){
        // 这样来改变状态
       this.setState({
           date: new Date()
       })
    }
    render() {
        return (
            <div>
                <h1>Hello, world!</h1>
                <h2>It is {this.state.date.toLocaleString()}</h2>
            </div>
        )
    }
}
export default Clock
/*
* 1、<Clock /> 传给 React.render(),React 调用 Clock组件的constructor,初始化this.state,
* 2、React then 调用 Clock的render(), 这使React知道在屏幕上渲染什么，React随后根据Clock的输出更新DOM
* 3、当Clock's output 插入到DOM,React 调用componentDidMount，要求浏览器设置一个 timer 去调用 组件的 tick
* 4、每秒调用一次tick
*
*
*
* */
