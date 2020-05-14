import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { NavLink, useParams, Link } from "react-router-dom";
import UserBlogList from "../users/UserBlogList";
import BlogFormHeader from "../blogs/BlogFormHeader";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs } from "../../actions";
import Notification from "../Notification";

const UserBlogs = ({ handleLogout }) => {
  // update state immediately
  const auth = useSelector(({ auth }) => auth);
  const blogs = useSelector(({ blogs }) => blogs);
  const name = useParams().id;
  const store = useStore();
  const currentUser = store.getState().auth.currentUser;

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchBlogs());
    })();
  }, [dispatch]);

  const style = {
    color: "blue",
    fontWeight: "bold",
    textDecoration: "underline",
  };

  return (
    <div className="create-new-form">
      <BlogFormHeader user={auth.currentUser} handleLogout={handleLogout} />
      <nav>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/blogs" activeStyle={style}>
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
