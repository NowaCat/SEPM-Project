import axios from "axios";
import { GET_ERRORS, GET_TOURS, GET_TOUR, DELETE_TOUR } from "./types";

export const createTour = (tour, history) => async (dispatch) => {
  try {
    await axios.post("/api/tour", tour);
    history.push("/dashboard");

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

export const getTours = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tour/all");
    dispatch({
      type: GET_TOURS,
      payload: res.data,
    });
  } catch (e) {
    alert("You need to login to view this page", e.response);
  }
};

export const getTour = (id, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/tour/${id}`);
    dispatch({
      type: GET_TOUR,
      payload: res.data,
    });
  } catch (e) {
    history.push("/dashboard");
  }
};

export const deleteTour = (id) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This Will delete the Tour and all of its data."
    )
  ) {
    await axios.delete(`/api/tour/${id}`);
    dispatch({
      type: DELETE_TOUR,
      payload: id,
    });
  }
};
