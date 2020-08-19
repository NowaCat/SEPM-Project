import { GET_TOURS, GET_TOUR, DELETE_TOUR } from "../actions/types";

const initialState = {
  tours: [],
  tour: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TOURS:
      return {
        ...state,
        tours: action.payload,
      };

    case GET_TOUR:
      return {
        ...state,
        tour: action.payload,
      };

    case DELETE_TOUR:
      return {
        ...state,
        tours: state.tours.filter(
          (tour) => tour.customTourIdentifier !== action.payload
        ),
      };
    default:
      return state;
  }
}
