import React, { useImperativeHandle } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line react/display-name
const BlogDetail = React.forwardRef(
  ({ blog, visible, setVisible, onHandleLikes, onHandleRemove }, ref) => {
    const showStyle = {
      display: visible ? "" : "none",
      lineHeight: "1.8",
      paddingTop: ".8em",
      transition: "display 1s ease"
    };

    const toggleVisibility = () => setVisible(!visible);
    useImperativeHandle(ref, () => ({ toggleVisibility }));

    return (
      <div style={showStyle}>
        <li>
          <a href={blog.url}>{blog.url}</a>
        </li>
        <li className="blog-list">
          {`Likes: ${blog.likes}`}
          <button className="like-btn" onClick={onHandleLikes}>
            <i className="fas fa-heart"></i>
          </button>
        </li>
        <li className="blog-list">{`addd by ${blog.user.name}`}</li>
        <button onClick={onHandleRemove} className="delete-btn">
          Delete
        </button>
      </div>
    );
  }
);

BlogDetail.propTypes = {
  blog: PropTypes.object.isRequired,
  visible: PropTypes.bool.isRequired,
  setVisible: PropTypes.func.isRequired,
  onHandleLikes: PropTypes.func.isRequired,
  onHandleRemove: PropTypes.func.isRequired
};

export default BlogDetail;
