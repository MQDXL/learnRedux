import React from "react";
export default class NameForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value:''
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);

    }
    handleSubmit(event){
        event.preventDefault();

    }
    handleChange(event){
        this.setState({
            value:event.target.value
        })

    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <label>
                    名字:
                    <input type="text" value={this.state.value} onChange={this.handleChange}/>
                </label>
                <input type="submit" value='提交'/>
            </form>
        )
    }

}
