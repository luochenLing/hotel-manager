import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import Framework7 from "framework7/framework7-lite.esm.bundle";
import Framework7React from "framework7-react";
import "framework7/css/framework7.bundle.css";
import App from "./App";
import 'utils/common'

Framework7.use(Framework7React);
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
