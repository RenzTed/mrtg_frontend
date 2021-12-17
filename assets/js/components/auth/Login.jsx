import React, { Profiler, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { login } from "../../actions/auth";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    setFormData({ ...formData, isLoading: true });
    await login(username, password).then((res) => {
      if (!res) {
        setFormData({ ...formData, isLoading: false });
      } else {
        return;
      }
    });
  };
  // const onSubmit = async (e) => {
  //   e.preventDefault();
  //   login(email, password);
  //   // console.log("SUCCESS");
  // };

  //Redirect id logged in
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <section className="dark-overlay">
      {/* <div className="alert alert-danger">Invalid credentials</div> */}
      <div className="signin-data">
        <h1 className="large text-primary">Sign In</h1>
        <p className="lead">
          <i className="fas fa-user"></i> Sign into Your Account
        </p>
        <form className="form" onSubmit={(e) => onSubmit(e)}>
          {/*action="dashboard.html" */}
          <div className="form-group">
            <input
              type="username"
              placeholder="Username"
              name="username"
              value={username}
              onChange={onChange}
              required
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              onChange={onChange}
              value={password}
              name="password"
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Login" />
        </form>
        <p className="my-1">
          Don't have an account? <Link to="/register">Sign Up</Link>
        </p>
      </div>
    </section>
  );
};
Login.propTypes = {
  login: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
