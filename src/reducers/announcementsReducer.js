export const addAnnouncement = (state = {}, action) => {
    switch (action.type) {
      case "ADD_ANNOUNCEMENT_REQUEST":
        return { loading: true };
      case "ADD_ANNOUNCEMENT_SUCCESS":
        return { loading: false, success: true, response: action.payload };
      case "ADD_ANNOUNCEMENT_ERROR":
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  export const getAllAnnouncements = (state = { announcements: [] }, action) => {
    switch (action.type) {
      case "GET_ALL_ANNOUNCEMENTS_REQUEST":
        return { ...state, loading: true };
      case "GET_ALL_ANNOUNCEMENTS_SUCCESS":
        return { announcements: action.payload, loading: false,success:true };
      case "GET_ALL_ANNOUNCEMENTS_ERROR":
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };
  export const deleteAnnouncement = (state = { loading:null,message:null,error:null }, action) => {
    switch (action.type) {
      case "DELETE_ANNOUNCEMENT_REQUEST":
        return { ...state, loading: true };
      case "DELETE_ANNOUNCEMENT_SUCCESS":
        return { message: action.payload, loading: false };
      case "DELETE_ANNOUNCEMENT_ERROR":
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };
  export const updateAnnouncements = (state = {}, action) => {
    switch (action.type) {
      case "UPDATE_ANNOUNCEMENT_REQUEST":
        return { loading: true };
      case "UPDATE_ANNOUNCEMENT_SUCCESS":
        return { loading: false, success: true, response: action.payload };
      case "UPDATE_ANNOUNCEMENT_ERROR":
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  