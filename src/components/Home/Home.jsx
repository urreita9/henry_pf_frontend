import React from 'react';
import { Mapa } from '../Map/Mapa';
import { MapFilters } from '../MapFilters/MapFilters';

export const Home = () => {
	return (
		<div>
			<Mapa />
			<MapFilters />
		</div>
	);
};
