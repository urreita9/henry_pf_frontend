import React, { useEffect, useState } from 'react';
import Map, { Marker, Popup, GeolocateControl } from 'react-map-gl';
import { useSelector } from 'react-redux';
import PopUpData from './PopUpData';

const initialPoint = {
	longitude: -58.381592,
	latitude: -34.603722,
	zoom: 3,
};

export const Mapa = ({ formUse = false, setFormCoords, form }) => {
	const [myPoint, setMyPoint] = useState(initialPoint);
	const [popupInfo, setPopupInfo] = useState(null);
	// const [myCoordsInForm, setMyCoordsInForm] = useState(null);
	const height = 20;
	const width = 14;
	const cuidadores = useSelector((state) => state.filteredCuidadores);
	useEffect(() => {
		navigator.geolocation.getCurrentPosition((pos) => {
			const crd = pos.coords;
			if (crd.latitude) {
				setMyPoint({
					longitude: crd.longitude,
					latitude: crd.latitude,
					zoom: 12,
				});
			}
		});
	}, []);

	return (
		<Map
			initialViewState={myPoint}
			style={{ width: '100%', height: '100%' }}
			mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
			mapStyle='mapbox://styles/mapbox/streets-v9'
			onClick={(e) => {
				if (!formUse) return;

				setFormCoords({
					...form,
					lng: e.lngLat.lng,
					lat: e.lngLat.lat,
				});
			}}
		>
			<GeolocateControl />
			{!formUse &&
				cuidadores.map((cuidador, index) => (
					<Marker
						key={`marker-${index}`}
						longitude={cuidador.lng}
						latitude={cuidador.lat}
						anchor='bottom'
						onClick={() => setPopupInfo(cuidador)}
						color='#F29279'
						style={{
							position: 'relative',
							width: '100%',
							height: '100%',
							transform: `translate(${height / 2 + width}, ${
								height / 2 + width
							}`,
						}}
					/>
				))}
			{form?.lng && (
				<Marker
					key={`marker-${form.lng}`}
					longitude={form.lng}
					latitude={form.lat}
					anchor='bottom'
					draggable={true}
					color='#F29279'
					onDragEnd={(e) =>
						setFormCoords({
							...form,
							lng: e.lngLat.lng,
							lat: e.lngLat.lat,
						})
					}
					onClick={(e) =>
						setFormCoords({
							...form,
							lng: e.lngLat.lng,
							lat: e.lngLat.lat,
						})
					}
				/>
			)}

			{popupInfo && (
				<Popup
					anchor='bottom'
					offset={60}
					longitude={popupInfo.lng}
					latitude={popupInfo.lat}
					closeOnClick={false}
					closeOnMove={true}
					onClose={() => setPopupInfo(null)}
					style={{
						backgroundColor: 'transparent',
					}}
				>
					<PopUpData person={popupInfo} />
				</Popup>
			)}
			{/* <GeocoderControl
				mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
				position='top-left'
			/> */}
		</Map>
	);
};
