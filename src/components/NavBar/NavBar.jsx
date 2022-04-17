import * as React from "react";
import {
  MenuItem,
  Tooltip,
  Button,
  Avatar,
  Container,
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
} from "@mui/material/";
import MenuIcon from "@mui/icons-material/Menu";
import PetsIcon from "@mui/icons-material/Pets";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";

import { Link } from "react-router-dom";
import { HostLinkButton } from "../LinkToHostButton/HostLinkButton";

const pages = ["HOST A PET!"];
const settings = ["Profile", "History", "CareTaker Dashboard"];

const NavBar = ({ onToggle, typeMode }) => {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              <PetsIcon />

              <Button
                sx={{
                  color: "white",
                }}
                style={{ marginLeft: "10px" }}
              >
                PetTrip App
              </Button>
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {pages.map((page) => (
                <Link to="/host" key={page}>
                  <MenuItem>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                </Link>
              ))}
            </Menu>
          </Box>
          <Link to="/" style={{ textDecoration: "none", flexGrow: 1 }}>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
            >
              <PetsIcon />
              PetTrip App
            </Typography>
          </Link>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Link to="/host" key={page}>
                <Button
                  key={page}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: "white", display: "block" }}
                >
                  {page}
                </Button>
              </Link>
            ))}
          </Box>
          <Box>
            <IconButton
              onClick={() => {
                typeMode === "light" ? onToggle(true) : onToggle(false);
              }}
            >
              {typeMode === "light" ? <Brightness7Icon /> : <Brightness4Icon />}
            </IconButton>
          </Box>
          {/* BOX DE USUARIO ⬇ */}
          <>
            <Button
              href="/register"
              sx={
                {
                  // backgroundColor: '#09a11d',
                }
              }
              variant="contained"
              style={{ marginRight: "5px" }}
            >
              Register
            </Button>

            <Button
              href="/login"
              sx={
                {
                  // backgroundColor: '#cc3308',
                }
              }
              variant="contained"
            >
              Login
            </Button>
          </>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default NavBar;
