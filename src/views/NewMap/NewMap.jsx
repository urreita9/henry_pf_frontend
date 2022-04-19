import React, { useEffect, useState } from 'react';
import { Map, Marker, ZoomControl } from 'pigeon-maps';
import { useSelector } from 'react-redux';

const initialPoint = {
	lng: -58.381592,
	lat: -34.603722,
	zoom: 5,
};

export function NewMap() {
	const [myPoint, setMyPoint] = useState(initialPoint);
	const [hue, setHue] = useState(0);
	const color = `hsl(${hue % 360}deg 39% 70%)`;
	const { filteredCaretakers } = useSelector(
		(state) => state.cuidadoresReducer
	);

	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			const crd = pos.coords;
			if (crd.latitude) {
				setMyPoint({
					lng: crd.longitude,
					lat: crd.latitude,
					zoom: 12,
				});
			}
		});
	}, []);
	return (
		<div style={{ width: '100vw', height: '100vh' }}>
			<Map
				// height={700}
				defaultCenter={[myPoint.lat, myPoint.lng]}
				defaultZoom={myPoint.zoom}
			>
				<ZoomControl />
				{filteredCaretakers?.map((caretaker) => (
					<Marker
						key={caretaker.id}
						width={50}
						anchor={[caretaker.lat, caretaker.lng]}
						color={color}
						onClick={() => setHue(hue + 20)}
					/>
				))}
			</Map>
		</div>
	);
}
