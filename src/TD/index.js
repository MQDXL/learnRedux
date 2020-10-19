import React from "react";
import TodoListUI from "./TodoListUI";
import store from './store/index';
import {changeInputAction, addItem, deleteItem} from './store/actionCreators'

export default class TodoList extends React.Component {
    constructor(props) {
        super(props);
        this.state = store.getState()
        this.changeInputValue = this.changeInputValue.bind(this)
        this.storeChange = this.storeChange.bind(this)
        this.clickBtn = this.clickBtn.bind(this)
        this.deleteItem = this.deleteItem.bind(this)


        // store 中的数据通过reduces进行了改变，我们需要触发订阅，来更新UI
        store.subscribe(this.storeChange)
    }

    deleteItem(index) {
        store.dispatch(deleteItem(index))
    }

    clickBtn() {
        store.dispatch(addItem());
    }

    storeChange() {
        // 获取到store里的状态，并设置给this.state
        this.setState(store.getState())
    }

    changeInputValue(e) {
        // store 就接受到你想要的行为了
        store.dispatch(changeInputAction(e.target.value))
    }

    render() {
        return (
            <TodoListUI inputValue={this.state.inputValue} changeInputValue={this.changeInputValue}
                        clickBtn={this.clickBtn} deleteItem={this.deleteItem} data={this.state.data}></TodoListUI>
        )
    }
}
