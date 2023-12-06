import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    LoadUserRequest: (state) => {
      state.loading = true;
    },
    LoadUserSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.currentUser = action.payload;
    },
    LoadUserFail: (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { LoadUserRequest, LoadUserSuccess, LoadUserFail } =
  userSlice.actions;

export default userSlice.reducer;
