import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { ThemeProvider } from '@mui/material/styles'
import theme from './assets/mui-theme-config/theme-mui'
import { Auth0Provider } from "@auth0/auth0-react";
import App from "./App";
import store from "./redux/store/store";

ReactDOM.render(
  <Provider store={store}>
      <ThemeProvider theme={theme}>

    <Auth0Provider
      domain="dev-oe7eehce.us.auth0.com"
      clientId="XlmeWbwAL1Y0aSVChDnZlOL6XtzYYv63"
      redirectUri={window.location.origin}
    >
      <App />
    </Auth0Provider>
      </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
