import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import store from './redux/store/store';
import './index.css'
import "@glidejs/glide/dist/css/glide.core.css"

// ReactDOM.render(
// 	<Provider store={store}>
// 		<Auth0Provider
// 			domain='dev-oe7eehce.us.auth0.com'
// 			clientId='XlmeWbwAL1Y0aSVChDnZlOL6XtzYYv63'
// 			redirectUri={window.location.origin}
// 		>
// 			<App />
// 		</Auth0Provider>
// 	</Provider>,
// 	document.getElementById('root')
// );

//
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Provider store={store}>
		{/* <Auth0Provider
			domain='dev-oe7eehce.us.auth0.com'
			clientId='XlmeWbwAL1Y0aSVChDnZlOL6XtzYYv63'
			redirectUri={window.location.origin}
		> */}
		<App />
		{/* </Auth0Provider> */}
	</Provider>
);
