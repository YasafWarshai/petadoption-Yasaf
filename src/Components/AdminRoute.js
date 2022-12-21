import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import authContext from "../Context/AuthContext";

export default function AdminRoute(props) {
  const { children } = props;
  const { userInfo } = useContext(authContext);
  return !userInfo.isAdmin ? <Navigate to="/" /> : children;
}
