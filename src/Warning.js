import React from "react";

/*
Returning null from a component’s render method does not affect the firing of the component’s lifecycle methods
用来显示隐藏
*
* */
function WarningBanner(props) {
    if (!props.warn) {
        return null;
    }
    return (
        <div className='warning'>
            Warning!
        </div>
    )
}

export default class extends React.Component {
    constructor(props) {
        super(props);
        this.state = {showWarning: true};
        this.handleToggleClick = this.handleToggleClick.bind(this)
    }

    handleToggleClick() {
        this.setState((state, prop) => ({
            showWarning: !state.showWarning
        }))
    }

    render() {
        return (
            <div>
                <WarningBanner warn={this.state.showWarning}></WarningBanner>
                <button onClick={this.handleToggleClick}>{this.state.showWarning ? 'Hide' : "Show"}</button>
            </div>
        )
    }
}
