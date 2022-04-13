import { Grid } from '@mui/material';
import React from 'react';
import { Mapa } from '../Map/Mapa';
import { MapFilters } from '../MapFilters/MapFilters';
import NavBar from '../NavBar/NavBar';
import { Profile } from '../Profile/Profile';

export const Home = () => {
	return (
		<div>
			<div style={{ maxWidth: '70%', height: '500px' }}>
				<Mapa />
			</div>

			<MapFilters />
		</div>
	);
};
