import {
  SET_INPUT_DATA,
  SET_INPUT_ERROR,
  CHECKBOX_TOGGLE,
  ActionTypes,
} from "./../types/actions";
import { SingleStateItem } from "../types/reducer";

const initialState: { [key: string]: SingleStateItem } = {
  firstName: {
    data: "",
    error: "Required",
  },
  lastName: {
    data: "",
    error: "Required",
  },
  address: {
    data: "",
    error: "Required",
  },
  phone: {
    data: "",
    error: "Required",
  },
  email: {
    data: "",
    error: "Required",
  },
  checked: {
    checked: false,
  },
};
export default (
  state = initialState,
  action: ActionTypes
): { [key: string]: SingleStateItem } => {
  switch (action.type) {
    case SET_INPUT_DATA: {
      const id = action.variable;
      return {
        ...state,
        [action.variable]: { data: action.data, error: state[id].error },
      };
      //[variable].error
    }
    case SET_INPUT_ERROR: {
      return {
        ...state,
        [action.variable]: {
          data: state[action.variable].data,
          error: action.error,
        },
      };
    }
    case CHECKBOX_TOGGLE:
      const prevCheckState = state.checked.error;
      return {
        ...state,
        checked: { checked: !prevCheckState },
      };
    default:
      return state;
  }
};
