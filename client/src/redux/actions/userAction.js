import axios from "axios";
import {
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
} from "../reducers/userSlice";
import {
  LoadSellerRequest,
  LoadSellerSuccess,
  LoadSellerFail,
  signOutSellerStart,
  signOutSellerSuccess,
  signOutSellerFailure,
} from "../reducers/sellerSlice";
import { toast } from "react-toastify";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`/api/auth/getuser`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFail(error.response.data.message));
  }
};
export const signOutUser = () => async (dispatch) => {
  try {
    dispatch(signOutUserStart());
    const { data } = await axios.get("/api/auth/logout", {
      withCredentials: true,
    });
    dispatch(signOutUserSuccess(data.user));
  } catch (error) {
    dispatch(signOutUserFailure(error.response.data.message));
  }
};

export const loadSeller = () => async (dispatch) => {
  try {
    dispatch(LoadSellerRequest());
    const { data } = await axios.get(`/api/shop/getshop`, {
      withCredentials: true,
    });
    dispatch(LoadSellerSuccess(data.shop));
  } catch (error) {
    dispatch(LoadSellerFail(error.response.data.message));
  }
};
export const updateUserInfo = (formData, id) => async (dispatch) => {
  try {
    dispatch(updateUserInfoRequest());
    const { data } = await axios.put(
      `/api/auth/update-user-info/${id}`,
      formData,
      {
        withCredentials: true,
      }
    );
    dispatch(updateUserInfoSuccess(data));
  } catch (error) {
    dispatch(updateUserInfoFailed(error.response.data.message));
  }
};
export const signOutSeller = () => async (dispatch) => {
  try {
    dispatch(signOutSellerStart());
    const { data } = await axios.get("/api/shop/shop-logout", {
      withCredentials: true,
    });
    dispatch(signOutSellerSuccess(data.seller));
  } catch (error) {
    dispatch(signOutSellerFailure(error.response.data.message));
  }
};
export const updateUserAddress = (formData) => async (dispatch) => {
  try {
    dispatch(updateUserAddressRequest());
    const { data } = await axios.put(
      "/api/auth/update-user-address",
      formData,
      { withCredentials: true }
    );
    if (data.success === false) {
      dispatch(updateUserAddressFailed(error.message));
      return;
    }
    dispatch(updateUserAddressSuccess(data.user));
    toast.success("Address Updated Successfully!");
  } catch (error) {
    dispatch(updateUserAddressFailed(error.response.data.message));
    toast.error(error.response.data.message);
  }
};

export const deleteUserAddress = (id) => async (dispatch) => {
  try {
    dispatch(deleteUserAddressRequest());

    const { data } = await axios.delete(`/api/auth/delete-user-address/${id}`, {
      withCredentials: true,
    });
    if (data.success === false) {
      dispatch(deleteUserAddressFailed(error.message));
      return;
    }
    dispatch(deleteUserAddressSuccess(data.user));
    toast.success("Address Deleted Successfully!");
  } catch (error) {
    dispatch(deleteUserAddressFailed(error.message));
    toast.error(error.message);
  }
};
