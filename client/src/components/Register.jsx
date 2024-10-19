import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

import axios from "axios";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/register",
        {
          username,
          password,
        }
      );

      if (response) {
        toast.success("Registration successful!");
        // Optionally navigate to login or another page
        navigate("/login");
      } else {
        toast.error("Registration failed!");
      }
    } catch (error) {
      // Handle network errors or any other errors
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        toast.error(
          `Error: ${error.response.data.message || "Registration failed!"}`
        );
      } else if (error.request) {
        // The request was made but no response was received
        toast.error("No response from the server. Please try again later.");
      } else {
        // Something happened in setting up the request that triggered an Error
        toast.error("An unexpected error occurred. Please try again.");
      }
    }
  };

  return (
    <div>
      <h2>Register</h2>
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
        <button type="submit">Register</button>
      </form>
    </div>
  );
}

export default Register;
