import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchBlogs, setNotification, likeBlog, deleteBlog } from "../actions";
import Blog from "./Blog";
// import PropTypes from "prop-types";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state) => state.blogs);

  useEffect(() => {
    (async () => {
      dispatch(fetchBlogs());
    })();
  }, [dispatch]);
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

// BlogList.propTypes = {
//   blogs: PropTypes.array.isRequired,
//   onHandleLikes: PropTypes.func.isRequired,
//   onHandleRemove: PropTypes.func.isRequired,
// };

export default BlogList;
