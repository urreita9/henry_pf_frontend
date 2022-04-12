import { useEffect, useState } from 'react';
import { useMapBox } from '../../hooks/useMap';

const initialPoint = {
	lng: -58.381592,
	lat: -34.603722,
	zoom: 3,
};

const Map = ({ forUserForm }) => {
	// ****NO TOCAR****

	// const [myPoint, setMyPoint] = useState(initialPoint);

	// const { coords, setRef } = useMapBox(myPoint, forUserForm);
	const { coords, setRef } = useMapBox(initialPoint, forUserForm);
	// useEffect(() => {
	// 	navigator.geolocation.getCurrentPosition((pos) => {
	// 		const crd = pos.coords;
	// 		if (crd.latitude) {
	// 			setMyPoint({
	// 				lng: crd.longitude,
	// 				lat: crd.latitude,
	// 				zoom: 12,
	// 			});
	// 		}
	// 	});
	// }, []);
	return (
		<div className='mapContainer_container'>
			<div className='info'>
				lng: {coords.lng} | lat: {coords.lat} | zoom: {coords.zoom}{' '}
			</div>
			<div className='mapContainer' ref={setRef} />
		</div>
	);
};

export default Map;
