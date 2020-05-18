import React, { useImperativeHandle } from "react";

const BlogDetail = React.forwardRef(
  ({ blog, visible, setVisible, onHandleLikes, onHandleRemove }, ref) => {
    const showStyle = {
      display: visible ? "" : "none",
      lineHeight: "1.8",
      paddingTop: ".8em",
      transition: "display 1s ease",
    };

    const toggleVisibility = () => setVisible(!visible);
    useImperativeHandle(ref, () => ({ toggleVisibility }));

    // ISSUE: userBlog disappears when clicking like
    return (
      <div className="blog-list-showStyle" style={showStyle}>
        <li className="blog-list url">
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li className="blog-list likes">
          {`Likes: ${blog.likes}`}
          <button className="like-btn" onClick={onHandleLikes}>
            <i className="fas fa-heart"></i>
          </button>
        </li>
        <li className="blog-list user-name">{`addd by ${blog.user.username}`}</li>
        <button onClick={onHandleRemove} className="delete-btn">
          Delete
        </button>
      </div>
    );
  }
);

export default BlogDetail;
