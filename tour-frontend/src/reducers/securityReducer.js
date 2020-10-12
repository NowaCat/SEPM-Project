import {
  RESET_ERRORS,
  SET_CURRENT_USER,
  GET_USERS,
  DELETE_USER,
} from "../actions/types";

const initialState = {
  user: {},
  validToken: false,
  errors: {},
  users: [],
};

const booleanActionPayload = (payload) => {
  if (payload) {
    return true;
  } else {
    return false;
  }
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        validToken: booleanActionPayload(action.payload),
        user: action.payload,
        errors: {},
      };
    case RESET_ERRORS:
      return initialState;

    case GET_USERS:
      return {
        ...state,
        users: action.payload,
      };

    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.username !== action.payload),
      };

    default:
      return state;
  }
}
