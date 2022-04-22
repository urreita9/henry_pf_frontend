import { useEffect, useState } from "react";
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
import PetsIcon from "@mui/icons-material/Pets";
import Brightness7Icon from "@mui/icons-material/Brightness7";
import Brightness4Icon from "@mui/icons-material/Brightness4";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  clearUser,
  getUser,
  LoginAction,
  LogoutAction,
} from "../../redux/actions/actions";

import LoginModal from "../LoginModal/LoginModal";
import RegisterModal from "../../components/RegisterModal/RegisterModal";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import Avatar from "@mui/material/Avatar";
import {ButtonModalToMapFilter} from '../MapFilters/ButtonModalToMapFilter'

//! MAIN NAVBAR 👇
const NavBar = ({ onToggle, typeMode }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  // const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const token = localStorage.getItem("token") || null;
  const id = localStorage.getItem("uid") || null;

  const [settings, setSettings] = useState([
    { text: "Profile", link: "/profile" },
    { text: "History", link: "/history" },
    { text: "Be a caretaker!", link: "/host" },
  ]);
  const [openRegister, setOpenRegister] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);

  const [openMenu, setOpenMenu] = useState(false);

  const { caretakers } = useSelector((state) => state.cuidadoresReducer);
  const { user } = useSelector((state) => state.userReducer);
  const { logged } = useSelector((state) => state.userReducer);
  const navigate = useNavigate();

  const handleRegisterModal = () => {
    setOpenRegister(!openRegister);
  };
  const handleLoginModal = () => {
    setOpenLogin(!openLogin);
  };
  const checkIfUserIsCaretaker = (idUser) => {
    const findUser = caretakers.find(
      (caretaker) => caretaker.userId === idUser
    );
    if (findUser) {
      setSettings([
        { text: "Profile", link: "/profile" },
        { text: "History", link: "/history" },
      ]);
      return true;
    }
    return false;
  };

  const handleOpenUserMenu = (event) => {
    checkIfUserIsCaretaker(user.id);
    setAnchorElUser(event.currentTarget);
    setOpenMenu(true);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(LogoutAction());
    dispatch(clearUser());
    navigate("/");
    setOpenLogin(false);
    setOpenRegister(false);
  };

  useEffect(() => {
    if (token && id) {
      dispatch(getUser(token, id));
    }
  }, [logged]);

  useEffect(() => {
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
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              cursor: "pointer",
              flexGrow: 1,
              display: "flex",
            }}
            onClick={() => {
              navigate("/");
            }}
          >
            <PetsIcon />
            PetTrip
          </Typography>

          <Box
            sx={{
              flexGrow: 1,
              textAlign: "center",
              display: { xs: "none", md: "flex" },
            }}
            ></Box>
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
              <Box>
                <Tooltip title="Open settings">
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt="not found" src={user.img} />
                  </IconButton>
                </Tooltip>
                {openMenu && (
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
                      <Box onClick={() => navigate(setting.link)}>
                        <MenuItem
                          key={setting.text}
                          onClick={handleCloseUserMenu}
                        >
                          <Typography textAlign="center">
                            {setting.text}
                          </Typography>
                        </MenuItem>
                      </Box>
                    ))}
                    <Box textAlign="center">
                      <Button
                        sx={{
                          width: "90%",
                          margin: "0 auto",
                        }}
                        variant="contained"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Box>
                  </Menu>
                )}
              </Box>
            </>
          ) : (
            <>
              <RegisterModal
                openRegister={openRegister}
                handleRegisterModal={handleRegisterModal}
              />

              <LoginModal
                openLogin={openLogin}
                handleLoginModal={handleLoginModal}
              />
            </>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  </>
  );
};
export default NavBar;
