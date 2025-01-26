import React from "react";
import { Link, Navigate } from "react-router-dom";
import { getUserRole } from "../utils/auth"; // Assume a utility function that checks if the user is logged in

const LandingPage = () => {
  const userRole = getUserRole(); // Check if user is logged in
  if (userRole) {
    return <Navigate to={`/${userRole}`} />;
  }

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-light custom-navbar">
        <div className="container">
          <a className="navbar-brand" href="/">ComplaintManagementSystem</a>
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
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link to="/login" className="btn btn-primary">Login</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="container mt-5">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="display-4">Welcome to Complaint Management System</h1>
            <p className="lead">
              Streamline the process of raising and resolving complaints effortlessly.
              Designed for both users and administrators, our system makes complaint
              management seamless and efficient.
            </p>
            <Link to="/login" className="btn btn-primary btn-lg">Get Started</Link>
          </div>
          <div className="col-md-6">
            <img
              src="https://as1.ftcdn.net/v2/jpg/02/11/07/58/1000_F_211075851_gSKybVNvDWgZnrIaleNsQfIz2mqPKaor.jpg"
              alt="Hero"
              className="img-fluid"
            />
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-light py-4 mt-5">
        <div className="container">
          <div className="row">
            <div className="col-md-4">
              <h5>About</h5>
              <p>Complaint Management System helps users to submit and resolve complaints efficiently.</p>
            </div>
            <div className="col-md-4">
              <h5>Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/login">Login</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
              </ul>
            </div>
            <div className="col-md-4">
              <h5>Contact</h5>
              <p>Email: smishranitrr@gmail.com</p>
              <p>Phone: 8686478524</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
