import { combineReducers } from "redux";
import pageReducer from "./pageReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  pageReduc: pageReducer,
  authReduc: authReducer,
});

export default rootReducer;
