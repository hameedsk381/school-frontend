import { combineReducers } from "redux";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { deleteUserReducer, getAllUsersReducer, updateUserReducer } from "./reducers/userReducer";
import { registerUserReducer } from "./reducers/userReducer";
import { loginUserReducer } from "./reducers/userReducer";
import { getUserReducer } from "./reducers/userReducer";
import {
  addClubUserReducer,
  getAllClubUsersReducer,
  getClubMembersReducer,
} from "./reducers/clubsReducer";
import { addEvent,updateEvent,deleteEvent,getAllEvents } from "./reducers/eventReducer";
import {
  addAnnouncement,
  deleteAnnouncement,
  getAllAnnouncements,
  updateAnnouncements,
} from "./reducers/announcementsReducer";
import { updateUser } from "./actions/userActions";

const finalReducer = combineReducers({
  getAllUsersReducer: getAllUsersReducer,
  loginUserReducer: loginUserReducer,
  registerUserReducer: registerUserReducer,
  getUserReducer: getUserReducer,
  getAllClubUsersReducer: getAllClubUsersReducer,
  addClubUserReducer: addClubUserReducer,
  deleteUserReducer: deleteUserReducer,
  getClubMembersReducer: getClubMembersReducer,
  addAnnouncement: addAnnouncement,
  getAllAnnouncements: getAllAnnouncements,
  updateUser: updateUser,
  deleteAnnouncement:deleteAnnouncement,
 updateUserReducer:updateUserReducer,
 updateAnnouncements:updateAnnouncements,
 addEvent:addEvent,updateEvent:updateEvent,deleteEvent:deleteEvent,getAllEvents:getAllEvents
});
const currentUser = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser"))
  : null;
const initialState = { loginUserReducer: { currentUser: currentUser } };
const composeEnchancers = composeWithDevTools({});
const store = createStore(
  finalReducer,
  initialState,
  composeEnchancers(applyMiddleware(thunk))
);
export default store;
