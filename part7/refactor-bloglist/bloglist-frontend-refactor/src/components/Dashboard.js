import React from "react";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";
import BlogList from "./blogs/BlogList";
import BlogForm from "./blogs/BlogForm";
import BlogFormHeader from "./blogs/BlogFormHeader";
import Notification from "./Notification";
import Togglable from "./Togglable";

const Dashboard = ({
  handleLogout,
  onNewblogChange,
  onAddNewBlog,
  newBlog,
}) => {
  const auth = useSelector((state) => state.auth);
  return auth.currentUser && auth.error === null ? (
    <div className="create-new-form">
      <h2>blogs</h2>
      <BlogFormHeader user={auth.currentUser} handleLogout={handleLogout} />
      <Notification />
      <div>
        {/* ref={blogFormRef} */}
        <Togglable buttonLabel="New Blog">
          <BlogForm
            onNewblogChange={onNewblogChange}
            onAddNewBlog={onAddNewBlog}
            newBlog={newBlog}
          />
        </Togglable>
      </div>
      <ul>
        <BlogList />
      </ul>
    </div>
  ) : (
    <Redirect to="/login"></Redirect>
  );
};

export default Dashboard;
