import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

export const HostLinkButton = () => {
  return (
    <Link to="/host">
      <Button variant="text" color="default">
        HOST A PET!
      </Button>
    </Link>
  );
};
