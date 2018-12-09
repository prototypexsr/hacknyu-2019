import * as React from "react";
import { ThemeProvider } from "theming";
import { Theme } from "./types";
import { withRouter } from "react-router";

interface Props {
  location: Location;
  children: any;
}

export const trackColors = {
  red: "#ff1616",
  orange: "#ffaf1a",
  green: "#4ba343",
  blue: "#007fcc"
};

const theme: Theme = {
  backgroundColor: "#e3f2fd",
  fontColor: "#363731",
  secondBackground: "#416788",
  thirdBackground: "#2b4570",
  secondFont: "#fafafa",
  secondFontHover: "#f0f0f0",
  highlightColor: "#db5461",
  highlightColorHover: "#b4505a",
  formBackground: "#fafafa",
  submitButton: "#46a2b0",
  ...trackColors
};

const ThemeInjector: React.SFC<Props> = ({ children }) => {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
};

// @ts-ignore
export default withRouter(ThemeInjector);
