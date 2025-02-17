// src/components/UserPage.js
import React from "react";
import NavbarUser from "./NavbarUser";
import { Outlet } from "react-router-dom";

const UserPage = () => {
  return (
    <div className="container-fluid">
      <NavbarUser />
      <Outlet /> {/* This will render the nested routes */}
    </div>
  );
};

export default UserPage;
