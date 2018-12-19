import * as React from "react";
import { delay } from "../../utils";
import { bindActionCreators } from "redux";
import { clearError, clearNotification } from "../coreActions";
import { connect } from "react-redux";
import Notification from "./Notification";
import { NOTIFICATION_TIME_INTERVALS } from "../../constants";

export enum States {
  Mounting,
  Mounted,
  Unmounting
}

interface Props {
  message: string;
  isError: boolean;
  type: string;
  clearError: (errorType: string) => any;
  clearNotification: (notificationType: string) => any;
}

interface State {
  componentState: States;
}

class AnimatedNotification extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      componentState: States.Mounting
    };
  }

  componentDidMount() {
    const { clearError, clearNotification, type, isError } = this.props;
    const {
      ANIMATION_BUFFER,
      DISPLAY_TIME,
      ANIMATION_TIME
    } = NOTIFICATION_TIME_INTERVALS;
    delay(ANIMATION_BUFFER)
      .then(() => this.setState({ componentState: States.Mounted }))
      .then(() => delay(DISPLAY_TIME))
      .then(() => this.setState({ componentState: States.Unmounting }))
      .then(() => delay(ANIMATION_TIME))
      .then(() => {
        if (isError) {
          clearError(type);
        } else {
          clearNotification(type);
        }
      });
  }

  render() {
    // Ugh, hate having to create a state wrapper for this.
    // Damn react-jss
    const { message, isError } = this.props;
    return (
      <Notification
        message={message}
        isError={isError}
        componentState={this.state.componentState}
      />
    );
  }
}
const mapDispatchToProps = dispatch =>
  bindActionCreators({ clearError, clearNotification }, dispatch);

export default connect(
  undefined,
  mapDispatchToProps
)(AnimatedNotification);
