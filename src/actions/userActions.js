import axios from "axios";
import REACT_API_URL from "../config";

export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const res = await axios.post(`${REACT_API_URL}/users/register`, user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: res.data });
   
  } catch (error) {
    dispatch({ type: "USER_REGISTER_ERROR", payload: error });
  }
};
export const loginUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_LOGIN_REQUEST" });
  try {
    const res = await axios.post(`${REACT_API_URL}/management/login`, user);
    dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data.teacher });
    
    localStorage.setItem("currentUser", JSON.stringify(res.data.teacher));
    
    window.location.href = "/";
  } catch (err) {
    if (err.response && err.response.status === 400) {
      dispatch({ type: "USER_LOGIN_ERROR", payload: "Invalid credentials" });
    } else if (err.response && err.response.status === 401) {
      dispatch({ type: "USER_LOGIN_ERROR", payload: "Teacher not found" });
    } else {
      dispatch({ type: "USER_LOGIN_ERROR", payload: "something went wrong" });
    }
  
  }
};
export const getAllUsers = () => async (dispatch) => {
  dispatch({ type: "GET_ALL_USERS_REQUEST" });
  try {
    const res = await axios.get(`${REACT_API_URL}/management`);
    dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({
      type: "GET_ALL_USERS_ERROR",
      payload: err.response.data.message,
    });
  }
};

export const logoutUser = () => (dispatch) => {
  localStorage.removeItem("currentUser");
  window.location.href = "/login";
  window.localStorage.clear();
};
export const deleteUser = (userid) => async (dispatch) => {
  dispatch({ type: "USER_DELETE_REQUEST", payload: userid });
  try {
    const res = await axios.delete(`${REACT_API_URL}/management/${userid}`);
    dispatch({ type: "USER_DELETE_SUCCESS", payload: res.data.message });
  } catch (err) {
    dispatch({ type: "USER_DELETE_ERROR", payload: err.message });
  }
};
export const updateUser = (regId,updatedData)=> async(dispatch) =>{
  dispatch({type:"UPDATE_USER_REQUEST"});
  try {
    const res = await axios.put(`${REACT_API_URL}/management/${regId}`,updatedData);
    dispatch({ type: "UPDATE_USER_SUCCESS", payload: res.data });
  } catch (error) {
    dispatch({
      type: "GET_ALL_CLUB_USERS_ERROR",
      payload: error.response && error.response.data.message
      ? error.response.data.message
      : error.message,
    });
  }
}
export const getUser = (userid) => async (dispatch) => {
  dispatch({ type: "GET_USER_REQUEST" });
  try {
    const res = await axios.get(`${REACT_API_URL}/users/getuser/${userid}`);
    dispatch({ type: "GET_USER_SUCCESS", payload: res.data });
  } catch (err) {
    dispatch({ type: "GET_USER_ERROR", payload: err.response.data.message });
  }
};

