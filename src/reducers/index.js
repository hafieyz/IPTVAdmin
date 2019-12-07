import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import channelReducer from "./channelReducer";

export default combineReducers({
  auth: authReducer,
  errors: errorReducer,
  channels: channelReducer
});
