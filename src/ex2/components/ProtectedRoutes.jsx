import React, { useContext } from "react";

import { Redirect, useLocation } from "react-router-dom";
import { App2Context } from "./App2Context";

const ProtectedRoute = ({ children }) => {
  const { isAuth } = useContext(App2Context);
  let location = useLocation();
  if (!isAuth) {
    return <Redirect to="/login" state={{ from: location }} replace />;
  }
  return children;
};

export default ProtectedRoute;
