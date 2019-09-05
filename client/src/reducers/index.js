import { combineReducers } from "redux";

import authReducers from "./authReducers";
import errorReducers from "./errorReducers";
import productsReducer from "./productsReducer";

export default combineReducers({
  auth: authReducers,
  errors: errorReducers,
  products: productsReducer,
});