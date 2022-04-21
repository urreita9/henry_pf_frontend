import { Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { MapContainer, Marker, TileLayer, Popup } from 'react-leaflet';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { GroupSizesColors } from '../../components/ButtonGroup/ButtonGroup';
import PopUpData from '../Map/PopUpData';

const initialPoint = {
	lng: -58.381592,
	lat: -34.603722,
	zoom: 5,
};

export const NewMap = () => {
	const [myPoint, setMyPoint] = useState(initialPoint);
	const location = useLocation();

	// const [myCoordsInForm, setMyCoordsInForm] = useState(null);
	// const dispatch = useDispatch();
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
	return (
		<div style={{ height: 'calc(100vh - 64px)' }}>
			{location.pathname === '/map' && (
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						margin: '0 auto',
						backgroundColor: 'white',
						borderRadius: '50px',
						position: 'absolute',
						bottom: '100px',
						left: '0px',
						right: '0px',
						width: 'fit-content',
						zIndex: 1000,
						margin: '0 auto',
					}}
				>
					<GroupSizesColors />
				</Box>
			)}
			<MapContainer
				center={[myPoint.lat, myPoint.lng]}
				zoom={myPoint.zoom}
				scrollWheelZoom={true}
				style={{ height: '100%' }}
				minZoom={3}
			>
				<TileLayer
					attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					noWrap={true}
				/>
				{filteredCaretakers.map((cuidador, index) => (
					<Marker
						key={`marker-${index}`}
						position={[cuidador.lat, cuidador.lng]}
						// latitude={cuidador.lat}
						anchor='center'
						// icon={<LocationOnIcon />}
						color='#F29279'
					>
						<Popup>
							<PopUpData person={cuidador} />
						</Popup>
					</Marker>
				))}
			</MapContainer>
		</div>
	);
};
