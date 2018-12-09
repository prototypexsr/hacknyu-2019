import {User} from "firebase";

export interface ReduxState {
  core: CoreState
}
export interface CoreState {
  viewportWidth: number
  viewportHeight: number
  user: User,
  appError: string;
  loginError: string;
  logoutError: string;
  registerError: string;
}

export interface Theme {
  backgroundColor: string;
  secondBackground: string;
  thirdBackground: string;
  fontColor: string;
  secondFont: string;
  secondFontHover: string;
  highlightColor: string;
  highlightColorHover: string;
  formBackground: string;
  submitButton: string;
}
