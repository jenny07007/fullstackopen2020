import React, { useEffect } from "react";
import { useStore, useSelector, useDispatch } from "react-redux";
import { Link, NavLink } from "react-router-dom";
import BlogFormHeader from "./blogs/BlogFormHeader";
import Notification from "./Notification";
import { fetchUsers } from "../actions";
import UsersList from "./users/UsersList";

const Dashboard = ({ handleLogout }) => {
  // update state immediately
  const auth = useSelector(({ auth }) => auth);
  // const store = useStore();
  // const currentUser = store.getState().auth.currentUser;

  const dispatch = useDispatch();
  const users = useSelector(({ users }) => users);

  useEffect(() => {
    (async () => {
      dispatch(fetchUsers());
    })();
  }, [dispatch]);

  if (!auth) return;
  // if (auth.error || currentUser === false || !currentUser) {
  //   return <Redirect to="/"></Redirect>;
  // }

  const style = {
    color: "blue",
    fontWeight: "bold",
    textDecoration: "underline",
  };
  return (
    <div className="create-new-form">
      <BlogFormHeader user={auth.currentUser} handleLogout={handleLogout} />
      <nav>
        <NavLink to="/users" activeStyle={style}>
          Users
        </NavLink>
        <NavLink to="/blogs">Blogs</NavLink>
      </nav>
      <div>
        <h2>Users</h2>
        <UsersList users={users} />
      </div>
    </div>
  );
};

export default Dashboard;
