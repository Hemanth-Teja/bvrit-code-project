import React from "react";
import { Outlet } from "react-router-dom";

const PrivateRoute = () => {
  return <Outlet />; // Always allows access
};

export default PrivateRoute;
