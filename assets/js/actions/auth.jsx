import axios from "axios";
import {
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  USER_LOADED,
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
} from "./types";
import { setAlert } from "./alert";
import api from "../components/service/api";
import setAuthToken from "../utils/setAuthToken";

//Load User
export const loadUser = () => async (dispatch) => {
  const token = localStorage.token;
  console.log(token);
  return api.mrtg.userLoad(token).then(
    (res) => {
      dispatch({
        type: USER_LOADED,
        payload: res.data,
      });
      return true;
    },
    (error) => {
      dispatch({
        type: AUTH_ERROR,
      });
      return false;
    }
  );
};

// export const loadUser = () => async (dispatch) => {
//   if (localStorage.token) {
//     setAuthToken(localStorage.token);
//   }

//   try {
//     const res = await axios.get("/api/auth");

//     dispatch({
//       type: USER_LOADED,
//       payload: res.data,
//     });
//   } catch (err) {
//     dispatch({
//       type: AUTH_ERROR,
//     });
//   }
// };

//Register user
export const register =
  ({ username, password }) =>
  async (dispatch) => {
    const body = JSON.stringify({ username, password });
    try {
      return api.mrtg.userRegister(body).then(
        (res) => {
          dispatch({
            type: REGISTER_SUCCESS,
            payload: res.data,
          });
          dispatch(loadUser());
          return true;
        },
        (error) => {
          if (error.response.status >= 400 && error.response.status < 500) {
            dispatch(setAlert(error.response.data.error, "danger"));
          } else if (error.response.status === 500) {
            dispatch(setAlert("Server Error", "danger"));
          }
          dispatch({
            type: REGISTER_FAIL,
          });
          return false;
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

//Login User
export const login = (username, password) => async (dispatch) => {
  const body = JSON.stringify({ username, password });
  return api.mrtg.userLogin(body).then(
    (res) => {
      dispatch({
        type: LOGIN_SUCCESS,
        payload: res.data,
      });
      dispatch(loadUser());
      return true;
    },
    (error) => {
      if (error.response.status === 401) {
        dispatch(setAlert("Invalid username or password", "light"));
      } else {
        dispatch(setAlert("Server Error", "light"));
      }
      dispatch({ type: LOGIN_FAIL });
      return false;
    }
  );
};

//Logout / Clear
export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT });
};
