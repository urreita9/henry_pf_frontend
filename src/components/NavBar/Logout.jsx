import Button from "@mui/material/Button";
import React from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { clearUser, LogoutAction } from "../../redux/actions/actions";

export const Logout = () => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    localStorage.clear();
    dispatch(LogoutAction());
    dispatch(clearUser());
    Navigate("/");
  };

  return (
    <Button variant="text" color="default" onClick={handleLogout}>
      LOGOUT
    </Button>
  );
};
