import { configureStore } from "@reduxjs/toolkit";

import blockReducer from "./blockReducer"


export default configureStore({
  reducer: {
    block: blockReducer
  }
});
