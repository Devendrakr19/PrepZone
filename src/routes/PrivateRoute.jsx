import React from "react";
import { Navigate } from "react-router-dom";

function PrivateRoute({ isSignedIn, children }) {
  if (!isSignedIn) {
    return <Navigate to="/" replace />;
  }
  return <Layout>{children}</Layout>;
}
export default PrivateRoute;