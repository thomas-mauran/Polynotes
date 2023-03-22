import { combineReducers } from "redux";
import blockReducer from "./blockReducer";
import authReducer from "./authReducer";

const rootReducer = combineReducers({
  block: blockReducer,
  authReduc: authReducer,
});

export default rootReducer;