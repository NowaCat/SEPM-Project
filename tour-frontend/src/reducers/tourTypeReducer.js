import { GET_TYPES, GET_TYPE, DELETE_TYPE } from "../actions/types";

const initialState = {
  tourTypes: [],
  tourType: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_TYPES:
      return {
        ...state,
        tourTypes: action.payload,
      };

    case GET_TYPE:
      return {
        ...state,
        tourType: action.payload,
      };

    case DELETE_TYPE:
      return {
        ...state,
        tourTypes: state.types.filter((type) => type.label !== action.payload),
      };
    default:
      return state;
  }
}
