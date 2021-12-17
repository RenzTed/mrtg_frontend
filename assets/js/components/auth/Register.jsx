import React, { Fragment, useState } from "react";
import { connect } from "react-redux";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { setAlert } from "../../actions/alert";
import { register } from "../../actions/auth";
import PropTypes from "prop-types";
import Alert from "../layout/alert";

const Register = ({ setAlert, register, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    password2: "",
  });

  const { username, password, password2 } = formData;
  // console.log(formData)
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setAlert("Password do not match", "danger");
    } else {
      register({ username, password }).then((res) => {
        if (!res) {
          // setIsLoading(false);
        }
        // if(res){
        //   setIsSuccess(true);
        // }
      });
      // console.log("SUCCESS");
      // const newUser = {
      //   name,
      //   username,
      //   password,
      // };

      // try {
      //   const config = {
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //   };

      //   const body = JSON.stringify(newUser);

      //   const res = await axios.post("api/users", body, config);
      //   console.log(res.data);
      // } catch (err) {
      //   console.error(err.response.data);
      // }
    }
  };

  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }

  return (
    <Fragment>
      <section className="dark-overlay2">
        <Alert />
        <div className="register-data">
          <h1 className="large text-primary">Sign Up</h1>
          <p className="lead">
            <i className="fas fa-user"></i> Create Your Account
          </p>
          <form className="form" onSubmit={(e) => onSubmit(e)}>
            <div className="form-group">
              <input
                type="username"
                placeholder="Username"
                name="username"
                value={username}
                onChange={(e) => onChange(e)}
                // required
              />
              {/* <small className="form-text">
                This site uses Gravatar so if you want a profile image, use a
                Gravatar username
              </small> */}
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Password"
                name="password"
                // minLength="6"
                value={password}
                onChange={(e) => onChange(e)}
              />
            </div>
            <div className="form-group">
              <input
                type="password"
                placeholder="Confirm Password"
                name="password2"
                // minLength="6"
                value={password2}
                onChange={(e) => onChange(e)}
              />
            </div>

            <input type="submit" className="btn btn-primary" value="Register" />
          </form>
          <p className="my-1">
            Already have an account? <Link to="/login">Sign In</Link>
          </p>
        </div>
      </section>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { setAlert, register })(Register);
