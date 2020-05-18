import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import BlogFormHeader from "./blogs/BlogFormHeader";
import { fetchUsers } from "../actions";
import UsersList from "./users/UsersList";
import { activeStyle } from "../utils";

const UsersView = ({ handleLogout }) => {
  const auth = useSelector(({ auth }) => auth);
  const users = useSelector(({ users }) => users);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchUsers());
    })();
  }, [dispatch]);

  const renderContent = () => {
    if (auth.currentUser) {
      return (
        <div className="create-new-form">
          <BlogFormHeader user={auth.currentUser} handleLogout={handleLogout} />
          <nav>
            <NavLink to="/users" activeStyle={activeStyle}>
              Users
            </NavLink>
            <NavLink to="/blogs">Blogs</NavLink>
          </nav>
          <h2>Users</h2>
          <UsersList users={users} />
        </div>
      );
    }
  };

  return <div>{renderContent()}</div>;
};

export default UsersView;
