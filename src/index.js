import React from "react";
import ReactDOM from "react-dom";
import "./styles/main.css";
import 'font-awesome/css/font-awesome.min.css';
import App from "./App";

import { HashRouter } from "react-router-dom";

import { unregister } from "./registerServiceWorker";

ReactDOM.render(
    <HashRouter>
        <App />
    </HashRouter>,
    document.getElementById("root"));
unregister();
