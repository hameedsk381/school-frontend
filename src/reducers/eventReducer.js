export const addEvent = (state = {}, action) => {
    switch (action.type) {
      case "ADD_EVENT_REQUEST":
        return { loading: true };
      case "ADD_EVENT_SUCCESS":
        return { loading: false, success: true, response: action.payload };
      case "ADD_EVENT_ERROR":
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  export const getAllEvents = (state = { events: [] }, action) => {
    switch (action.type) {
      case "GET_ALL_EVENTS_REQUEST":
        return { ...state, loading: true };
      case "GET_ALL_EVENTS_SUCCESS":
        return { events: action.payload, loading: false,success:true };
      case "GET_ALL_EVENTS_ERROR":
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };
  export const deleteEvent = (state = { loading:null,message:null,error:null }, action) => {
    switch (action.type) {
      case "DELETE_EVENT_REQUEST":
        return { ...state, loading: true };
      case "DELETE_EVENT_SUCCESS":
        return { message: action.payload, loading: false };
      case "DELETE_EVENT_ERROR":
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };
  export const updateEvent = (state = {}, action) => {
    switch (action.type) {
      case "UPDATE_EVENT_REQUEST":
        return { loading: true };
      case "UPDATE_EVENT_SUCCESS":
        return { loading: false, success: true, response: action.payload };
      case "UPDATE_EVENT_ERROR":
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  