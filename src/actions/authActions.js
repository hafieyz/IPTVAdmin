import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import { GET_ERRORS, SET_CURRENT_USER } from "./types";

// Login - Get user Token
export const loginUser = userData => dispatch => {
  axios
    .post("/admin/login", userData)
    .then(res => {
      // save token
      const { token } = res.data;
      // Set to localStorage
      localStorage.setItem("jwtToken", token);
      // Set token to header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set Logged in User
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};

// Log user out

export const logoutUser = () => dispatch => {
  // Remove token from ls
  localStorage.removeItem("jwtToken");
  // Remove Auth header
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
