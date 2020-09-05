import {
  SET_INPUT_DATA,
  SET_INPUT_ERROR,
  CHECKBOX_TOGGLE,
  ActionTypes,
} from "./../types/actions";

export const setInputData = (variable: string, data: string): ActionTypes => {
  return { type: SET_INPUT_DATA, variable, data };
};
export const setInputError = (variable: string, error: string): ActionTypes => {
  return { type: SET_INPUT_ERROR, variable, error };
};

export const checkboxToggle = (): ActionTypes => {
  return { type: CHECKBOX_TOGGLE };
};
