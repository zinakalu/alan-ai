import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from "./Login";
import SignUp from "./SignUp";

const router = createBrowserRouter([
  { path: "/va", element: <App /> },
  { path: "/login", element: <Login /> },
  { path: "/", element: <SignUp /> },
]);

function MainApp() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  if (isLoggedIn) {
    return (
      <div>
        <App />
        <button onClick={handleLogout}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      {isSignUp ? <SignUp /> : <Login onLogin={handleLogin} />}
      <button onClick={() => setIsSignUp(!isSignUp)}>
        Switch to {isSignUp ? "Login" : "Sign Up"}
      </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <RouterProvider router={router}>
    <MainApp />
  </RouterProvider>
);
