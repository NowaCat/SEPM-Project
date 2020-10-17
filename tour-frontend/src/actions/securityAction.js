import axios from "axios";
import setJWTToken from "../securityUtils/setJWTToken";
import { DELETE_USER, GET_ERRORS, GET_USERS, SET_CURRENT_USER } from "./types";
import jwt_decode from "jwt-decode";

export const createNewUser = (newUser, history) => async (dispatch) => {
  try {
    await axios.post("/api/users/register", newUser);
    history.push("/login");
    dispatch({
      type: GET_ERRORS,
      payload: {},
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const login = (LoginRequest) => async (dispatch) => {
  try {
    //post => Login Request
    const res = await axios.post("/api/users/login", LoginRequest);

    //extract token from res.data
    const { token } = res.data;

    //store the token in localStorage
    localStorage.setItem("jwtToken", token);

    //set token in header
    setJWTToken(token);

    //decode token in react
    const decoded = jwt_decode(token);
    localStorage.setItem("temp", decoded.username);

    //dispatch to security reducer
    dispatch({
      type: SET_CURRENT_USER,
      payload: decoded,
    });
  } catch (error) {
    dispatch({
      type: GET_ERRORS,
      payload: error.response.data,
    });
  }
};

export const logout = () => (dispatch) => {
  localStorage.removeItem("jwtToken");
  setJWTToken(false);
  dispatch({
    type: SET_CURRENT_USER,
    payload: {},
  });
};

export const resetErrors = () => (dispatch) => {
  dispatch({
    type: GET_ERRORS,
    payload: {},
  });
};

export const getUsers = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/users/all");
    dispatch({
      type: GET_USERS,
      payload: res.data,
    });
  } catch (e) {
    alert("You need to be authorized to view this page", e.response);
  }
};

export const deleteUser = (username) => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure? This Will delete the User and all of its data."
    )
  ) {
    try {
      await axios.delete(`/api/users/delete/${username}`);
      dispatch({
        type: DELETE_USER,
        payload: username,
      });
    } catch (error) {
      alert("You need admin privileges to delete other users", error.response);
      dispatch({
        type: GET_ERRORS,
        payload: error.response.data,
      });
    }
  }
};
