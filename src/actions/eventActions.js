import axios from "axios";
import REACT_API_URL from "../config";

export const addEvent = (eve) => async (dispatch) => {
    dispatch({ type: "ADD_EVENT_REQUEST" });
    try {
      const res = await axios.post(`${REACT_API_URL}/events`, eve);
      dispatch({ type: "ADD_EVENT_SUCCESS", payload: res.data });
     
    } catch (error) {
      dispatch({ type: "ADD_EVENT_ERROR", payload: error });
    }
  };
  export const getAllEvents = () => async (dispatch) => {
    dispatch({ type: "GET_ALL_EVENTS_REQUEST" });
    try {
      const res = await axios.get(`${REACT_API_URL}/events`);
      dispatch({ type: "GET_ALL_EVENTS_SUCCESS", payload: res.data });
      
    } catch (err) {
      dispatch({
        type: "GET_ALL_EVENTS_ERROR",
        payload: err.response.data.message,
      });
    }
  };
  export const deleteEvent = (ann_id) => async (dispatch) => {
    dispatch({ type: "DELETE_EVENT_REQUEST", payload: ann_id });
    try {
      const res = await axios.delete(`${REACT_API_URL}/events/${ann_id}`);
      dispatch({ type: "DELETE_EVENT_SUCCESS", payload: res.data.message });
    } catch (err) {
      dispatch({ type: "DELETE_EVENT_ERROR", payload: err.message });
    }
  };

  export const updateEvent = (ann_id,updatedData)=> async(dispatch) =>{
    dispatch({type:"UPDATE_EVENT_REQUEST"});
    try {
      const res = await axios.patch(`${REACT_API_URL}/events/${ann_id}`,updatedData);
      dispatch({ type: "UPDATE_EVENT_SUCCESS", payload: res.data.message });
    } catch (error) {
      dispatch({
        type: "UPDATE_EVENT_ERROR",
        payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
      });
    }
  }