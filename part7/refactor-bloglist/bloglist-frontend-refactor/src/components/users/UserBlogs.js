import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { NavLink, useParams, Link, Redirect } from "react-router-dom";
import UserBlogList from "../users/UserBlogList";
import BlogFormHeader from "../blogs/BlogFormHeader";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../actions";
import { activeStyle } from "../../utils";
import Notification from "../Notification";

const UserBlogs = ({ handleLogout }) => {
  const auth = useSelector(({ auth }) => auth);
  const blogs = useSelector(({ blogs }) => blogs);
  const name = useParams().user;

  const store = useStore();
  const currentUser = store.getState().auth.currentUser;

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchBlogs());
    })();
  }, [dispatch]);

  if (!auth) return;
  if (auth.error || !currentUser) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="create-new-form">
      <BlogFormHeader user={auth.currentUser} handleLogout={handleLogout} />
      <nav>
        <NavLink to="/users" activeStyle={activeStyle}>
          Users
        </NavLink>
        <NavLink to="/blogs" activeStyle={activeStyle}>
          Blogs
        </NavLink>
      </nav>
      <Notification />
      <div>
        <h2>{name}'s Blogs</h2>
        <UserBlogList blogs={blogs} />
      </div>
      <h2 style={{ margin: "0 auto" }}>
        <Link to="/users">back to users</Link>
      </h2>
    </div>
  );
};

export default UserBlogs;
