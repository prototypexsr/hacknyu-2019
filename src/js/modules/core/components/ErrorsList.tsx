import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import AnimatedError from "./AnimatedError";
import { Errors, GlobalError } from "../../types";
import { compose } from "redux";
import { connect } from "react-redux";

interface ErrorsListStyles<T> extends Styles {
  ErrorsList: T;
}

interface Props {
  errors: Errors
  classes: ErrorsListStyles<string>;
}

const styles: ErrorsListStyles<object> = {
  ErrorsList: {
    position: "fixed",
    top: "2vh",
    left: "2vw"
  }
};

const ErrorsList: React.SFC<Props> = ({ errors, classes }) => {
  return (
    <div className={classes.ErrorsList}>
      {Object.values(errors).map((error, index) => (
        <AnimatedError error={error} index={index} />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  errors: state.core.errors
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(ErrorsList);
