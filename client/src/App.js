import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Posts from "./components/Posts";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";

function App() {
  return (
    <Router>
      <ToastContainer pauseOnFocusLoss={false} />

      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<PrivateRoute />}>
          <Route path="" element={<Posts />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
