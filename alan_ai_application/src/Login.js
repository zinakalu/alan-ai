import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    console.log("Username: ", username);
    console.log("Password: ", password);
    navigate("/va", { state: { username } });
  }
  function handleSignupRedirect() {
    navigate("/signup");
  }
  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className={styles.textInput}
      />

      <input
        type="text"
        placeholder="Enter password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className={styles.passwordInput}
      />

      <div className={styles.buttonsContainer}>
        <button type="submit" className={styles.button}>
          Login
        </button>
        <button className={styles.button} onClick={handleSignupRedirect}>
          Sign Up
        </button>
      </div>
    </form>
  );
}

export default Login;
