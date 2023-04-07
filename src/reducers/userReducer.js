export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, success: true };
    case "USER_REGISTER_ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const loginUserReducer = (state={},action)=>{
    switch (action.type) {
        case "USER_LOGIN_REQUEST":
            return { loading: true };
        case "USER_LOGIN_SUCCESS":
            return { loading: false, success: true,currentUser:action.payload };
        case "USER_LOGIN_ERROR":
            return { loading: false, error: action.payload };
            
        default:
            return state;
    }

}
// export const logoutUserReducer = (state = {}, action) => {
//     switch (action.type) {
//         case "USER_LOGOUT":
//             return {};
//         default:
//             return state;
//     }

export const getAllUsersReducer =(state={users:[]},action)=>{
    switch (action.type) {
        case "GET_ALL_USERS_REQUEST":
            return {...state,loading:true};
            case "GET_ALL_USERS_SUCCESS":
                return {users:action.payload,loading:false};
                case "GET_ALL_USERS_ERROR":
                    return {error:action.payload,loading:false};
        default:
            return state;
}
}
export const updateProfilePicture = (state={}, action) =>{
  switch (action.type) {
    case "UPDATE_PROFILE_PICTURE_REQUEST":
        return { loading: true };
    case "UPDATE_PROFILE_PICTURE_SUCCESS":
        return { loading: false, success: true };
        case "UPDATE_PROFILE_PICTURE_ERROR":
          return { loading: false, error: action.payload };
          
    default:
      return state;
  }
}
export const getUserReducer = (state={},action)=>{
  switch (action.type) {
      case "GET_USER_REQUEST":
          return { loading: true };
      case "GET_USER_SUCCESS":
          return { loading: false, success: true,currentProfile:action.payload };
      case "GET_USER_ERROR":
          return { loading: false, error: action.payload };
          
      default:
          return state;
  }

}
export const addClubUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "CLUB_USER_REGISTER_REQUEST":
      return { loading: true };
    case "CLUB_USER_REGISTER_SUCCESS":
      return { loading: false, success: true };
    case "CLUB_USER_REGISTER_ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const getAllClubUsersReducer =(state={users:[]},action)=>{
  switch (action.type) {
      case "GET_ALL_CLUB_USERS_REQUEST":
          return {...state,loading:true};
          case "GET_ALL_CLUB_USERS_SUCCESS":
              return {users:action.payload,loading:false};
              case "GET_ALL_CLUB_USERS_ERROR":
                  return {error:action.payload,loading:false};
      default:
          return state;
}
}