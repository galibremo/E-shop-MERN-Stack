import axios from "axios";
import {
  getAllSellersRequest,
  getAllSellersSuccess,
  getAllSellerFailed,
} from "../reducers/sellerSlice";

// get all sellers --- admin
export const getAllSellers = () => async (dispatch) => {
  try {
    dispatch(getAllSellersRequest());
    const { data } = await axios.get("/api/shop/admin-all-sellers", {
      withCredentials: true,
    });

    dispatch(getAllSellersSuccess(data.sellers));
  } catch (error) {
    dispatch(getAllSellerFailed(error.response.data.message));
  }
};
