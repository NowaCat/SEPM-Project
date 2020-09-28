import { GET_LOCATIONS, GET_LOCATION, DELETE_LOCATION } from "../actions/types";

const initialState = {
  locations: [],
  location: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_LOCATIONS:
      return {
        ...state,
        locations: action.payload,
      };

    case GET_LOCATION:
      return {
        ...state,
        location: action.payload,
      };

    case DELETE_LOCATION:
      return {
        ...state,
        locations: state.locations.filter(
          (location) => location.locationIdentifier !== action.payload
        ),
      };
    default:
      return state;
  }
}
