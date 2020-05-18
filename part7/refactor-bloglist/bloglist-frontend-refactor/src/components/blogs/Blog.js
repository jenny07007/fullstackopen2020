import React, { useState } from "react";
import BlogDetail from "./BlogDetail";

const Blog = ({ blog, onHandleLikes, onHandleRemove }) => {
  const [visible, setVisible] = useState(false);
  const blogRef = React.createRef();

  const handleToggleVisibility = () => blogRef.current.toggleVisibility();

  const renderIcons = visible ? (
    <i className="fas fa-arrow-circle-up fas-arrow"></i>
  ) : (
    <i className="fas fa-arrow-circle-down fas-arrow"></i>
  );
  return (
    <div className="blog-style">
      <li className="blog-list-toggle" onClick={handleToggleVisibility}>
        <div className="blog-list-title">
          {blog.title}
          <span> - Author: {blog.author}</span>
        </div>
        <button
          onClick={handleToggleVisibility}
          className="blog-list-toggle-btn"
        >
          {renderIcons}
        </button>
      </li>
      <BlogDetail
        ref={blogRef}
        blog={blog}
        visible={visible}
        setVisible={setVisible}
        onHandleLikes={onHandleLikes}
        onHandleRemove={onHandleRemove}
      />
    </div>
  );
};

export default Blog;
