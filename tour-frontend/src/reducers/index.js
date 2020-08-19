import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import tourReducer from "./tourReducer";

export default combineReducers({
  errors: errorReducer,
  tour: tourReducer,
});
