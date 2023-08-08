import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

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
    <form onSubmit={handleSubmit}>
      <h2>Sign Up</h2>
      <input
        type="text"
        placeholder="Enter Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="email"
        placeholder="Enter Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type={showPassword ? "text" : "password"}
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        type="checkbox"
        checked={showPassword}
        onChange={() => setShowPassword(!showPassword)}
      />{" "}
      Show Password
      <button type="submit">Sign Up</button>
    </form>
  );
}

export default SignUp;
