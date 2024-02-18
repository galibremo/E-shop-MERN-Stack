import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
};

const eventSlice = createSlice({
  name: "events",
  initialState,
  reducers: {
    EventCreateRequest: (state) => {
      state.loading = true;
    },
    EventCreateSuccess: (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    },
    EventCreateFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
      state.success = false;
    },
    getAllEventsShopRequest: (state) => {
      state.loading = true;
    },
    getAllEventsShopSuccess: (state, action) => {
      state.loading = false;
      state.events = action.payload;
      state.error = null;
    },
    getAllEventsShopFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    getAllEventsRequest: (state) => {
      state.loading = true;
    },
    getAllEventsSuccess: (state, action) => {
      state.loading = false;
      state.allEvents = action.payload;
      state.error = null;
    },
    getAllEventsFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteEventRequest: (state) => {
      state.loading = true;
    },
    deleteEventSuccess: (state, action) => {
      state.loading = false;
      state.error = null;
    },
    deleteEventFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  EventCreateRequest,
  EventCreateSuccess,
  EventCreateFail,
  getAllEventsShopRequest,
  getAllEventsShopSuccess,
  getAllEventsShopFailed,
  getAllEventsRequest,
  getAllEventsSuccess,
  getAllEventsFailed,
  clearErrors,
  clearMessage,
  deleteEventRequest,
  deleteEventSuccess,
  deleteEventFailed,
} = eventSlice.actions;

export default eventSlice.reducer;
