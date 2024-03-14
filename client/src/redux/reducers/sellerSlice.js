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
    getAllSellersRequest: (state) => {
      state.loading = true;
    },
    getAllSellersSuccess: (state, action) => {
      state.loading = false;
      state.sellers = action.payload;
    },
    getAllSellerFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
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
  getAllSellersRequest,
  getAllSellersSuccess,
  getAllSellerFailed,
} = sellerSlice.actions;

export default sellerSlice.reducer;
