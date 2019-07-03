// 把一个由多个不同 reducer 函数作为 value 的 object，合并成一个最终的 reducer 函数，然后就可以对这个 reducer 调用 createStore。(重构)
import { combineReducers } from "redux";
import account from "./account";
import baseLayout from "./baseLayout";

const reducers = combineReducers({ account, baseLayout });

export default reducers;
