import axios from "axios";
import {
  GET_ERRORS,
  GET_LOCATIONS,
  GET_LOCATION,
  DELETE_LOCATION,
} from "./types";

export const createLocation = (location, history) => async (dispatch) => {
  try {
    await axios.post("/api/location", location);
    history.push("/locationDashboard");

    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (err) {
    dispatch({
      type: GET_ERRORS,
      payload: err.response.data,
    });
  }
};

export const getLocations = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/location/all");
    dispatch({
      type: GET_LOCATIONS,
      payload: res.data,
    });
  } catch (e) {
    alert("You need to login to view this page", e.response);
  }
};

export const getLocation = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/location/${id}`);
    dispatch({
      type: GET_LOCATION,
      payload: res.data,
    });
  } catch (e) {
    history.push("/locationDashboard");
  }
};

export const deleteLocation = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This Will delete the Tour and all of its data."
    )
  ) {
    await axios.delete(`/api/location/${id}`);
    dispatch({
      type: DELETE_LOCATION,
      payload: id,
    });
  }
};
