import React, { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN } from "./queries";

const LoginForm = ({ setToken, setError, show, setPage }) => {
  const [username, setUsername] = useState("helloworld");
  const [password, setPassword] = useState("helloworld");

  const [login, result] = useMutation(LOGIN, {
    onError: (err) => setError(err.graphQLErrors[0].message),
  });

  useEffect(() => {
    if (result.data) {
      const token = result.data.login.value;
      setToken(token);
      localStorage.setItem("library-token", token);
    }
  }, [result.data]); // eslint-disable-line

  const handleSumit = async (e) => {
    e.preventDefault();
    login({ variables: { username, password } });
    setPage("books");
  };

  if (!show) return null;

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSumit}>
        <div>
          username
          <input
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          passowrd
          <input
            type="password"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
