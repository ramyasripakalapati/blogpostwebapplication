import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Container } from "react-bootstrap"; // Importing react-bootstrap components
import toast from "react-hot-toast";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Footer from "../pages/Footer.js";

const Header = () => {
  // Global state for login check
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem("userId");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State to handle active link
  const [activeLink, setActiveLink] = useState(0);

  // Handle Logout
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success("Logout Successfully");
      localStorage.clear(); // Clear local storage
      navigate("/login"); // Redirect to login page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark sticky-top">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            My Blog APP
          </Link>
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
          <div className="collapse navbar-collapse" id="navbarNav">
            {isLogin && (
              <ul className="navbar-nav mx-auto">
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeLink === 0 ? "active" : ""}`}
                    to="/blogs"
                    onClick={() => setActiveLink(0)}
                  >
                    Home
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeLink === 1 ? "active" : ""}`}
                    to="/my-blogs"
                    onClick={() => setActiveLink(1)}
                  >
                    My Blogs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link
                    className={`nav-link ${activeLink === 2 ? "active" : ""}`}
                    to="/create-blog"
                    onClick={() => setActiveLink(2)}
                  >
                    Create Blog
                  </Link>
                </li>
              </ul>
            )}
            <div className="d-flex ms-auto">
              {isLogin ? (
                <button className="btn btn-outline-light" onClick={handleLogout}>
                  Logout
                </button>
              ) : (
                <>
                  <Link className="btn btn-outline-light me-2" to="/login">
                    Login
                  </Link>
                  <Link className="btn btn-outline-light" to="/register">
                    Register
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Landing Section */}
      <Container
        fluid
        className="bg-primary text-light py-5 text-center d-flex flex-column justify-content-center flex-grow-1"
      >
        <h1>Welcome to our Blogs</h1>
        <p>Explore a number of blogs from various categories...!</p>
        {/* Search Form */}
        <Form.Control
          type="search"
          placeholder="Search your Blogs here"
          className="mb-3 w-50 mx-auto"
        />
      </Container>

      {/* Footer */}
      <footer className="bg-dark text-light py-4 text-center">
        <div className="container text-center">
          <div className="col-md-12 text-center">
            <h5>Contact</h5>
            <p>
              Feel free to reach out to us 
            </p>
            <p>Follow us on social media:</p>
            <a
              href="https://www.facebook.com"
              className="text-light me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.twitter.com"
              className="text-light me-3"
              target="_blank"
              rel="noopener noreferrer"
            >
              Twitter
            </a>
            <a
              href="https://www.instagram.com"
              className="text-light"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </div>
        </div>
        <div className="text-center mt-4">
          <p>&copy; 2025 My Blog APP. All Rights Reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Header;
