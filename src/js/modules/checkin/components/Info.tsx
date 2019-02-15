import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {
  label: string;
  value: string;
};

const styles = (theme: Theme) => ({
  infoLine: {
    margin: "10px"
  }
});

const Info: React.FunctionComponent<Props> = ({ label, value, classes }) => {
  return <p className={classes.infoLine}><strong>{label}: </strong>{value}</p>
}

export default injectSheet(styles)(Info);