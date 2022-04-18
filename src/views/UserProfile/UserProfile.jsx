import {
	Avatar,
	Button,
	Card,
	Container,
	Grid,
	Typography,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

const UserProfile = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.userReducer.user);

	useEffect(() => {}, []);

	return (
		<Container sx={{ maxWidth: '1000px' }}>
			<Grid
				container
				sx={{
					display: 'flex',
					alignItems: 'center',
					margin: '0 auto',
				}}
			>
				<Grid item xs={12} sm={4}>
					<Avatar
						alt='User profile avatar'
						src={user.img}
						sx={{ width: 180, height: 180 }}
					/>
				</Grid>
				<Grid item xs={12} sm={8}>
					<Typography variant='h4'>FirstName LastName</Typography>
					<Typography variant='h6'>Email: {user.email}</Typography>
					<Typography variant='h6'>Adress: {user.adress}</Typography>
					<Typography variant='h6'>Your pets: </Typography>
					{user.pets?.length &&
						user.pets.map((pet, i) => <Card key={i}>{pet}</Card>)}
				</Grid>
			</Grid>
			<Button>Edit</Button>
		</Container>
	);
};

export default UserProfile;
