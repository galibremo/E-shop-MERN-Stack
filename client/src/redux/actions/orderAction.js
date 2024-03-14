import axios from "axios";
import { toast } from "react-toastify";
import {
  getAllOrdersUserRequest,
  getAllOrdersUserSuccess,
  getAllOrdersUserFailed,
  getAllOrdersShopRequest,
  getAllOrdersShopSuccess,
  getAllOrdersShopFailed,
  adminAllOrdersRequest,
  adminAllOrdersSuccess,
  adminAllOrdersFailed,
} from "../reducers/orderSlice";

export const getAllOrdersOfUser = (userId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersUserRequest());
    const { data } = await axios.get(`/api/order/get-all-orders/${userId}`);
    dispatch(getAllOrdersUserSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersUserFailed(error.response.data.message));
  }
};

export const getAllShopOrders = (shodId) => async (dispatch) => {
  try {
    dispatch(getAllOrdersShopRequest());
    const { data } = await axios.get(
      `/api/order/get-seller-all-orders/${shodId}`
    );
    dispatch(getAllOrdersShopSuccess(data.orders));
  } catch (error) {
    dispatch(getAllOrdersShopFailed(error.response.data.message));
  }
};
export const getAllOrdersOfAdmin = () => async (dispatch) => {
  try {
    dispatch(adminAllOrdersRequest());
    const { data } = await axios.get("/api/order/admin-all-orders", {
      withCredentials: true,
    });
    dispatch(adminAllOrdersSuccess(data.orders));
  } catch (error) {
    dispatch(adminAllOrdersFailed(error.response.data.message));
  }
};
