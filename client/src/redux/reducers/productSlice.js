import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    ProductCreateRequest: (state) => {
      state.loading = true;
    },
    ProductCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
    },
    ProductCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getAllProductsShopRequest: (state) => {
      state.loading = true;
    },
    getAllProductsShopSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    getAllProductsShopFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteProductRequest: (state) => {
      state.loading = true;
    },
    deleteProductSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    deleteProductFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    clearErrors: (state) => {
      state.error = null;
    },
  },
});

export const {
  ProductCreateRequest,
  ProductCreateSuccess,
  ProductCreateFail,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsShopFailed,
  clearErrors,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
} = productSlice.actions;

export default productSlice.reducer;
