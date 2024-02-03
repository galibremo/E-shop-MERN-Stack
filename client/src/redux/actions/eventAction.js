import axios from "axios";
import {
  EventCreateRequest,
  EventCreateSuccess,
  EventCreateFail,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  getAllEventsShopFailed,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailed,
} from "../reducers/eventSlice";

export const createEvent = (formData) => async (dispatch) => {
  try {
    dispatch(EventCreateRequest());
    const { data } = await axios.post(`api/event/create-event`, formData);
    dispatch(EventCreateSuccess(data.event));
  } catch (error) {
    dispatch(EventCreateFail(error.message));
  }
};

export const getAllEventsShop = (id) => async (dispatch) => {
  try {
    dispatch(getAllEventsShopRequest());
    const { data } = await axios.get(`api/event/get-all-evetns-shop/${id}`);
    dispatch(getAllEventsShopSuccess(data.events));
  } catch (error) {
    dispatch(getAllEventsShopFailed(error.message));
  }
};

export const deleteEventShop = (id) => async (dispatch) => {
  try {
    dispatch(deleteEventRequest());
    const { data } = await axios.delete(`api/event/delete-shop-event/${id}`, {
      withCredentials: true,
    });
    dispatch(deleteEventSuccess(data.message));
  } catch (error) {
    dispatch(deleteEventFailed(error.message));
  }
};
