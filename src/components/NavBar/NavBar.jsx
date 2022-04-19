import { useState, useEffect } from 'react';
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
} from '@mui/material/';
import MenuIcon from '@mui/icons-material/Menu';
import PetsIcon from '@mui/icons-material/Pets';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import axios from '../../axios';
import { useDispatch, useSelector } from 'react-redux';
import {
	clearUser,
	getUser,
	LoginAction,
	LogoutAction,
} from '../../redux/actions/actions';
import { LocalSeeTwoTone } from '@mui/icons-material';
import { GroupSizesColors } from '../ButtonGroup/ButtonGroup';
import { borderRadius } from '@mui/system';

const pages = ['HOST A PET!'];
const settings = ['Profile', 'History', 'CareTaker Dashboard'];

const NavBar = ({ onToggle, typeMode }) => {
	const dispatch = useDispatch();
	const [anchorElNav, setAnchorElNav] = useState(null);
	const [anchorElUser, setAnchorElUser] = useState(null);
	const token = localStorage.getItem('token') || null;
	const id = localStorage.getItem('uid') || null;
	const [modalOpen, setModalOpen] = useState({
		login: false,
		logout: false,
	});
	const { caretakers } = useSelector((state) => state.cuidadoresReducer);
	const { user } = useSelector((state) => state.userReducer);
	const { logged } = useSelector((state) => state.userReducer);
	const navigate = useNavigate();
	const location = useLocation();

	const checkIfUserIsCaretaker = (idUser) => {
		const findUser = caretakers.find(
			(caretaker) => caretaker.userId === idUser
		);
		console.log('FIND USER', findUser);
		if (findUser) {
			return true;
		}
		return false;
	};
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

	const handleLogout = () => {
		localStorage.clear();
		dispatch(LogoutAction());
		dispatch(clearUser());
		navigate('/');
	};
	// const  loginLogout=

	useEffect(() => {
		// const token = localStorage.getItem('token') || null;
		// const id = localStorage.getItem('uid') || null;

		if (token && id) {
			dispatch(getUser(token, id));
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
		<AppBar position='static'>
			<Container maxWidth='xl'>
				<Toolbar disableGutters>
					<Link to='/' style={{ textDecoration: 'none' }}>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
						>
							<PetsIcon />

							<Button
								sx={{
									color: 'white',
								}}
								style={{ marginLeft: '10px' }}
							>
								PetTrip App
							</Button>
						</Typography>
					</Link>
					<Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
						<IconButton
							size='large'
							aria-label='account of current user'
							aria-controls='menu-appbar'
							aria-haspopup='true'
							onClick={handleOpenNavMenu}
							color='inherit'
						>
							<MenuIcon />
						</IconButton>
						<Menu
							id='menu-appbar'
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: 'bottom',
								horizontal: 'left',
							}}
							keepMounted
							transformOrigin={{
								vertical: 'top',
								horizontal: 'left',
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: 'block', md: 'none' },
							}}
						>
							{logged &&
								!checkIfUserIsCaretaker(user.id) &&
								pages.map((page) => (
									// <Link to='/host' key={page}>
									<Button
										key={page}
										// onClick={handleCloseNavMenu}
										onClick={() => {
											navigate('/host');
										}}
										sx={{ my: 2, color: 'black', display: 'block' }}
									>
										{page}
									</Button>
									// </Link>
								))}
						</Menu>
					</Box>
					{location.pathname === '/map' && (
						<Box
							sx={{
								display: 'flex',
								flexDirection: 'column',
								alignItems: 'center',
								margin: '0 auto',
								backgroundColor: 'white',
								borderRadius: '50px',
							}}
						>
							<GroupSizesColors />
						</Box>
					)}
					{/* <Link to='/' style={{ textDecoration: 'none', flexGrow: 1 }}> */}
					<Typography
						variant='h6'
						noWrap
						component='div'
						sx={{
							cursor: 'pointer',
							flexGrow: 1,
							display: { xs: 'flex', md: 'none' },
						}}
						onClick={() => {
							navigate('/');
						}}
					>
						<PetsIcon />
						PetTrip App
					</Typography>
					{/* </Link> */}
					<Box
						sx={{
							flexGrow: 1,
							textAlign: 'center',
							display: { xs: 'none', md: 'flex' },
						}}
					>
						{logged &&
							!checkIfUserIsCaretaker(user.id) &&
							pages.map((page) => (
								// <Link to='/host' key={page}>
								<Button
									key={page}
									// onClick={handleCloseNavMenu}
									onClick={() => {
										navigate('/host');
									}}
									sx={{ my: 2, color: 'white', display: 'block' }}
								>
									{page}
								</Button>
								// </Link>
							))}
					</Box>
					<Box>
						<IconButton
							onClick={() => {
								typeMode === 'light' ? onToggle(true) : onToggle(false);
							}}
						>
							{typeMode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
						</IconButton>
					</Box>
					{/* BOX DE USUARIO ⬇ */}
					{logged ? (
						<>
							<Button
								// href='/login'
								sx={
									{
										// backgroundColor: '#cc3308',
									}
								}
								variant='contained'
								onClick={handleLogout}
							>
								Logout
							</Button>
						</>
					) : (
						<>
							<Button
								onClick={() => {
									setModalOpen({
										login: true,
										logout: false,
									});
								}}
								sx={
									{
										// backgroundColor: '#09a11d',
									}
								}
								variant='contained'
								style={{ marginRight: '5px' }}
							>
								Sign In
							</Button>
						</>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default NavBar;
