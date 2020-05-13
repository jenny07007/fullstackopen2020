import React from "react";

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
          <div className="blog-list-title">
            <span> username {renderIcons(icons)} </span>
            {user.username}
            <span> - Blogs Created: {user.blogs.length}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UsersList;
