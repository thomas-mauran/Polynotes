import { configureStore } from "@reduxjs/toolkit";
import pageReducer from "./reducers/pageReducer";

const store = configureStore({
  reducer: {
    pageReduc: pageReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
