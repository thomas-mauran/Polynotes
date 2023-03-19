import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import { StateType } from "../../types/AuthTypes";
import { setAutoFreeze } from "immer";

const initialState: StateType = {
  username: null,
  email: null,
  jwt: null,
  isAuthenticated: false,
};

// setAutoFreeze(false);

const authReducer = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      state.username = action.payload.username;
      state.email = action.payload.email;
      state.jwt = action.payload.jwt;
    },

    disconnect: (state, action) => {
      state.username = null;
      state.email = null;
      state.jwt = null;
    },

    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload.value;
    },
  },
});

export const { login, disconnect, setAuthenticated } = authReducer.actions;

export default authReducer.reducer;
