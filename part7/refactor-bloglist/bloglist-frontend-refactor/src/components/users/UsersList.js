import React from "react";
import { Link } from "react-router-dom";

const UsersList = ({ users }) => {
  const icons = ["🐙", "🍋", "🐠", "🐳", "🦁"];
  const renderIcons = (icons) => {
    const idx = Math.floor(Math.random() * icons.length);
    return icons[idx];
  };
  if (!users) return;
  return (
    <div>
      {users.map((user) => (
        <div className="blog-style" key={user.id}>
          <div>
            <span className="blog-span"> username {renderIcons(icons)} </span>
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
