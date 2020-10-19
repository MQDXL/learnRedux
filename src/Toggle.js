import React from 'react';
class Toggle extends React.Component {
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true}
        // 在handleClick中使用this，此行必须
        this.handleClick = this.handleClick.bind(this)
    }

    handleClick() {  // 一定要注意this是否被绑定
        this.setState((state, props) => {  // state 可能是异步跟新的，props 是only-read
            return {
                isToggleOn: !state.isToggleOn
            }
        })
    }
    render() {
        return (
            <button onClick={this.handleClick}>{this.state.isToggleOn ? 'On' : 'Off'}</button>
        )
    }
}
export default Toggle;
