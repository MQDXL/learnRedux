import React from "react";
import { connect } from "react-redux";
import Todo from "./Todo";
// import { getTodos } from "../redux/selectors";
import { getTodosByVisibilityFilter } from "../redux/selectors";
import { VISIBILITY_FILTERS } from "../constants";

const TodoList = ({ todos }) => ( // {todos} <===> let {todos}  = props  props 的值来自于mapStateToProps的返回值
    <ul className="todo-list">
        {todos && todos.length
            ? todos.map((todo, index) => {
                return <Todo key={`todo-${todo.id}`} todo={todo} />;
            })
            : "No todos, yay!"}
    </ul>
);

// const mapStateToProps = state => {
//   const { byIds, allIds } = state.todos || {};
//   const todos =
//     allIds && state.todos.allIds.length
//       ? allIds.map(id => (byIds ? { ...byIds[id], id } : null))
//       : null;
//   return { todos };
// };
//mapStateToProps允许我们将 store 中的数据作为 props 绑定到组件上。
const mapStateToProps = state => {
    const { visibilityFilter } = state;
    const todos = getTodosByVisibilityFilter(state, visibilityFilter);
    return { todos };
    //   const allTodos = getTodos(state);
    //   return {
    //     todos:
    //       visibilityFilter === VISIBILITY_FILTERS.ALL
    //         ? allTodos
    //         : visibilityFilter === VISIBILITY_FILTERS.COMPLETED
    //           ? allTodos.filter(todo => todo.completed)
    //           : allTodos.filter(todo => !todo.completed)
    //   };
};
// connect 用来连接store，mapStateToProps用来将拿到的store的数据，转换成props数据，TodoList是一个UI组件，所要的数据去props上读取，
export default connect(mapStateToProps)(TodoList);
