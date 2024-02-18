import axios from "axios";
import {
  ProductCreateRequest,
  ProductCreateSuccess,
  ProductCreateFail,
  getAllProductsShopRequest,
  getAllProductsShopSuccess,
  getAllProductsShopFailed,
  getAllProductsRequest,
  getAllProductsSuccess,
  getAllProductsFailed,
  deleteProductRequest,
  deleteProductSuccess,
  deleteProductFailed,
} from "../reducers/productSlice";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";

export const createProduct = (formData) => async (dispatch) => {
  try {
    dispatch(ProductCreateRequest());
    const { data } = await axios.post(`/api/product/create-product`, formData);
    if (data.success === false) {
      dispatch(ProductCreateFail(error.message));
      return;
    }
    dispatch(ProductCreateSuccess(data));
    toast.success("Product created successfully!");
  } catch (error) {
    dispatch(ProductCreateFail(error.message));
    toast.error(error.message);
  }
};

export const getAllProductsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllProductsShopRequest());
    const { data } = await axios.get(
      `/api/product/get-all-products-shop/${id}`
    );
    if (data.success === false) {
      dispatch(getAllProductsShopFailed(error.message));
      return;
    }
    dispatch(getAllProductsShopSuccess(data.products));
  } catch (error) {
    dispatch(getAllProductsShopFailed(error.message));
  }
};

export const deleteProductShop = (id, imageUrls) => async (dispatch) => {
  try {
    dispatch(deleteProductRequest());
    const { data } = await axios.delete(
      `/api/product/delete-shop-product/${id}`,
      {
        withCredentials: true,
      }
    );
    if (data.success === false) {
      dispatch(deleteProductFailed(error.message));
      return;
    }
    dispatch(deleteProductSuccess(data.message));
    const storage = getStorage();
    for (const imageUrl of imageUrls) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    toast.success(data.message);
  } catch (error) {
    dispatch(deleteProductFailed(error.message));
    toast.error(error.message);
  }
};

export const getAllProducts = () => async (dispatch) => {
  try {
    dispatch(getAllProductsRequest());
    const { data } = await axios.get(
      "/api/product/get-all-products"
    );
    if (data.success === false) {
      dispatch(getAllProductsFailed(error.message));
      return;
    }
    dispatch(getAllProductsSuccess(data.products));
  } catch (error) {
    dispatch(getAllProductsFailed(error.message));
  }
};
