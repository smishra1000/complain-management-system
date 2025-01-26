// src/components/NavbarUser.js
import React from "react";
import { Link } from "react-router-dom";

const NavbarUser = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  };

  return (
    <nav>
      <Link to="/user/complaintlist">My Complaints</Link>
      <Link to="/user/createcomplaint">New Complaint</Link>
      {/* <Link to="/user/editcomplaint/:id">Edit Complaint</Link> */}
      <button onClick={handleLogout}>Logout</button>
    </nav>
  );
};

export default NavbarUser;
