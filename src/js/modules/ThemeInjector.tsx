import * as React from "react";
import { ThemeProvider } from "theming";
import { RouteComponentProps, withRouter } from "react-router";
import { Location } from "history";

interface Props {
  location: Location;
  children: any;
}

export const trackColors = {
  red: "#d14d4d",
  orange: "#f7c15d",
  green: "#619b5b",
  blue: "#63a0c6"
};

export interface Theme {
  backgroundColor: string;
  secondBackground: string;
  secondBackgroundHighlight: string;
  thirdBackground: string;
  fontColor: string;
  secondFont: string;
  secondFontHover: string;
  highlightColor: string;
  highlightColorHover: string;
  formBackground: string;
  submitButton: string;
  submitButtonHover: string;
  submitButtonDeactivated: string;
  errorBorder: string;
  errorText: string;
  errorBackground: string;
  notificationBackground: string;
  notificationBorder: string;
  overlayColor: string;
  fontFamily: string;
  inputPadding: string;
  red: string;
  green: string;
  blue: string;
  orange: string;
  containerMaxWidth: string;
  containerMobileWidth: string;
  containerSmallWidth: string;
  containerMediumWidth: string;
  containerLargeWidth: string;
  largeBreakpoint: string;
  mediumBreakpoint: string;
  smallBreakpoint: string;
}

const theme: Theme = {
  backgroundColor: "#57068c",
  secondBackground: "#f5f5f5",
  secondBackgroundHighlight: "#fcfcfc",
  thirdBackground: "#57068c",
  fontColor: "#fefefe",
  secondFont: "#202020",
  secondFontHover: "#f0f0f0", 
  highlightColor: "#fefefe",
  highlightColorHover: "#eeeeee",
  formBackground: "#fafafa",
  submitButton: "#9c68b1",
  submitButtonHover: "#b773cd",
  submitButtonDeactivated: "#c193cd",
  fontFamily: "mr-eaves-xl-modern, sans-serif",
  inputPadding: "7px 10px",
  errorText: "#444444",
  errorBackground: "#ffc0c0",
  errorBorder: "red",
  notificationBackground: "#fefefe",
  notificationBorder: "#000000",
  containerMobileWidth: "21em",
  containerSmallWidth: "28em",
  containerMediumWidth: "40em",
  containerLargeWidth: "45em",
  containerMaxWidth: "62.5em",
  overlayColor: "#696969",
  largeBreakpoint: "1100px",
  mediumBreakpoint: "800px",
  smallBreakpoint: "600px",
  ...trackColors
};

class ThemeInjector extends React.Component<Props> {
  render() {
    let { children } = this.props;
    return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
  }
}

export default ThemeInjector;
