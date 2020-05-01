import { combineReducers } from "redux";
import authReducer from "./authReducer";
import blogReducer from "./blogReducer";
import notificationReducer from "./notificationReducer";

export default combineReducers({
  auth: authReducer,
  blogs: blogReducer,
  notification: notificationReducer,
});
