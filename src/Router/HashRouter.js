import React from "react";
import Context from './context'

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            location: {
                pathname: window.location.hash.slice(1),
                state: null
            }
        }
        this.locationState = null;
    }

    componentDidMount() {
        window.location.hash = window.location.hash || '/'; // 第一次进来可能没有hash，给一个默认值
        window.addEventListener('hashchange', () => {
            this.setState({
                location: {
                    ...this.state.location,
                    state: this.locationState,
                    pathname: window.location.hash.slice(1)
                }
            })
        })
    }

    render() {  // 不要再render 中写 setState()方法
        let that = this;
        let value = {
            location: this.state.location,
            history: {
                push(to) {
                    if(typeof to === 'object'){
                        let {pathname, state} = to;
                        that.locationState = state;
                        window.location.hash = pathname;
                    }else {
                        that.locationState = null;
                        window.location.hash = to;

                    }

                }
            }
        }
        return (
            /*Context.Provider 可以想子组件向下传递值*/
            <Context.Provider value={value}>
                {/*渲染子组件*/}
                {this.props.children}
            </Context.Provider>
        )
    }
}
