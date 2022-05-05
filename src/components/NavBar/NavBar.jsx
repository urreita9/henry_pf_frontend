import { useEffect, useState } from 'react';
import {
	Button,
	Container,
	AppBar,
	Box,
	Toolbar,
	IconButton,
	Typography,
	Menu,
	Badge,
} from '@mui/material/';
import PetsIcon from '@mui/icons-material/Pets';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearUser,
	getUser,
	LoginAction,
	LogoutAction,
} from '../../redux/actions/actions';
import MailIcon from '@mui/icons-material/Mail';
import LoginModal from '../LoginModal/LoginModal';
import RegisterModal from '../../components/RegisterModal/RegisterModal';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import Avatar from '@mui/material/Avatar';
import { ButtonModalToMapFilter } from '../MapFilters/ButtonModalToMapFilter';
import { useGoogleLogout, GoogleLogout } from 'react-google-login';
import { clearOperations } from '../../redux/actions/operationActions';
import { useSocket } from '../../hooks/useSocket';
import { clearChat } from '../../redux/actions/chatActions';

//! MAIN NAVBAR 👇
const NavBar = ({ onToggle, typeMode }) => {
	const dispatch = useDispatch();
	const location = useLocation();
	const [anchorElUser, setAnchorElUser] = useState(null);
	const token = localStorage.getItem('token') || null;
	const id = localStorage.getItem('uid') || null;
	const handleLogoutGoogle = (event) => {};
	const { chats } = useSelector((state) => state.chatReducer);
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
	const { logged, user } = useSelector((state) => state.userReducer);
	const navigate = useNavigate();
	const [chatNoti, setChatNoti] = useState(0);

	useEffect(() => {
		var count = 0;
		chats.forEach((el) => {
			el.notifications.forEach((noti) => {
				if (noti.userId === user.id) {
					count++;
				}
			});
		});

		setChatNoti(count);
	}, [chats]);

	const { signOut, loaded } = useGoogleLogout({
		clientId:
			'221755505254-ckd8nt7ukp091rrvgp9gnuns7fq18rpk.apps.googleusercontent.com',
		onLogoutSuccess: handleLogoutGoogle,
	});

	const handleRegisterModal = () => {
		setOpenRegister(!openRegister);
	};
	const handleLoginModal = () => {
		setOpenLogin(!openLogin);
	};

	function notificationsLabel(count) {
		if (count === 0) {
			return 'no notifications';
		}
		if (count > 99) {
			return 'more than 99 notifications';
		}
		return `${count} notifications`;
	}
	const checkMenu = () => {
		const finalMenu = [
			{ text: 'Profile', link: '/profile' },
			{ text: 'History', link: '/profile/6' },
			{ text: 'Chat', link: '/chat' },
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
		dispatch(clearChat());
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
								className='no-focus'
							>
								{typeMode === 'light' ? (
									<Brightness7Icon />
								) : (
									<Brightness4Icon />
								)}
							</IconButton>
						</Box>

						{/* //! VALIDACION PARA VER SI ESTA LOGUEADO 🔻 */}
						{logged ? (
							<>
								<Box>
									<IconButton
										aria-label={notificationsLabel(chatNoti)}
										onClick={() => {
											navigate('/chat');
										}}
										className='no-focus'
									>
										<Badge badgeContent={chatNoti} color='secondary'>
											<MailIcon />
										</Badge>
									</IconButton>
									<Button
										title='Open settings'
										sx={
											{
												// borderRadius: '50%',
												// width: '100px',
												// heigth: '100px',
											}
										}
										className='no-focus'
									>
										<IconButton
											onClick={handleOpenUserMenu}
											sx={{
												p: 0,
												borderRadius: '0px',
											}}
											className='no-focus'
											aria-controls='menu-appbar'
										>
											<Avatar alt='not found' src={user.img} />
											<Typography
												variant='h6'
												noWrap
												sx={{ marginLeft: '5px' }}
											>
												{user.name}
											</Typography>
										</IconButton>
									</Button>
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
													<MenuItem
														key={setting.text}
														onClick={handleCloseUserMenu}
													>
														<Typography textAlign='center'>
															{setting.text}
														</Typography>
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
								<LoginModal
									openLogin={openLogin}
									handleLoginModal={handleLoginModal}
								/>
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
