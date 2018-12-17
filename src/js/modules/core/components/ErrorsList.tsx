import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import Error from "./Error";

interface ErrorsListStyles<T> extends Styles {
  ErrorsList: T;
}

interface Props {
  classes: ErrorsListStyles<string>;
}

const styles: ErrorsListStyles<object> = {
  ErrorsList: {
    position: "fixed",
    top: "2vh",
    left: "2vw"
  }
};

const ErrorsList: React.SFC<Props> = ({ classes }) => {
  const errors = [
    { code: "blah", message: "something went wrong!" },
    { code: "blah", message: "something went wrong! 2" },
    { code: "blah", message: "something went wrong! 3" }
  ];
  return (
    <div className={classes.ErrorsList}>
      {errors.map((error, index) => (
        <Error error={error} index={index} />
      ))}
    </div>
  );
};

export default injectSheet(styles)(ErrorsList);
