import React from "react";
import { Link } from "react-router-dom";
import { renderIcons } from "../../utils";

const UsersList = ({ users }) => {
  if (!users) return;
  return (
    <div>
      {users.map((user) => (
        <div className="blog-style" key={user.id}>
          <div>
            <span className="blog-span"> username {renderIcons()} </span>
            <Link to={`/users/${user.username}`} className="blog-list-title">
              {user.username}
            </Link>
            <span className="blog-span">
              {" "}
              - Blogs Created: {user.blogs.length}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
