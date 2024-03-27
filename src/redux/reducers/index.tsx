import { combineReducers } from "@reduxjs/toolkit";
4;
import blogReducers from "./blogReducers";

const rootReducer = combineReducers({
  blogList: blogReducers,
});

export default rootReducer;
