import React from "react";
import Blog from "./Blog";
import PropTypes from "prop-types";

const BlogList = ({ blogs, onHandleLikes, onHandleRemove }) => {
  return (
    <>
      {blogs &&
        blogs
          .sort((a, b) => b.likes - a.likes)
          .map(blog => (
            <Blog
              key={blog.id}
              blog={blog}
              onHandleLikes={() => onHandleLikes(blog.id)}
              onHandleRemove={() => onHandleRemove(blog.id)}
            />
          ))}
    </>
  );
};

BlogList.propTypes = {
  blogs: PropTypes.array.isRequired,
  onHandleLikes: PropTypes.func.isRequired,
  onHandleRemove: PropTypes.func.isRequired
};

export default BlogList;
