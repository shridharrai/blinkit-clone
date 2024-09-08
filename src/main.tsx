import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App.tsx";
// import makeServer from "./mirage/config.tsx";
import "./main.scss";
import "bootstrap/dist/css/bootstrap.min.css";
import store from "./app/Store.tsx";

// makeServer();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
