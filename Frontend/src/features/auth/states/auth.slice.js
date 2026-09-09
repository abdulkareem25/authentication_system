import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  status: "idle",
  authChecked: false,
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
      state.authChecked = true;
      state.error = null;
    },
    successMessage(state, action) {
      state.status = "succeeded";
      state.message = action.payload;
      state.error = null;
    },
    authFailure(state, action) {
      state.status = "failed";
      state.authChecked = true;
      state.error = action.payload;
    },
    authLogout(state) {
      state.status = "idle";
      state.user = null;
      state.authChecked = true;
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