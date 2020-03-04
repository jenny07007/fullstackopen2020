import React from "react";
import PropTypes from "prop-types";

const BlogForm = ({ onNewblogChange, onAddNewBlog, newBlog }) => (
  <form onSubmit={onAddNewBlog} className="create-new-form">
    <div className="form-item">
      <label htmlFor="title">title</label>
      <input
        value={newBlog.title}
        name="title"
        onChange={onNewblogChange}
        id="title"
      />
    </div>
    <div className="form-item">
      <label htmlFor="author">author</label>
      <input
        value={newBlog.author}
        name="author"
        onChange={onNewblogChange}
        id="author"
      />
    </div>
    <div className="form-item">
      <label htmlFor="url">url</label>
      <input
        value={newBlog.url}
        name="url"
        onChange={onNewblogChange}
        id="url"
      />
    </div>

    <button className="btn submit-btn" type="submit">
      Create
    </button>
  </form>
);

BlogForm.propTypes = {
  onAddNewBlog: PropTypes.func.isRequired,
  onNewblogChange: PropTypes.func.isRequired,
  newBlog: PropTypes.object.isRequired
};

export default BlogForm;
