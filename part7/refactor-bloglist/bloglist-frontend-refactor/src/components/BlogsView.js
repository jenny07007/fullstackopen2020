import React, { useEffect } from "react";
import { NavLink, Redirect } from "react-router-dom";
import BlogList from "./blogs/BlogList";
import BlogForm from "./blogs/BlogForm";
import BlogFormHeader from "./blogs/BlogFormHeader";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import Togglable from "./Togglable";
import { fetchBlogs } from "../actions";
import { activeStyle } from "../utils";

const BlogsView = ({
  handleLogout,
  onNewblogChange,
  onAddNewBlog,
  newBlog,
}) => {
  const auth = useSelector(({ auth }) => auth);
  const blogs = useSelector(({ blogs }) => blogs);

  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      dispatch(fetchBlogs());
    })();
  }, [dispatch]);

  if (!auth) return;
  if (auth.error || !auth.currentUser) {
    return <Redirect to="/"></Redirect>;
  }

  return (
    <div className="create-new-form">
      <BlogFormHeader user={auth.currentUser} handleLogout={handleLogout} />
      <nav>
        <NavLink to="/users">Users</NavLink>
        <NavLink to="/blogs" activeStyle={activeStyle}>
          Blogs
        </NavLink>
      </nav>
      <div style={{ marginTop: "2rem" }}>
        <Notification />
        <Togglable buttonLabel="New Blog">
          <BlogForm
            onNewblogChange={onNewblogChange}
            onAddNewBlog={onAddNewBlog}
            newBlog={newBlog}
          />
        </Togglable>
      </div>
      <div>
        <h2>All Blogs</h2>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default BlogsView;
