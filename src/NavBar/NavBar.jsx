import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import { LoginButton } from "../components/login/Login";
import { LogoutButton } from "../components/Logout/Logout";
import { Profile } from "../components/Profile/Profile";
import { useAuth0 } from "@auth0/auth0-react";
import PetsIcon from "@mui/icons-material/Pets";
import { Link } from "react-router-dom";
function NavBar() {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton> */}
          <PetsIcon />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Petripp App
          </Typography>
          {isAuthenticated ? (
            <>
              <Profile />
              <LogoutButton />
            </>
          ) : (
            <LoginButton />
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default NavBar;
