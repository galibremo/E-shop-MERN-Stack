import axios from "axios";
import {
  ProductCreateRequest,
  ProductCreateSuccess,
  ProductCreateFail,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsShopFailed,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
} from "../reducers/productSlice";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch(ProductCreateRequest());
    const { data } = await axios.post(`api/product/create-product`, formData);
    dispatch(ProductCreateSuccess(data));
  } catch (error) {
    dispatch(ProductCreateFail(error.response.data.message));
  }
};

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllProductsShopRequest());
    const { data } = await axios.get(`api/product/get-all-products-shop/${id}`);
    dispatch(getAllProductsShopSuccess(data.products));
  } catch (error) {
    dispatch(getAllProductsShopFailed(error.response.data.message));
  }
};

export const deleteProductShop = (id) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await axios.delete(`api/product/delete-shop-product/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteProductSuccess(data.message));
  } catch (error) {
    dispatch(deleteProductFailed(error.response.data.message));
  }
};
