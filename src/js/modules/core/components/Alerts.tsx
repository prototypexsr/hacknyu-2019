import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Errors, Notifications, ReduxState } from "../../types";
import { bindActionCreators, compose, Dispatch } from "redux";
import { connect } from "react-redux";
import AnimatedAlert from "./AnimatedAlert";
import { clearError, clearNotification } from "../coreActions"


interface Props extends WithStyles<typeof styles> {
  errors: Errors;
  notifications: Notifications;
  clearError: (type: string) => any;
  clearNotification: (type: string) => any;
}

const styles = {
  Alerts: {
    zIndex: "100",
    position: "fixed",
    top: "2vh",
    left: "2vw"
  }
};

const Alerts: React.SFC<Props> = ({ clearError, clearNotification, notifications, errors, classes }) => {
  return (
    <div className={classes.Alerts}>
      {Object.entries(errors).map(([type, message]: string[], index: number) => (
        <AnimatedAlert
          isError={true}
          type={type}
          clear={clearError}
          message={message}
          key={index}
        />
      ))}
      {Object.entries(notifications).map(([type, message]: string[], index: number) => (
        <AnimatedAlert
          isError={false}
          type={type}
          message={message}
          clear={clearNotification}
          key={index}
        />
      ))}
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  errors: state.core.errors,
  notifications: state.core.notifications
});

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ clearError, clearNotification }, dispatch);


export default compose(
  injectSheet(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Alerts);
