import axios from "axios";

import {
  GET_CHANNELS,
  CHANNELS_LOADING,
  CLEAR_CHANNELS,
  GET_ERRORS
} from "./types";

// GET CHANNELS
export const getChannels = () => dispatch => {
  //dispatch(setChannelsLoading());
  axios
    .get("http://84.32.134.181:5000/admin/channel")
    .then(res =>
      dispatch({
        type: GET_CHANNELS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: {}
      })
    );
};

//Channels loading
export const setChannelsLoading = () => {
  return {
    type: CHANNELS_LOADING
  };
};
// Clear channels
export const clearChannels = () => {
  return {
    type: CLEAR_CHANNELS
  };
};
