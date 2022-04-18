import {
	Avatar,
	Button,
	Checkbox,
	FormControlLabel,
	Grid,
	Link,
	Paper,
	TextField,
	Typography,
} from '@mui/material';
import React, { useState } from 'react';
import PetsIcon from '@mui/icons-material/Pets';
// import { useNavigate } from "react-router-dom";
// import { login } from "./login";
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { LoginAction } from '../../redux/actions/actions';
const changeHandler = (e) => {};

export const LoginForm = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	// const [check, setCheck] = useState(null); que no expire el token
	const [email, setEmail] = useState('');
	const [password, setpassword] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();

		const data = {
			email: email,
			password: password,
		};
		console.log('login', data);
		axios
			.post('http://localhost:3001/api/auth/login', data)
			.then((res) => {
				localStorage.setItem('token', res.data.token);
				localStorage.setItem('uid', res.data.id);
				dispatch(LoginAction());
				navigate('/profile');
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const userChangeHandler = (event) => {
		setEmail(event.target.value);
	};
	const passwordChangeHandler = (event) => {
		setpassword(event.target.value);
	};

	const paperStyle = {
		padding: 20,
		height: '70vh',
		width: 280,
		margin: '20px auto',
	};

	const avatarStyle = {};
	return (
		<Grid>
			<Paper elevation={10} style={paperStyle}>
				<Grid align='center'>
					<Avatar style={avatarStyle}>
						<PetsIcon />
					</Avatar>
					<h2>Sign in</h2>
				</Grid>
				<TextField
					label='Username'
					placeholder='Enter username..'
					fullWidth
					required
					onChange={userChangeHandler}
					sx={{ marginTop: '30px' }}
				/>
				<TextField
					label='Password'
					placeholder='Enter password'
					fullWidth
					required
					type='password'
					onChange={passwordChangeHandler}
					sx={{ marginTop: '30px' }}
				/>
				<FormControlLabel
					control={
						<Checkbox
							onChange={changeHandler}
							name='checkedB'
							color='primary'
						/>
					}
					label='Remember me'
				/>
				<Button
					type='submit'
					variant='contained'
					color='primary'
					fullWidth
					style={{ margin: '8px 0' }}
					onClick={handleSubmit}
				>
					Sign in
				</Button>

				<Button
					onClick={() => {
						navigate('/register');
					}}
				>
					Don't have an account?
				</Button>
			</Paper>
		</Grid>
	);
};
