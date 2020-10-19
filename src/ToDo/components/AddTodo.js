import React from "react";
import {connect} from "react-redux";
import {addTodo} from "../redux/actions";

class AddTodo extends React.Component {
    constructor(props) {
        super(props);
        this.state = {input: ""};
    }

    updateInput = input => {
        this.setState({input});
    };

    handleAddTodo = () => {
        this.props.addTodo(this.state.input);
        this.setState({input: ""});
    };

    render() {
        return (
            <div>
                <input
                    onChange={e => this.updateInput(e.target.value)}
                    value={this.state.input}
                />
                <button className="add-todo" onClick={this.handleAddTodo}>
                    Add Todo
                </button>
            </div>
        );
    }
}

// mapDispatchToProps 将 action 作为 props 绑定到 MyComp 上。
export default connect(
    null,
    {addTodo} //它定义了哪些用户的操作应该当作 Action，传给 Store
)(AddTodo);
// export default AddTodo;
