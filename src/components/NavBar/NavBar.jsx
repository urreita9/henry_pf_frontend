import * as React from "react";
import {
  Button,
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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  getUser,
  LoginAction,
  LogoutAction,
} from "../../redux/actions/actions";

import { ButtonMapFilter } from "../MapFilters/ButtonFilter";
import { ButtonModalToMapFilter } from "../MapFilters/ButtonModalToMapFilter";
import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
// import StepperModal from "../../views/Stepper/Stepper";
// const pages = ["Products", "Pricing", "Blog"];
const settings = ["Profile", "History", "Be a caretaker!"];

//! MAIN NAVBAR 👇
const NavBar = ({ onToggle, typeMode }) => {
  const dispatch = useDispatch();
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const token = localStorage.getItem("token") || null;
  const id = localStorage.getItem("uid") || null;

  const { caretakers } = useSelector((state) => state.cuidadoresReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { logged } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const location = useLocation();

  const checkIfUserIsCaretaker = (idUser) => {
    const findUser = caretakers.find(
      (caretaker) => caretaker.userId === idUser
    );
    if (findUser) {
      console.log(findUser);
      return true;
    }
    return false;
  };
  const handleOpenNavMenu = (event) => {
    event.preventDefault();
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    event.preventDefault();
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(LogoutAction());
    dispatch(clearUser());
    navigate("/");
  };

  React.useEffect(() => {
    // const token = localStorage.getItem('token') || null;
    // const id = localStorage.getItem('uid') || null;

    if (token && id) {
      dispatch(getUser(token, id));
    }
  }, [logged]);

  React.useEffect(() => {
    if (user.hasOwnProperty("id")) {
      dispatch(LoginAction());
    } else if (user.hasOwnProperty("msg") || user.hasOwnProperty("error")) {
      localStorage.clear();
      dispatch(LogoutAction());
    }
  }, [user]);

  return (
    <>
     {location.pathname === "/map" && (
       <ButtonModalToMapFilter />
           
      )}
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
                
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              cursor: "pointer",
              flexGrow: 1,
              display: { xs: "flex", md: "none" },
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <PetsIcon />
            PetTrip App
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              textAlign: "center",
              display: { xs: "none", md: "flex" },
            }}
          >
            {/* {logged &&
              !checkIfUserIsCaretaker(user.id) &&
              pages.map((page) => (
                // <Link to='/host' key={page}>
                <Button
                key={page}
                  // onClick={handleCloseNavMenu}
                  onClick={() => {
                    navigate("/host");
                  }}
                  sx={{ my: 2, color: "white", display: "block" }}
                  >
                  {page}
                  </Button>
                // </Link>
              ))}  */}
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

          {/* //! VALIDACION PARA VER SI ESTA LOGUEADO 🔻 */}
          {logged ? (
            <>
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
                ></Menu>
              </Box>
              <Box sx={{ flexGrow: 0 }}>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="not found" src={user.img} />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: "45px" }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {settings.map((setting) => (
                    <Link to="/profile">
                      <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                      </MenuItem>
                    </Link>
                  ))}
                  <Button
                    sx={{
                      // backgroundColor: '#cc3308',
                      marginLeft: "10px",
                    }}
                    variant="contained"
                    onClick={handleLogout}
                  >
                    Logout
                  </Button>
                </Menu>
              </Box>
            </>
          ) : (
            <>
              <RegisterModal />

              <LoginModal />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
          </>
  );
};
export default NavBar;
