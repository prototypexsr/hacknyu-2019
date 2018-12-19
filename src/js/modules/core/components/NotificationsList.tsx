import * as React from "react";
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { Errors, JssRules } from "../../types";
import { compose } from "redux";
import { connect } from "react-redux";
import AnimatedNotification from "./AnimatedNotification";

interface NotificationsListStyles<T> extends Styles {
  NotificationsList: T;
}

interface Props {
  errors: Errors;
  classes: NotificationsListStyles<string>;
}

const styles: NotificationsListStyles<JssRules> = {
  NotificationsList: {
    position: "fixed",
    top: "2vh",
    left: "2vw"
  }
};

const NotificationsList: React.SFC<Props> = ({ notifications, errors, classes }) => {
  return (
    <div className={classes.NotificationsList}>
      {Object.entries(errors).map(([type, message], index) => (
        <AnimatedNotification
          isError={true}
          type={type}
          message={message}
          key={index}
        />
      ))}
      {Object.entries(notifications).map(([type, message], index) => (
        <AnimatedNotification
          isError={false}
          type={type}
          message={message}
          key={index}
        />
      ))}
    </div>
  );
};

const mapStateToProps = state => ({
  errors: state.core.errors,
  notifications: state.core.notifications
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(NotificationsList);
