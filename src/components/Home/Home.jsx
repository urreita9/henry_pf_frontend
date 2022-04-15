import { Box, Container, Grid, Typography } from '@mui/material';
import React from 'react';
import { Mapa } from '../Map/Mapa';
import { MapFilters } from '../MapFilters/MapFilters';
import NavBar from '../NavBar/NavBar';
import FilterBar from '../../components/FilterBar/FilterBar';

export const Home = () => {
	return (
		<Container>
			<Box
				sx={{
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					margin: '0 auto',
				}}
			>
				{/* <Box style={{ width: '70%', height: '500px' }}>
				<Mapa />
			</div> */}
				<FilterBar />
				{/* <MapFilters /> */}
			</Box>
			<Box
				sx={{
					backgroundImage: `url(https://images.pexels.com/photos/3299905/pexels-photo-3299905.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260)`,
					backgroundSize: 'contain',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
					width: '90%',
					height: '500px',
					margin: '10px auto',
					// borderRadius: '50px',
					textAlign: 'center',
				}}
			>
				<Typography
					variant='h2'
					component='h3'
					width='500px'
					color='success'
					sx={{ margin: '0 auto', fontWeight: '600' }}
				>
					Find the perfect home for your pets while you are away
				</Typography>
			</Box>
		</Container>
	);
};
