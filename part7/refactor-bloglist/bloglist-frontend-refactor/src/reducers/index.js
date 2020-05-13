import { combineReducers } from "redux";
import authReducer from "./authReducer";
import blogReducer from "./blogReducer";
import notificationReducer from "./notificationReducer";
import usersReducer from "./usersReducer";

export default combineReducers({
  auth: authReducer,
  blogs: blogReducer,
  users: usersReducer,
  notification: notificationReducer,
});
