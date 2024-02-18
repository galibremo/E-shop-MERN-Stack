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
} from "../reducers/userSlice";
import {
  LoadSellerRequest,
  LoadSellerSuccess,
  LoadSellerFail,
  signOutSellerStart,
  signOutSellerSuccess,
  signOutSellerFailure,
} from "../reducers/sellerSlice";

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
// export const loadUser = () => async (dispatch) => {
//     try {
//       dispatch({
//         type: "LoadUserRequest",
//       });
//       const { data } = await axios.get(`api/auth/getuser`, {
//         withCredentials: true,
//       });
//       dispatch({
//         type: "LoadUserSuccess",
//         payload: data.user,
//       });
//     } catch (error) {
//       dispatch({
//         type: "LoadUserFail",
//         payload: error.response.data.message,
//       });
//     }
//   };
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
