import React from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotification, likeBlog, deleteBlog } from "../../actions";
import Blog from "../blogs/Blog";

const UserBlogList = ({ blogs }) => {
  const dispatch = useDispatch();
  const name = useParams().user;

  const showHideNotification = (type, message) => {
    dispatch(setNotification(type, message, 5));
  };

  const onHandleLikes = async (blogId) => {
    try {
      const serverBlog = await blogs.find((b) => b.id === blogId);

      const blogToUpdate = {
        likes: serverBlog.likes + 1,
      };
      dispatch(likeBlog(blogId, blogToUpdate));
      showHideNotification(
        "Success!",
        `You liked "${serverBlog.title}" by ${serverBlog.author}`
      );
    } catch (error) {
      showHideNotification("Error!", "Something went wrong");
    }
  };

  const onHandleRemove = async (blogId) => {
    try {
      const serverBlog = await blogs.find((b) => b.id === blogId);

      const comfirmToDelete = window.confirm(
        `Are you sure you want to delete "${serverBlog.title} by ${serverBlog.author}"? It'll be gone forever!`
      );

      if (!comfirmToDelete) return;

      dispatch(deleteBlog(blogId));
      showHideNotification(
        "Success!",
        `"${serverBlog.title} by ${serverBlog.author}" has been deleted`
      );
    } catch (error) {
      showHideNotification(
        "Error!",
        "You can't delete the blog that doesn't belong to you!"
      );
    }
  };

  return (
    <>
      {blogs
        ? blogs
            .sort((a, b) => b.likes - a.likes)
            .filter((b) => b.user.username === name)
            .map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                onHandleLikes={() => onHandleLikes(blog.id)}
                onHandleRemove={() => onHandleRemove(blog.id)}
              />
            ))
        : ""}
    </>
  );
};

export default UserBlogList;
