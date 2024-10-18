import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/login",
        {
          username,
          password,
        },
        {
          withCredentials: true, // This ensures the cookie is sent with the request
        }
      );

      if (response.status === 200) {
        toast.success("Login successful!");

        // No need to store token in localStorage since it's stored in an HTTP-only cookie
        // Optionally redirect to another page, e.g., navigate("/dashboard")
      } else {
        toast.error("Login failed! Invalid credentials.");
      }
    } catch (error) {
      // Handle error responses
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Login failed!"}`);
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
