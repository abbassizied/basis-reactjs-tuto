import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { AuthProvider } from "./Context/AuthProvider";
import { BrowserRouter } from "react-router-dom";

import "@fontsource/roboto"; // Defaults to weight 400
/*
 * RTK stuff
 */
// Provide the Redux Store to React
import { Provider } from "react-redux";
import { store } from "./store/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <AuthProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>
    </Provider>
  </React.StrictMode>
);

reportWebVitals();
