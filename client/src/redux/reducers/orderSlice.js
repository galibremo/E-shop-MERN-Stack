import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const orderSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    getAllOrdersUserRequest: (state) => {
      state.loading = true;
    },
    getAllOrdersUserSuccess: (state, action) => {
      state.loading = false;
      state.orders = action.payload;
    },
    getAllOrdersUserFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    // get all orders of shop
    getAllOrdersShopRequest: (state) => {
      state.loading = true;
    },
    getAllOrdersShopSuccess: (state, action) => {
      state.loading = false;
      state.allOrders = action.payload;
    },
    getAllOrdersShopFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminAllOrdersRequest: (state) => {
      state.loading = true;
    },
    adminAllOrdersSuccess: (state, action) => {
      state.loading = false;
      state.adminOrders = action.payload;
    },
    adminAllOrdersFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFailed,
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersShopFailed,
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFailed,
} = orderSlice.actions;

export default orderSlice.reducer;
