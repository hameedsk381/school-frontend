import axios from "axios";
import REACT_API_URL from "../config";

export const addAnnouncement = (announcement) => async (dispatch) => {
    dispatch({ type: "ADD_ANNOUNCEMENT_REQUEST" });
    try {
      const res = await axios.post(`${REACT_API_URL}/announcements`, announcement);
      dispatch({ type: "ADD_ANNOUNCEMENT_SUCCESS", payload: res.data });
     
    } catch (error) {
      dispatch({ type: "ADD_ANNOUNCEMENT_ERROR", payload: error });
    }
  };
  export const getAnnouncements = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_ANNOUNCEMENTS_REQUEST" });
    try {
      const res = await axios.get(`${REACT_API_URL}/announcements`);
      dispatch({ type: "GET_ALL_ANNOUNCEMENTS_SUCCESS", payload: res.data });
      
    } catch (err) {
      dispatch({
        type: "GET_ALL_ANNOUNCEMENTS_ERROR",
        payload: err.response.data.message,
      });
    }
  };
  export const deleteAnnouncement = (ann_id) => async (dispatch) => {
    dispatch({ type: "DELETE_ANNOUNCEMENT_REQUEST", payload: ann_id });
    try {
      const res = await axios.delete(`${REACT_API_URL}/announcements/${ann_id}`);
      dispatch({ type: "DELETE_ANNOUNCEMENT_SUCCESS", payload: res.data.message });
    } catch (err) {
      dispatch({ type: "DELETE_ANNOUNCEMENT_ERROR", payload: err.message });
    }
  };

  export const updateAnnouncement = (ann_id,updatedData)=> async(dispatch) =>{
    dispatch({type:"UPDATE_ANNOUNCEMENT_REQUEST"});
    try {
      const res = await axios.patch(`${REACT_API_URL}/announcements/${ann_id}`,updatedData);
      dispatch({ type: "UPDATE_ANNOUNCEMENT_SUCCESS", payload: res.data.message });
    } catch (error) {
      dispatch({
        type: "UPDATE_ANNOUNCEMENT_ERROR",
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      });
    }
  }