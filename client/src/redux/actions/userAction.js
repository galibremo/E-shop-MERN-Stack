import axios from "axios";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
  signOutUserStart,
  signOutUserSuccess,
  signOutUserFailure,
} from "../reducers/userSlice";
import {
  LoadSellerRequest,
  LoadSellerSuccess,
  LoadSellerFail,
} from "../reducers/sellerSlice";

export const loadUser = () => async (dispatch) => {
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`api/auth/getuser`, {
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
    const { data } = await axios.get("api/auth/logout", {
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
    const { data } = await axios.get(`api/shop/getshop`, {
      withCredentials: true,
    });
    dispatch(LoadSellerSuccess(data.shop));
    
  } catch (error) {
    dispatch(LoadSellerFail(error.response.data.message));
  }
};
