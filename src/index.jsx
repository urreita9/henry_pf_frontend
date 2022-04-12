import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Auth0Provider } from "@auth0/auth0-react";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <React.StrictMode>
    <Auth0Provider
      domain="dev-oe7eehce.us.auth0.com"
      clientId="XlmeWbwAL1Y0aSVChDnZlOL6XtzYYv63"
      redirectUri={window.location.origin}
    >
      <Router>
        <App />
      </Router>
    </Auth0Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
