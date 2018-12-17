import { User } from "firebase";
// Misc types

export interface ReduxState {
    core: CoreState;
}
export interface CoreState {
    viewportWidth: number;
    viewportHeight: number;
    user: User;
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
    submitButtonHover: string;
    errorText: string;
    errorBackground: string;
    red: string;
    green: string;
    blue: string;
    orange: string;
}
export type JssValue =
    | string
    | number
    | Array<string | number | Array<string | number> | "!important">
    | null
    | false;

// Basically calculated props. Returns a JssValue (which I stole from the
// JSS typings, idk why JSS doesn't export it)
export type JssFunction<Props> = (props: Props) => JssValue;


export type JssRules = { [s: string]: JssValue | JssFunction | JssRules }

