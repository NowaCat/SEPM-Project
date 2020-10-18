import axios from "axios";
import { GET_ERRORS, GET_TYPES, GET_TYPE, DELETE_TYPE } from "./types";

export const createType = (type, history) => async (dispatch) => {
  try {
    await axios.post("/api/tourType", type);
    history.push("/tourTypeDashboard");
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

export const getTypes = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/tourType/all");
    dispatch({
      type: GET_TYPES,
      payload: res.data,
    });
  } catch (e) {
    alert("You need to login to view this page", e.response);
  }
};

export const getType = (label, history) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/tourType/${label}`);
    dispatch({
      type: GET_TYPE,
      payload: res.data,
    });
  } catch (e) {
    history.push("/tourTypeDashboard");
  }
};

export const deleteType = (label) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This Will delete the Tour Type and all of its data."
    )
  ) {
    await axios.delete(`/api/tourType/${label}`);
    dispatch({
      type: DELETE_TYPE,
      payload: label,
    });
  }
};
