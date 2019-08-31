import { combineReducers } from "redux";
import authReducer from "./authReducers";
import errorReducer from "./errorReducers";
import authReducers from "./authReducers";
import errorReducers from "./errorReducers";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers
});