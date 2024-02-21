import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  currentUser: null,
  error: null,
  loading: false,
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
      state.currentUser = action.payload;
      state.loading = false;
      state.error = null;
    },
    LoadUserFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutUserStart: (state) => {
      state.loading = true;
    },
    signOutUserSuccess: (state) => {
      state.currentUser = null;
      state.loading = false;
      state.error = null;
      state.isAuthenticated = false;
    },
    signOutUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserInfoRequest: (state) => {
      state.loading = true;
    },
    updateUserInfoSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
      state.error = null;
    },
    updateUserInfoFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    updateUserAddressRequest: (state) => {
      state.loading = true;
    },
    updateUserAddressSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    updateUserAddressFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    deleteUserAddressRequest: (state) => {
      state.loading = true;
    },
    deleteUserAddressSuccess: (state, action) => {
      state.loading = false;
      state.currentUser = action.payload;
    },
    deleteUserAddressFailed: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
  updateUserInfoRequest,
  updateUserInfoSuccess,
  updateUserInfoFailed,
  updateUserAddressRequest,
  updateUserAddressSuccess,
  updateUserAddressFailed,
  deleteUserAddressRequest,
  deleteUserAddressSuccess,
  deleteUserAddressFailed,
} = userSlice.actions;

export default userSlice.reducer;
