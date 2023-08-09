import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignUp.module.css";

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function validatePassword(password) {
    const regex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{5,}$/;
    return regex.test(password);
  }

  function handleSubmit(e) {
    e.preventDefault();
    e.stopPropagation();

    if (!validatePassword(password)) {
      alert(
        "Password must contain at least one uppercase letter, one lowercase letter, a number, and a special character."
      );
      return;
    }

    navigate("/va", { state: { username, email } });
    console.log("Username: ", username);
    console.log("Email: ", email);
    console.log("Password: ", password);
  }

  return (
    <div className={styles.body}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <h2 className={styles.header}>Sign Up</h2>
        <input
          type="text"
          placeholder="Enter Username"
          className={styles.textInput}
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Enter Email"
          className={styles.emailInput}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Password"
          className={styles.passwordInput}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className={styles.checkboxLabel}>
          <input
            type="checkbox"
            className={styles.checkboxInput}
            checked={showPassword}
            onChange={() => setShowPassword(!showPassword)}
          />
          Show Password
        </label>

        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default SignUp;
