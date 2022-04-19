import React, { useEffect, useState } from 'react';
import Map, {
	Marker,
	Popup,
	GeolocateControl,
	FullscreenControl,
	getCaretakerDetails,
} from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { cleanCaretaker, getCaretakers } from '../../redux/actions/actions';
import PopUpData from './PopUpData';

import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
// @ts-ignore
// eslint-disable-next-line import/no-webpack-loader-syntax
import MapboxWorker from 'worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker';

const initialPoint = {
	longitude: -58.381592,
	latitude: -34.603722,
	zoom: 3,
};

export const Mapa = ({
	formUse = false,
	setFormCoords,
	form,
	setErrors,
	errors,
}) => {
	const [myPoint, setMyPoint] = useState(initialPoint);
	const [popupInfo, setPopupInfo] = useState(null);
	// const [myCoordsInForm, setMyCoordsInForm] = useState(null);
	const dispatch = useDispatch();
	const { filteredCaretakers } = useSelector(
		(state) => state.cuidadoresReducer
	);
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
	console.log(filteredCaretakers);

	useEffect(() => {
		return () => {
			dispatch(cleanCaretaker());
		};
	});

	return (
		<Map
			initialViewState={myPoint}
			style={
				!formUse
					? { width: '100vw', height: '100vh' }
					: {
							width: '100%',
							height: '100%',
							position: 'absolut',
							top: '0',
							bottom: '0',
							left: '0',
							right: '0',
					  }
			}
			mapboxAccessToken='pk.eyJ1IjoiZGVua283IiwiYSI6ImNsMXpkamFzMDBscXUzY3FkZHFsZmJhd2gifQ.5o2boAHW6-837CDMqjioWQ'
			mapStyle='mapbox://styles/mapbox/light-v9'
			onClick={(e) => {
				if (!formUse) return;
				setErrors({
					...errors,
					lat: null,
				});
				setFormCoords({
					...form,
					lng: e.lngLat.lng,
					lat: e.lngLat.lat,
				});
			}}
		>
			<GeolocateControl showAccuracyCircle={false} />
			{!formUse &&
				filteredCaretakers.map((cuidador, index) => (
					<Marker
						key={`marker-${index}`}
						longitude={cuidador.lng}
						latitude={cuidador.lat}
						anchor='center'
						onClick={() => setPopupInfo(cuidador)}
						color='#F29279'
					/>
				))}
			{form?.lng && (
				<Marker
					key={`marker-${form.lng}`}
					longitude={form.lng}
					latitude={form.lat}
					anchor='center'
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
			<FullscreenControl />
		</Map>
	);
};
