import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { JssRules, ReduxState, Theme } from "../../types";

interface Props {
  classes: { [s: string]: string };
}

interface SubmittedPageStyles<T> extends Styles {
  text: T;
}

const styles = (theme: Theme): SubmittedPageStyles<JssRules> => ({
  text: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  }
});

const SubmittedPage: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.text}>
      This page is proof that you have confirmed your attendance for HackNYU
      2019. We'll see you at the hackathon!
    </div>
  );
};

export default injectSheet(styles)(SubmittedPage);
