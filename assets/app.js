/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import "./styles/app.css";

// start the Stimulus application
import "./bootstrap";

import React, { Fragment, useEffect } from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "./js/components/auth/Login";
import Register from "./js/components/auth/Register";
import Landing from "./js/components/Landing";
import setAuthToken from "./js/utils/setAuthToken";
import { loadUser } from "./js/actions/auth";
import store from "./js/store";
import Home from "./js/components/Home";
import MrtgDisplayGraph from "./js/components/MrtgComponents/MrtgDisplayGraph";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}
const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <Fragment>
      <section className="container">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </section>
    </Fragment>
  );
};

export default App;
