import { Navigate, Outlet } from "react-router";

/* eslint-disable react/prop-types */
const ProtectedRoute = ({ children, user, redirect = "/login" }) => {
  if (!user) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default ProtectedRoute;
