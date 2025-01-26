// src/components/AdminPage.js
import React from "react";

import { Outlet } from "react-router-dom";
import NavbarAdmin from "./NavbarAdmin";

const AdminPage = () => {
  return (
    <div className="container-fluid">
      <NavbarAdmin />
      <h1>Admin Dashboard</h1>
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};

export default AdminPage;