/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "bootstrap/dist/css/bootstrap.min.css";
// import "../css/login.css";
// import "../css/css/all.min.css";
// import "../css/css/accountStatus.css";

// Need jQuery? Install it with "yarn add jquery", then uncomment to import it.
// import $ from 'jquery';

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import App from "./App";
//redux
import { Provider } from "react-redux";
import store from "./js/store";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />{" "}
    </Router>
  </Provider>,
  document.getElementById("root")
);
