import { Grid } from '@mui/material';
import React from 'react';
import { Mapa } from '../Map/Mapa';
import { MapFilters } from '../MapFilters/MapFilters';

export const Home = () => {
	return (
		<div>
			<div style={{ maxWidth: '500px', height: '500px' }}>
				<Mapa />
			</div>

			<MapFilters />
		</div>
	);
};
