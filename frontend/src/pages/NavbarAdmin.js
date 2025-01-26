// src/components/NavbarAdmin.js
import React from "react";
import { Link } from "react-router-dom";

const NavbarAdmin = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav>
      <Link to="/admin/dashboard">Dashboard</Link>
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavbarAdmin;
