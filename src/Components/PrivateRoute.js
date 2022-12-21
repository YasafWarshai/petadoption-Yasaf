import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import authContext from "../Context/AuthContext";

export default function PrivateRoute(props) {
  const { children } = props;
  const { token } = useContext(authContext);
  return !token ? <Navigate to="/" /> : children;
}
