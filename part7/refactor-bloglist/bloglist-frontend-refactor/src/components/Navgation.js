import React from "react";

const Navgation = () => {
  return (
    <div className="create-new-form">
      <BlogFormHeader user={auth.currentUser} handleLogout={handleLogout} />
      <nav>
        <NavLink to="/users" activeStyle={activeStyle}>
          Users
        </NavLink>
        <NavLink to="/blogs" activeStyle={activeStyle}>
          Blogs
        </NavLink>
      </nav>
    </div>
  );
};

export default Navgation;
