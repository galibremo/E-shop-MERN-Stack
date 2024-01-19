import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  currentSeller: null,
  error: null,
  loading: false,
};

const sellerSlice = createSlice({
  name: "seller",
  initialState,
  reducers: {
    LoadSellerRequest: (state) => {
      state.loading = true;
    },
    LoadSellerSuccess: (state, action) => {
      state.isSeller = true;
      state.currentSeller = action.payload;
      state.loading = false;
      state.error = null;
    },
    LoadSellerFail: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    signOutSellerStart: (state) => {
      state.loading = true;
    },
    signOutSellerSuccess: (state) => {
      state.currentSeller = null;
      state.loading = false;
      state.error = null;
      state.isSeller = false;
    },
    signOutSellerFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  LoadSellerRequest,
  LoadSellerSuccess,
  LoadSellerFail,
  signOutSellerStart,
  signOutSellerSuccess,
  signOutSellerFailure,
} = sellerSlice.actions;

export default sellerSlice.reducer;
