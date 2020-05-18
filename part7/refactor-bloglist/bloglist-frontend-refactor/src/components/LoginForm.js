import React from "react";

const LoginForm = ({ handleLogin, userLoginInfo, onUserLoginInfoChange }) => {
  return (
    <form onSubmit={handleLogin} className="form-login">
      <div className="form-item">
        <label>username</label>
        <input
          type="text"
          value={userLoginInfo.username}
          name="username"
          onChange={onUserLoginInfoChange}
        />
      </div>
      <div className="form-item">
        <label>password</label>
        <input
          type="password"
          value={userLoginInfo.password}
          name="password"
          onChange={onUserLoginInfoChange}
        />
      </div>
      <button className="btn submit-btn" type="submit">
        Login
      </button>
    </form>
  );
};

export default LoginForm;
