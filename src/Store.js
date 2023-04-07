import { combineReducers } from "redux";
import { createStore,applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { getAllUsersReducer } from "./reducers/userReducer";
import { registerUserReducer } from "./reducers/userReducer";
import { loginUserReducer } from "./reducers/userReducer";
import { getUserReducer } from "./reducers/userReducer";
import { getAllClubUsersReducer } from "./reducers/userReducer";
import { addClubUserReducer } from "./reducers/userReducer";
const finalReducer = combineReducers({getAllUsersReducer:getAllUsersReducer,loginUserReducer:loginUserReducer,registerUserReducer:registerUserReducer,getUserReducer:getUserReducer,getAllClubUsersReducer:getAllClubUsersReducer,addClubUserReducer:addClubUserReducer})
const currentUser = localStorage.getItem("currentUser")? JSON.parse(localStorage.getItem("currentUser")):null;
const initialState = {loginUserReducer:{currentUser:currentUser}}
const composeEnchancers = composeWithDevTools({});
const store = createStore(finalReducer,initialState,composeEnchancers(applyMiddleware(thunk)));
export default store;
