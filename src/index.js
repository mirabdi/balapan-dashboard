import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import 'leaflet/dist/leaflet.css';
import App from "./App";

import { ContextProvider } from "./contexts/ContextProvider";
// import { registerLicense } from '@syncfusion/ej2-react-licensing';

// registerLicense('Ngo9BigBOggjHTQxAR8/V1NAaF1cVWhIfEx1RHxQdld5ZFRHallYTnNWUj0eQnxTdEFjWn9ccXRXRGVZU0J+Xg==');

ReactDOM.render(
  <ContextProvider>
    <App />
  </ContextProvider>,
  document.getElementById("root")
);
