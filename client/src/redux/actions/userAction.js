import axios from "axios";
import {
  LoadUserRequest,
  LoadUserSuccess,
  LoadUserFail,
} from "../reducers/userSlice";
 
export const loadUser = () => async (dispatch) => {
  
  try {
    dispatch(LoadUserRequest());
    const { data } = await axios.get(`api/auth/getuser`, {
      withCredentials: true,
    });
    dispatch(LoadUserSuccess(data.user));
  } catch (error) {
    dispatch(LoadUserFail(error.messag));
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
