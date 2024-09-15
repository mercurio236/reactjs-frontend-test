import { combineReducers } from "redux";
import { reducer as routesReducer } from "../Routes";
import { default as home } from "./home.reducer";
import { default as user } from "./user.reducer";
import { default as zipcode } from "./serachzipcode.reducer";

export default combineReducers({
  location: routesReducer,
  home,
  user,
  zipcode
});
