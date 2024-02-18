import axios from "axios";
import {
  EventCreateRequest,
  EventCreateSuccess,
  EventCreateFail,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  getAllEventsShopFailed,
  getAllEventsRequest,
  getAllEventsSuccess,
  getAllEventsFailed,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailed,
} from "../reducers/eventSlice";
import { toast } from "react-toastify";
import { getStorage, ref, deleteObject } from "firebase/storage";

export const createEvent = (formData) => async (dispatch) => {
  try {
    dispatch(EventCreateRequest());
    const { data } = await axios.post(`/api/event/create-event`, formData);
    if (data.success === false) {
      dispatch(EventCreateFail(error.message));
      return;
    }
    dispatch(EventCreateSuccess(data));
    toast.success("Event created successfully!");
  } catch (error) {
    dispatch(EventCreateFail(error.message));
    toast.error(error.message);
  }
};

export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllEventsShopRequest());
    const { data } = await axios.get(`/api/event/get-all-evetns-shop/${id}`);
    if (data.success === false) {
      dispatch(getAllEventsShopFailed(error.message));
      return;
    }
    dispatch(getAllEventsShopSuccess(data.events));
  } catch (error) {
    dispatch(getAllEventsShopFailed(error.message));
  }
};

export const deleteEventShop = (id, imageUrls) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());
    const { data } = await axios.delete(`/api/event/delete-shop-event/${id}`, {
      withCredentials: true,
    });
    if (data.success === false) {
      dispatch(deleteEventFailed(error.message));
      return;
    }
    dispatch(deleteEventSuccess(data.message));
    const storage = getStorage();
    for (const imageUrl of imageUrls) {
      const imageRef = ref(storage, imageUrl);
      await deleteObject(imageRef);
    }
    toast.success(data.message);
  } catch (error) {
    dispatch(deleteEventFailed(error.message));
    toast.error(error.message);
  }
};

export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch(getAllEventsRequest());
    const { data } = await axios.get("/api/event/get-all-evetns");
    if (data.success === false) {
      dispatch(getAllEventsShopFailed(error.message));
      return;
    }
    dispatch(getAllEventsSuccess(data.events));
  } catch (error) {
    dispatch(getAllEventsFailed(error.message));
  }
};