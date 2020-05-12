import React from "react";
import Notification from "./Notification";
import LoginForm from "./LoginForm";

const Landing = ({ handleLogin, userLoginInfo, onUserLoginInfoChange }) => {
  return (
    <div className="home-login">
      <h2>Log in</h2>
      <Notification />
      <LoginForm
        handleLogin={handleLogin}
        userLoginInfo={userLoginInfo}
        onUserLoginInfoChange={onUserLoginInfoChange}
      />
    </div>
  );
};

export default Landing;
