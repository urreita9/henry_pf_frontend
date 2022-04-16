import React, { useEffect, useState } from 'react';
import Map, {
  Marker,
  Popup,
  GeolocateControl,
  FullscreenControl,
  getCaretakerDetails,
} from 'react-map-gl';
import { useDispatch, useSelector } from 'react-redux';
import { getCaretakers } from '../../redux/actions/actions';
import PopUpData from './PopUpData';
import 'mapbox-gl/dist/mapbox-gl.css';

const initialPoint = {
  longitude: -58.381592,
  latitude: -34.603722,
  zoom: 3,
};

export const Mapa = ({ formUse = false, setFormCoords, form }) => {
  const [myPoint, setMyPoint] = useState(initialPoint);
  const [popupInfo, setPopupInfo] = useState(null);
  // const [myCoordsInForm, setMyCoordsInForm] = useState(null);
  // const dispatch = useDispatch();
  const cuidadores = useSelector((state) => state.filteredCaretakers);
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
  console.log(cuidadores);

  return (
    <Map
      initialViewState={myPoint}
      style={{ width: '100vw', height: '100vh' }}
      mapboxAccessToken={process.env.REACT_APP_MAPBOX_ACCESS_TOKEN}
      mapStyle='mapbox://styles/franciscourrea/cl20ht8mw000u15swsowhy0m9'
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
