import * as React from "react";
import Error from "./Error";
import { GlobalError } from "../../types";
import { delay } from "../../utils";

export enum States {
  Mounting,
  Mounted,
  Unmounting
}

interface Props {
  error: GlobalError;
}

interface State {
  componentState: States;
}

// Need to give a slight delay for...erm reasons?
const ANIMATION_BUFFER = 100;

class AnimatedError extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      componentState: States.Mounting
    };
  }

  componentDidMount() {
    delay(ANIMATION_BUFFER)
      .then(() => this.setState({ componentState: States.Mounted }));
  }

  render() {
    // Ugh, hate having to create a state wrapper for this.
    // Damn react-jss
    const { error } = this.props;
    return <Error error={error} componentState={this.state.componentState} />;
  }
}

export default AnimatedError;
