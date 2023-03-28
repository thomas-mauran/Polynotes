import { combineReducers } from "redux";
import pageReducer from "./pageReducer";

const rootReducer = combineReducers({
  pageReduc: pageReducer,
});

export default rootReducer;
