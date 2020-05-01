import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  signIn,
  signOut,
  setNotification,
  createBlog,
  setAToken,
} from "./actions";

import BlogList from "./components/BlogList";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import BlogFormHeader from "./components/BlogFormHeader";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import "./App.css";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);
  // const blogs = useSelector((state) => state.blogs);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [userLoginInfo, setUserLoginInfo] = useState({
    username: "",
    password: "",
  });
  const blogFormRef = React.createRef();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("LoggedInUser");
    if (!loggedUserJSON) return null;
    const user = JSON.parse(loggedUserJSON);
    dispatch(setAToken(user.token));
  }, [dispatch]);

  const showHideNotification = (type, message) => {
    dispatch(setNotification(type, message, 5));
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const { username, password } = userLoginInfo;
    if (!username || !password) {
      return showHideNotification("Error!", "incorrect username or password!");
    }

    try {
      dispatch(signIn({ username, password }));
      dispatch(setAToken(auth.token));

      window.localStorage.setItem("LoggedInUser", JSON.stringify(auth));

      setUserLoginInfo({ username: "", password: "" });
    } catch (error) {
      showHideNotification("Error!", `${error}`);
    }
  };

  const handleLogout = () => {
    dispatch(signOut());
    window.localStorage.removeItem("LoggedInUser");
    dispatch(setAToken(""));
  };

  const onNewblogChange = (e) => {
    const { name, value } = e.target;
    setNewBlog((prev) => ({ ...prev, [name]: value }));
  };

  const onUserLoginInfoChange = (e) => {
    const { name, value } = e.target;
    setUserLoginInfo((prev) => ({ ...prev, [name]: value }));
  };

  const onAddNewBlog = async (e) => {
    e.preventDefault();

    blogFormRef.current.toggleVisibility();

    const { title, author, url } = newBlog;
    try {
      const newBlogObj = {
        title,
        author,
        url,
      };
      dispatch(createBlog(newBlogObj));
      showHideNotification(
        "success!",
        `"${title} by ${author}" has been created!`
      );
      setNewBlog({ title: "", author: "", url: "" });
    } catch (error) {
      showHideNotification("Error!", `${error.message}`);
    }
  };

  const blogForm = () => {
    return (
      <div className="create-new-form">
        <h2>blogs</h2>
        <BlogFormHeader user={auth} handleLogout={handleLogout} />
        <Notification />
        <div>
          <Togglable buttonLabel="New Blog" ref={blogFormRef}>
            <BlogForm
              onNewblogChange={onNewblogChange}
              onAddNewBlog={onAddNewBlog}
              newBlog={newBlog}
            />
          </Togglable>
        </div>
        <ul>
          <BlogList />
        </ul>
      </div>
    );
  };

  return (
    <div>
      {auth.isSignedIn && auth.userId ? (
        blogForm()
      ) : (
        <div className="home-login">
          <h2>Log in</h2>
          <Notification />
          <LoginForm
            handleLogin={handleLogin}
            userLoginInfo={userLoginInfo}
            onUserLoginInfoChange={onUserLoginInfoChange}
          />
        </div>
      )}
    </div>
  );
}

export default App;
