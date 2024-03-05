import React from "react";
import { Outlet } from "react-router";

const AdminPage = () => {
  return (
    <div>
      <Outlet />
    </div>
  );
};

export default AdminPage;
