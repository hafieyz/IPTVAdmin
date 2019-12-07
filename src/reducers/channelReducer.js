import { GET_CHANNELS, CHANNELS_LOADING } from "../actions/types";
import { CLEAR_CHANNELS } from "../actions/types";

const initialState = {
  channels: null,
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CHANNELS_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_CHANNELS:
      return {
        ...state,
        channels: action.payload,
        loading: false
      };
    case CLEAR_CHANNELS:
      return {
        ...state,
        channels: null
      };
    default:
      return state;
  }
}
