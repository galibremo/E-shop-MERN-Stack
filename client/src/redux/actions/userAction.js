import axios from "axios";

export const loadUser = () => async (dispatch) => {
    try {
      dispatch({
        type: "LoadUserRequest",
      });
      const { data } = await axios.get(`api/auth/getuser`, {
        withCredentials: true,
      });
      dispatch({
        type: "LoadUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "LoadUserFail",
        payload: error.response.data.message,
      });
    }
  };
