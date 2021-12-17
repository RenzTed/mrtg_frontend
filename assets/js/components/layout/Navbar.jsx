import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { logout } from "../../actions/auth";
import Dropdown from "react-bootstrap/Dropdown";
import woofy2 from "../../img/woofy2.png";

//icons
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = ({ auth: { isAuthenticated, loading, user }, logout }) => {
  // const authLinks = (

  // );

  return (
    <nav className="navbar navbar-expand-sm bg-dark navbar-dark">
      <div className="container-fluid">
        <Link to="/">
          <img src={woofy2} alt="Woofy Yellow" style={{ width: "8rem" }} />
          <small>MRTG</small>
        </Link>

        <ul className="nav navbar-nav navbar-right">
          <li>
            <a href="#" onClick={logout}>
              <FontAwesomeIcon icon={faSignOutAlt} />
              Logout
            </a>
          </li>
        </ul>
      </div>

      {/* {!loading && <Fragment>{isAuthenticated ? authLinks : null}</Fragment>} */}
    </nav>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
