import React, { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import axios from "axios";

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Send a request to the backend to verify if the user is authenticated
        await axios.get("http://localhost:5000/api/posts", {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setIsAuthenticated(true);
      } catch (error) {
        setIsAuthenticated(false);
      }
    };

    checkAuth();
  }, []);

  if (isAuthenticated === null) {
    // Show a loading spinner or placeholder while checking authentication
    return <div>Loading...</div>;
  }

  // If authenticated, render the protected component; otherwise, redirect to login
  return isAuthenticated ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
