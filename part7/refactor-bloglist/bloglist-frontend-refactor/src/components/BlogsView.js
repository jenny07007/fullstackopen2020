import React, { useEffect } from "react";
import { useStore } from "react-redux";
import { NavLink } from "react-router-dom";
import BlogList from "./blogs/BlogList";
import BlogForm from "./blogs/BlogForm";
import BlogFormHeader from "./blogs/BlogFormHeader";
import { useSelector, useDispatch } from "react-redux";
import Notification from "./Notification";
import Togglable from "./Togglable";
import { fetchBlogs } from "../actions";

const Dashboard = ({
  handleLogout,
  onNewblogChange,
  onAddNewBlog,
  newBlog,
}) => {
  // update state immediately
  const auth = useSelector(({ auth }) => auth);
  const blogs = useSelector(({ blogs }) => blogs);

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
      <div style={{ marginTop: "2rem" }}>
        {/* ref={blogFormRef} */}
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
        <h2>Blogs</h2>
        <BlogList blogs={blogs} />
      </div>
    </div>
  );
};

export default Dashboard;
