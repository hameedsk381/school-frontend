import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()
export const registerUser = (user) => async (dispatch) => {
  dispatch({ type: "USER_REGISTER_REQUEST" });
  try {
    const res = await axios.post(`${process.env.REACT_URL}/api/users/register`, user);
    dispatch({ type: "USER_REGISTER_SUCCESS", payload: res.data });
    console.log(res.data);
  } catch (error) {
    dispatch({ type: "USER_REGISTER_ERROR", payload: error });
  }
};
export const loginUser = (user) => async (dispatch) => {
    dispatch({ type: "USER_LOGIN_REQUEST" });
    try {
      const res = await axios.post(`${process.env.REACT_URL}/api/users/login`, user);
      dispatch({ type: "USER_LOGIN_SUCCESS", payload: res.data });  
      console.log(res.data);
      localStorage.setItem("currentUser", JSON.stringify(res.data));
      window.location.href = "/"
    } catch(err){
        dispatch({ type: "USER_LOGIN_ERROR", payload: err });
    }
}
export const getAllUsers =()=>async(dispatch)=>{
    dispatch({ type: "GET_ALL_USERS_REQUEST" });
    try {
      const res = await axios.get(`${process.env.REACT_URL}/api/users/getusers`);
      dispatch({ type: "GET_ALL_USERS_SUCCESS", payload: res.data });
      console.log(res.data);
     
    } catch(err){
        dispatch({ type: "GET_ALL_USERS_ERROR", payload: err.response.data.message });
    }
}


export const logoutUser =()=>(dispatch)=>{
    localStorage.removeItem("currentUser")
    window.location.href='/login'
    window.localStorage.clear()
}
export const deleteUser = (userid) => async (dispatch) => {
    dispatch({ type: "USER_DELETE_REQUEST" ,payload:userid});
    try {
      const res = await axios.delete(`${process.env.REACT_URL}/api/users/delete`,userid);
      dispatch({ type: "USER_DELETE_SUCCESS", payload: res.data });
      console.log(res.data);
    } catch(err){
        dispatch({ type: "USER_DELETE_ERROR", payload: err.message });
    }
}
export const updateProfilePic = (formData) => async(dispatch)=>{
  dispatch({ type: "USER_UPDATE_PROFILE_PIC_REQUEST" });
  try {
    const res = await axios.post(`${process.env.REACT_URL}/api/users/uploadprofilepic`, formData);
    dispatch({ type: "USER_UPDATE_PROFILE_PIC_SUCCESS", payload: res.data})
    console.log(res.data);
    } catch(err){
      dispatch({ type: "USER_UPDATE_PROFILE_PIC_ERROR", payload: err.message });
    }
}
export const getUser =(userid)=>async(dispatch)=>{
  dispatch({ type: "GET_USER_REQUEST" });
  try {
    const res = await axios.get(`${process.env.REACT_URL}/api/users/${userid}`);
    dispatch({ type: "GET_USER_SUCCESS", payload: res.data });
    console.log(res.data);
   
  } catch(err){
      dispatch({ type: "GET_USER_ERROR", payload: err.response.data.message });
  }
}
export const addClubUser = (user) => async (dispatch) => {
  dispatch({ type: "CLUB_USER_REGISTER_REQUEST" });
  try {
    const res = await axios.post(`${process.env.REACT_URL}/api/clubs/addclubuser`, user);
    dispatch({ type: "CLUB_USER_REGISTER_SUCCESS", payload: res.data });
    console.log(res.data);
  } catch (error) {
    dispatch({ type: "CLUB_USER_REGISTER_ERROR", payload: error });
  }
};
export const getAllClubUsers =()=>async(dispatch)=>{
  dispatch({ type: "GET_ALL_CLUB_USERS_REQUEST" });
  try {
    const res = await axios.get(`${process.env.REACT_URL}/api/users/getusers`);
    dispatch({ type: "GET_ALL_CLUB_USERS_SUCCESS", payload: res.data });
    console.log(res.data);
   
  } catch(err){
      dispatch({ type: "GET_ALL_CLUB_USERS_ERROR", payload: err.response.data.message });
  }
}

