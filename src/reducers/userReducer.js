export const registerUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_REGISTER_REQUEST":
      return { loading: true };
    case "USER_REGISTER_SUCCESS":
      return { loading: false, success: true, response: action.payload };
    case "USER_REGISTER_ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const loginUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "USER_LOGIN_REQUEST":
      return { loading: true };

    case "USER_LOGIN_SUCCESS":
      return { loading: false, success: true, currentUser: action.payload };

    case "USER_LOGIN_ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

// export const logoutUserReducer = (state = {}, action) => {
//     switch (action.type) {
//         case "USER_LOGOUT":
//             return {};
//         default:
//             return state;
//     }

export const getAllUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case "GET_ALL_USERS_REQUEST":
      return { ...state, loading: true };
    case "GET_ALL_USERS_SUCCESS":
      return { users: action.payload, loading: false };
    case "GET_ALL_USERS_ERROR":
      return { error: action.payload, loading: false };
    default:
      return state;
  }
};

export const getUserReducer = (state = {}, action) => {
  switch (action.type) {
    case "GET_USER_REQUEST":
      return { loading: true };
    case "GET_USER_SUCCESS":
      return { loading: false, success: true, currentProfile: action.payload };
    case "GET_USER_ERROR":
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};



export const deleteUserReducer = (
  state = {
    loading: false,
    message: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "USER_DELETE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_DELETE_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null,
      };
    case "USER_DELETE_ERROR":
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
      };
    default:
      return state;
  }
};
export const updateUserReducer = (
  state = {
    loading: false,
    message: null,
    error: null,
  },
  action
) => {
  switch (action.type) {
    case "USER_UPDATE_REQUEST":
      return {
        ...state,
        loading: true,
      };
    case "USER_UPDATE_SUCCESS":
      return {
        ...state,
        loading: false,
        message: action.payload,
        error: null,
      };
    case "USER_UPDATE_ERROR":
      return {
        ...state,
        loading: false,
        message: null,
        error: action.payload,
      };
    default:
      return state;
  }
};