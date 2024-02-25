import { addToCart, removeFromCart, emptyCart } from "../reducers/cartSlice";

// add to cart
export const addCart = (data) => async (dispatch, getState) => {
  dispatch(addToCart(data));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};
// remove from cart
export const removeCart = (data) => async (dispatch, getState) => {
  dispatch(removeFromCart(data));
  localStorage.setItem("cartItems", JSON.stringify(getState().cart.cart));
  return data;
};

export const emptyCartItem = () => async (dispatch) => {
  dispatch(emptyCart());
  localStorage.setItem("cartItems", JSON.stringify([]));
  localStorage.setItem("latestOrder", JSON.stringify([]));
  return Promise.resolve;
};
