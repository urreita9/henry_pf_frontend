import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import PetsIcon from '@mui/icons-material/Pets';
import { useAuth0 } from '@auth0/auth0-react';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { LogoutButton } from '../Logout/Logout';


const pages = ['Host a Pet!'];
const settings = [
	'Profile',
	'History',
	'CareTaker Dashboard',
	<LogoutButton />,
];

const NavBar = ({onToggle, typeMode}) => {
	const { user, isAuthenticated } = useAuth0();

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
		<AppBar
			position='static'
		>
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
							{pages.map((page) => (
								<Link to='/host'>
									<MenuItem key={page}>
										<Typography textAlign='center'>{page}</Typography>
									</MenuItem>
								</Link>
							))}
						</Menu>
					</Box>
					<Link to='/' style={{ textDecoration: 'none', flexGrow: 1 }}>
						{' '}
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
						>
							<PetsIcon />
							PetTrip App
						</Typography>
					</Link>

					<Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
						{pages.map((page) => (
							<Button
								key={page}
								onClick={handleCloseNavMenu}
								sx={{ my: 2, color: 'white', display: 'block' }}
							>
								{page}
							</Button>
						))}
					</Box>
					<Box>
						<IconButton onClick={() => {
							typeMode === 'light' ? onToggle(true) : onToggle(false);
							}}>
							{typeMode === 'light'  ? <Brightness7Icon/> : <Brightness4Icon/>}
						</IconButton>

					</Box>
					{/* BOX DE USUARIO ⬇ */}

					{isAuthenticated ? (
						<>
							<Box sx={{ flexGrow: 0 }}>
								<Tooltip title='Open settings'>
									<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
										{'Logged as: ' + user.nickname}
										<Avatar alt={user.name} src={user.picture} />
									</IconButton>
								</Tooltip>
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
									{settings.map((setting) => (
										<MenuItem key={setting} onClick={handleCloseUserMenu}>
											<Typography textAlign='center'>{setting}</Typography>
										</MenuItem>
									))}
								</Menu>
							</Box>
						</>
					) : (
						<>
							<Button
								href='/register'
								sx={{
									// backgroundColor: '#09a11d',
								}}
								variant='contained'
								style={{ marginRight: '5px' }}
							>
								Register
							</Button>

							<Button
								href='/login'
								sx={{
									// backgroundColor: '#cc3308',
								}}
								variant='contained'
							>
								Login
							</Button>
						</>
					)}
				</Toolbar>
			</Container>
		</AppBar>
	);
};
export default NavBar;
