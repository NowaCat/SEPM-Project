import { combineReducers } from "redux";
import errorReducer from "./errorReducer";
import locationReducer from "./locationReducer";
import tourReducer from "./tourReducer";

export default combineReducers({
  errors: errorReducer,
  tour: tourReducer,
  location: locationReducer,
});
