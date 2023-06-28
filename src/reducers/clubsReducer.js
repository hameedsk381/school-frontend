export const addClubUserReducer = (state = {}, action) => {
    switch (action.type) {
      case "CLUB_USER_REGISTER_REQUEST":
        return { loading: true };
      case "CLUB_USER_REGISTER_SUCCESS":
        return { loading: false, success: true,message:action.payload };
      case "CLUB_USER_REGISTER_ERROR":
        return { loading: false, error: action.payload };
  
      default:
        return state;
    }
  };
  export const getAllClubUsersReducer = (state = { users: [] }, action) => {
    switch (action.type) {
      case "GET_ALL_CLUB_USERS_REQUEST":
        return { ...state, loading: true };
      case "GET_ALL_CLUB_USERS_SUCCESS":
        return { users: action.payload, loading: false };
      case "GET_ALL_CLUB_USERS_ERROR":
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };
  export const getClubMembersReducer = (state = { members: [] }, action) => {
    switch (action.type) {
      case "GET_CLUB_MEMBERS_REQUEST":
        return { ...state, loading: true };
      case "GET_CLUB_MEMBERS_SUCCESS":
        return { members: action.payload, loading: false };
      case "GET_CLUB_MEMBERS_ERROR":
        return { error: action.payload, loading: false };
      default:
        return state;
    }
  };
 