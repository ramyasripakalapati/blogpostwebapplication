import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Blogs from "./Blogs.js"; // Ensure this path is correct
import Footer from "./Footer.js";

const Dashboard = () => {
  const navigate = useNavigate();

  // Logout function to clear token and navigate to login
  const handleLogout = () => {
    localStorage.removeItem('token');  // Remove the token from localStorage
    navigate('/login');  // Redirect to the login page
  };

  return (
    <div className="d-flex flex-column min-vh-100"> {/* Ensure full-height layout */}
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">My Blog APP</Link>

          {/* Navbar Toggler Button */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/blogs">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-blogs">My Blogs</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/create-blog">Create Blog</Link>
              </li>
            </ul>

            {/* Logout Button */}
            <div className="d-flex ms-auto">
              <button className="btn btn-outline-light" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Blogs Section */}
      <div className="container mt-4 flex-grow-1">
        <Blogs /> {/* This component will render your blogs */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Dashboard;
