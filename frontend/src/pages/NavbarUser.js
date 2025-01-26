// src/components/NavbarUser.js
import React from "react";
import { Link } from "react-router-dom";

const NavbarUser = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{ backgroundColor: '#26A69A' }}>
    <div className="container">
      <Link className="navbar-brand" to="/">
        Complaint Manager
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
        <ul className="navbar-nav me-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/user/complaintlist">
              My Complaints
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/user/createcomplaint">
              New Complaint
            </Link>
          </li>
        </ul>
        <button className="btn btn-outline-light" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  </nav>
  );
};

export default NavbarUser;
