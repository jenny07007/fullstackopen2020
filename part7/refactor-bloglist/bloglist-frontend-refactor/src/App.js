import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Route, Switch, useHistory, Link } from "react-router-dom";

import {
  signIn,
  signOut,
  setNotification,
  createBlog,
  setAToken,
} from "./actions";

import Landing from "./components/Landing";
import UsersView from "./components/UsersView";
import BlogsView from "./components/BlogsView";
import UserBlogs from "./components/users/UserBlogs";
import "./App.css";

function App() {
  // const blogs = useSelector((state) => state.blogs);
  const [newBlog, setNewBlog] = useState({ title: "", author: "", url: "" });
  const [userLoginInfo, setUserLoginInfo] = useState({
    username: "",
    password: "",
  });
  // const blogFormRef = React.createRef();
  const auth = useSelector(({ auth }) => auth);
  const dispatch = useDispatch();
  const history = useHistory();

  // sync auth state to localstorage
  useEffect(() => {
    if (!auth.currentUser) {
      window.localStorage.setItem("LoggedInUser", JSON.stringify(""));
    } else {
      dispatch(setAToken(auth.currentUser.token));
      window.localStorage.setItem(
        "LoggedInUser",
        JSON.stringify(auth.currentUser.token)
      );
    }
  }, [dispatch, auth]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("LoggedInUser");
    if (!loggedUserJSON) return null;
    const token = JSON.parse(loggedUserJSON);
    dispatch(setAToken(token));
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

      setUserLoginInfo({ username: "", password: "" });
      history.push("/users");
    } catch (error) {
      return showHideNotification("Error!", `${auth.error}`);
    }
  };

  const handleLogout = () => {
    dispatch(signOut());
    window.localStorage.removeItem("LoggedInUser");
    dispatch(setAToken(""));
    history.push("/");
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

    // blogFormRef.current.toggleVisibility();

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

  return (
    <div>
      <Switch>
        <Route path="/" exact>
          <Landing
            handleLogin={handleLogin}
            userLoginInfo={userLoginInfo}
            onUserLoginInfoChange={onUserLoginInfoChange}
          />
        </Route>
        <Route
          path="/users"
          exact
          render={() => <UsersView handleLogout={handleLogout} />}
        />
        <Route
          path="/users/:id"
          render={() => <UserBlogs handleLogout={handleLogout} />}
        />
        <Route path="/blogs" exact>
          <BlogsView
            handleLogout={handleLogout}
            onNewblogChange={onNewblogChange}
            onAddNewBlog={onAddNewBlog}
            newBlog={newBlog}
          />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
