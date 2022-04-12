import React from 'react';
import ReactDOM from 'react-dom';
import { useCallback, useEffect, useRef, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import PopUp from '../components/Map/PopUp';

const data = [
	{
		id: 1,
		name: 'Juan',
		img: 'https://images.pexels.com/users/avatars/203572739/cristian-dario-565.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 25,
		lng: -58.4847,
		lat: -34.5909,
		stars: 5,
	},
	{
		id: 2,
		name: 'Pedro',
		img: 'https://images.pexels.com/users/avatars/42373991/imzaar-292.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 17,
		lng: -58.4487,
		lat: -34.588,
		stars: 4,
	},
	{
		id: 3,
		name: 'Ignacio',
		img: 'https://images.pexels.com/users/avatars/155326297/vladimir-konoplev-351.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 32,
		lng: -58.4484,
		lat: -34.5709,
		stars: 3.5,
	},
	{
		id: 4,
		name: 'Mariano',
		img: 'https://images.pexels.com/users/avatars/133112242/sofi-832.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 27,
		lng: -58.4846,
		lat: -34.54159,
		stars: 4,
	},
	{
		id: 5,
		name: 'Federico',
		img: 'https://images.pexels.com/users/avatars/3490295/justus-menke-389.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 24,
		lng: -58.4958,
		lat: -34.5116,
		stars: 3,
	},
	{
		id: 6,
		name: 'Ana',
		img: 'https://images.pexels.com/users/avatars/2948812/billow926-585.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 51,
		lng: -58.507,
		lat: -34.4971,
		stars: 4.5,
	},
	{
		id: 7,
		name: 'Maria',
		img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 43,
		lng: -58.5188,
		lat: -34.4784,
		stars: 5,
	},
	{
		id: 8,
		name: 'Veronica',
		img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 28,
		lng: -58.5429,
		lat: -34.5343,
		stars: 3,
	},
	{
		id: 9,
		name: 'Jorge',
		img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 120,
		lng: -58.5496,
		lat: -34.5776,
		stars: 4,
	},
	{
		id: 10,
		name: 'Tomas',
		img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 67,
		lng: -58.5949,
		lat: -34.6596,
		stars: 5,
	},
	{
		id: 11,
		name: 'Nicolas',
		img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 50,
		lng: -58.7735,
		lat: -34.5895,
		stars: 5,
	},
	{
		id: 12,
		name: 'Giuliano',
		img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 14,
		lng: -60.6705,
		lat: -32.9461,
		stars: 2,
	},
	{
		id: 13,
		name: 'Mariano',
		img: 'https://images.pexels.com/users/avatars/2848684/mathias-p-r-reding-589.jpeg?auto=compress&fit=crop&h=60&w=60',
		price: 92,
		lng: -65.1774,
		lat: -26.8303,
		stars: 5,
	},
];

mapboxgl.accessToken =
	'pk.eyJ1IjoiZnJhbmNpc2NvdXJyZWEiLCJhIjoiY2wxbm9hejRpMGNyNzNkbXRlcXZwaGw1MiJ9.ew9Gjyu7GtNX-48taaWIDQ';

export const useMapBox = (initialPoint, forUserForm = false) => {
	//Referencia al div del mapa
	const mapaDiv = useRef();
	const setRef = useCallback((node) => {
		mapaDiv.current = node;
	}, []);

	const mapa = useRef();
	const marker = useRef();
	const [coords, setCoords] = useState(initialPoint);

	useEffect(() => {
		const map = new mapboxgl.Map({
			container: mapaDiv.current, // container ID
			style: 'mapbox://styles/mapbox/streets-v11', // style URL
			center: [initialPoint.lng, initialPoint.lat],
			zoom: initialPoint.zoom,
		});
		map.addControl(
			new mapboxgl.GeolocateControl({
				positionOptions: {
					enableHighAccuracy: false,
				},
				// When active the map will receive updates to the device's location as it changes.
				trackUserLocation: false,
				// Draw an arrow next to the location dot to indicate which direction the device is heading.
				showUserHeading: false,
			})
		);

		mapa.current = map;

		//Agregar marker con click para form cuidador
		mapa.current?.on('click', (ev) => {
			const { lng, lat } = ev.lngLat;

			if (forUserForm && !marker.current) {
				const el = document.createElement('div');
				el.className = 'marker';
				marker.current = new mapboxgl.Marker(el);

				marker.current
					.setLngLat([lng, lat])
					.addTo(mapa.current)
					.setDraggable(true);
			}
			// TODO: setCoords del cuidador
		});
		return mapa.current?.off('click');
	}, [initialPoint]);

	//Cuando se mueve el mapa
	useEffect(() => {
		mapa.current?.on('move', () => {
			const { lng, lat } = mapa.current.getCenter();
			setCoords({
				lng: lng.toFixed(4),
				lat: lat.toFixed(4),
				zoom: mapa.current.getZoom().toFixed(2),
			});
		});

		return mapa.current?.off('move');
	}, []);

	useEffect(() => {
		if (!forUserForm) {
			mapa.current?.on('load', () => {
				data.forEach((person) => {
					// Creamos un React ref
					const ref = React.createRef();
					// // Creamos un nuevo nodo y lo guardamos en React ref
					ref.current = document.createElement('div');
					// //Renderizamos un componente PopUp en el nuevo nodo
					ReactDOM.render(<PopUp person={person} />, ref.current);

					const popup = new mapboxgl.Popup().setDOMContent(ref.current);

					const el = document.createElement('div');
					el.className = 'marker';
					marker.current = new mapboxgl.Marker(el);

					marker.current
						.setLngLat([person.lng, person.lat])
						.setPopup(popup)
						.addTo(mapa.current);
					// .setDraggable(true);
				});
			});
		}
		return mapa.current?.off('load');
	}, []);

	return {
		coords,
		setRef,
	};
};
