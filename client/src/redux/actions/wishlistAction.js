import { addToWishlist, removeFromWishlist } from "../reducers/wishlistSlice";

// add to wishlist
export const addWishlist = (data) => async (dispatch, getState) => {
  dispatch(addToWishlist(data));
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  return data;
};
// remove from wishlist
export const removeWishlist = (data) => async (dispatch, getState) => {
  dispatch(removeFromWishlist(data));
  localStorage.setItem("wishlistItems", JSON.stringify(getState().wishlist.wishlist));
  return data;
};
