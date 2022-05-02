import { useEffect, useState } from 'react';
import { Button, Container, AppBar, Box, Toolbar, IconButton, Typography, Menu } from '@mui/material/';
import PetsIcon from '@mui/icons-material/Pets';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, getUser, LoginAction, LogoutAction } from '../../redux/actions/actions';

import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { ButtonModalToMapFilter } from '../MapFilters/ButtonModalToMapFilter';
import { useGoogleLogout, GoogleLogout } from 'react-google-login';
import { clearOperations } from '../../redux/actions/operationActions';
import { useSocket } from '../../hooks/useSocket';

//! MAIN NAVBAR 👇
const NavBar = ({ onToggle, typeMode }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    // const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = useState(null);
    const token = localStorage.getItem('token') || null;
    const id = localStorage.getItem('uid') || null;
    const handleLogoutGoogle = (event) => {};

    const { signOut, loaded } = useGoogleLogout({
        clientId: '221755505254-ckd8nt7ukp091rrvgp9gnuns7fq18rpk.apps.googleusercontent.com',
        onLogoutSuccess: handleLogoutGoogle,
    });

    const [settings, setSettings] = useState([
        { text: 'Profile', link: '/profile' },
        { text: 'History', link: '/history' },
        { text: 'Admin', link: '/admin' },
        { text: 'Be a caretaker!', link: '/profile/4' },
    ]);
    const [openRegister, setOpenRegister] = useState(false);
    const [openLogin, setOpenLogin] = useState(false);

    const [openMenu, setOpenMenu] = useState(true);

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
    const checkMenu = () => {
        const finalMenu = [
            { text: 'Profile', link: '/profile' },
            { text: 'History', link: '/history' },
        ];
        if (user.role === 'ADMIN' || user.role === 'SUPER_ADMIN') {
            finalMenu.push({ text: 'Admin', link: '/admin' });
        }
        if (!user.caretaker) {
            finalMenu.push({ text: 'Be a caretaker!', link: '/profile/4' });
        }
        setSettings(finalMenu);
    };

    const handleOpenUserMenu = (event) => {
        checkMenu();
        if (logged) {
            setOpenMenu(true);
            if (openMenu) {
                setAnchorElUser(event.currentTarget);
            }
        }
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const handleLogout = (e) => {
        localStorage.clear();
        dispatch(LogoutAction());
        dispatch(clearUser());
        dispatch(clearOperations());
        navigate('/');
        setOpenLogin(false);
        setOpenRegister(false);
        setAnchorElUser(null);
        signOut();
    };

    useEffect(() => {
        if (token && id) {
            dispatch(getUser(token, id));
        } else {
            dispatch(LogoutAction());
        }
    }, [logged]);

    useEffect(() => {
        if (user.hasOwnProperty('id')) {
            dispatch(LoginAction());
        } else if (user.hasOwnProperty('msg') || user.hasOwnProperty('error')) {
            localStorage.clear();
            dispatch(LogoutAction());
        }
    }, [user]);

    return (
        <>
            {location.pathname === '/map' && <ButtonModalToMapFilter />}
            <AppBar position='static'>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <Box
                            sx={{
                                display: 'flex',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                gap: '15px',
                            }}
                        >
                            <PetsIcon
                                sx={{
                                    width: '40px',
                                    height: '32px',
                                }}
                            />
                            <Typography
                                variant='h6'
                                noWrap
                                component='div'
                                sx={{
                                    cursor: 'pointer',
                                    flexGrow: 1,
                                    display: 'flex',
                                }}
                                onClick={() => {
                                    navigate('/');
                                }}
                            >
                                PetTrip
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                flexGrow: 1,
                                textAlign: 'center',
                                display: { xs: 'none', md: 'flex' },
                            }}
                        ></Box>
                        <Box>
                            <IconButton
                                onClick={() => {
                                    typeMode === 'light' ? onToggle(true) : onToggle(false);
                                }}
                            >
                                {typeMode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
                            </IconButton>
                        </Box>

                        {/* //! VALIDACION PARA VER SI ESTA LOGUEADO 🔻 */}
                        {logged ? (
                            <>
                                <Box>
                                    <Tooltip title='Open settings'>
                                        <IconButton
                                            onClick={handleOpenUserMenu}
                                            sx={{ p: 0 }}
                                            aria-controls='menu-appbar'
                                        >
                                            <Avatar alt='not found' src={user.img} />
                                        </IconButton>
                                    </Tooltip>
                                    {openMenu && (
                                        <Menu
                                            sx={{ mt: '45px' }}
                                            id='menu-appbar'
                                            anchorEl={anchorElUser}
                                            anchorOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            keepMounted
                                            transformOrigin={{
                                                vertical: 'top',
                                                horizontal: 'right',
                                            }}
                                            open={Boolean(anchorElUser)}
                                            onClose={handleCloseUserMenu}
                                        >
                                            {settings.map((setting, index) => (
                                                <Box key={index} onClick={() => navigate(setting.link)}>
                                                    <MenuItem key={setting.text} onClick={handleCloseUserMenu}>
                                                        <Typography textAlign='center'>{setting.text}</Typography>
                                                    </MenuItem>
                                                </Box>
                                            ))}
                                            <Box textAlign='center'>
                                                <Button
                                                    sx={{
                                                        width: '90%',
                                                        margin: '0 auto',
                                                    }}
                                                    variant='contained'
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
                                <LoginModal openLogin={openLogin} handleLoginModal={handleLoginModal} />
                                <RegisterModal
                                    openRegister={openRegister}
                                    handleRegisterModal={handleRegisterModal}
                                    sx={{
                                        margin: '2px 5px',
                                    }}
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
