export const SET_INPUT_DATA = "SET_INPUT_DATA";
export const SET_INPUT_ERROR = "SET_INPUT_ERROR";
export const CHECKBOX_TOGGLE = "CHECKBOX_TOGGLE";

export interface SetInputData {
  type: typeof SET_INPUT_DATA;
  variable: string;
  data: string;
}

export interface SetInputError {
  type: typeof SET_INPUT_ERROR;
  variable: string;
  error: string;
}

export interface CheckboxToggle {
  type: typeof CHECKBOX_TOGGLE;
}

export type ActionTypes = SetInputData | SetInputError | CheckboxToggle;
