import { combineReducers } from "redux";
import visibilityFilter from "./visibilityFilter";
import todos from "./todos";

// 一个store 对应一个reducer,我们按模块写的 reducers 必须合并成一个
// 如果多个模块都管理了名 为 commonName 的状态，合并的时候不会冲突， store将这个多个状态分开管理
/*
* 一个reducer
* state = {
*   m:0,
*   n:1
* }
* 合并后：
* state = {
*   todos:{
*      m:0,
*      n:0
*   },
*   visibilityFilter:{
*      m:0,
*      n:0
*   }
*
* }
* store.getState()拿到state对象
*
*
* */
export default combineReducers({ todos, visibilityFilter });
