import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { GlobalError, JssRules, Theme } from "../../types";
import { States } from "./AnimatedError";

interface ErrorStyles<T> extends Styles {
  Error: T;
  text: T;
}

interface Props {
  classes: ErrorStyles<string>;
  componentState: States;
  error: GlobalError;
}

const styles = (theme: Theme): ErrorStyles<JssRules> => ({
  Error: {
    color: theme.errorText,
    width: "300px",
    margin: "20px",
    borderRadius: "15px",
    border: "2px solid red",
    backgroundColor: theme.errorBackground,
    transform: props =>
      props.componentState === States.Mounting ? "translateX(-40vw)" : "none",
    transition: "transform 2s",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  text: {
    padding: "20px"
  }
});

const Error: React.SFC<Props> = ({ classes, error }) => {
  return (
    <div className={classes.Error}>
      <div className={classes.text}> {error.message} </div>
    </div>
  );
};

export default injectSheet(styles)(Error);
