import React from "react";
import Woofy from "../img/woofy2.png";

const Landing = () => {
  return (
    <section className="landing">
      <div className="dark-overlay">
        <div className="landing-inner">
          <img src={Woofy} alt="woofylogo" className="woofylogo" />
          <p className="lead">MRTG</p>
          <div className="buttons">
            <a href="/register" className="btn btn-primary">
              Sign Up
            </a>
            <a href="/login" className="btn btn-light">
              Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Landing;
