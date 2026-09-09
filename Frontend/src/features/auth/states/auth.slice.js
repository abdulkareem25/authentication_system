import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  error: null,
  message: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    authRequest(state) {
      state.status = "loading";
      state.error = null;
    },
    authSuccess(state, action) {
      state.status = "succeeded";
      state.user = action.payload;
      state.error = null;
    },
    successMessage(state, action) {
      state.status = "succeeded";
      state.message = action.payload;
      state.error = null;
    },
    authFailure(state, action) {
      state.status = "failed";
      state.user = null;
      state.error = action.payload;
    },
    authLogout(state) {
      state.status = "idle";
      state.user = null;
      state.error = null;
    },
    clearAuthError(state) {
      state.error = null;
    }
  },
});

export const {
  authRequest,
  authSuccess,
  successMessage,
  authFailure,
  authLogout,
  clearAuthError
} = authSlice.actions;

export default authSlice.reducer;