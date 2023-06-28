import axios from "axios";
import REACT_API_URL from "../config";


export const getAllClubUsers = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_CLUB_USERS_REQUEST" });
    try {
      const res = await axios.get(`${REACT_API_URL}/clubs`);
      dispatch({ type: "GET_ALL_CLUB_USERS_SUCCESS", payload: res.data });
     ;
    } catch (err) {
      dispatch({
        type: "GET_ALL_CLUB_USERS_ERROR",
        payload: err.response.data.message,
      });
    }
  };
 
  export const getClubMembers = (clubname) => async (dispatch) => {
    dispatch({ type: "GET_CLUB_MEMBERS_REQUEST" });
    try {
      const res = await axios.get(`${REACT_API_URL}/users/getusers`);
      const users = (clubname) => {
        const group = res.data.find(group => group.name === clubname);
        return group ? group.members : null;
      }
    
      dispatch({ type: "GET_CLUB_MEMBERS_SUCCESS", payload: users(clubname) });
    } catch (err) {
      dispatch({
        type: "GET_CLUB_MEMBERS_ERROR",
        payload: err.response.data.message,
      });
    }
  };
  export const addClubUser = (user) => async (dispatch) => {
    dispatch({ type: "CLUB_USER_REGISTER_REQUEST" });
    try {
      const res = await axios.post(`${REACT_API_URL}/clubs/add-member`, user);
      dispatch({ type: "CLUB_USER_REGISTER_SUCCESS", payload: res.data.message });
     
    } catch (error) {
      dispatch({ type: "CLUB_USER_REGISTER_ERROR", payload: error.message });
    }
  };
  
  