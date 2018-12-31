import * as React from "react";
import { ReactNode } from "react";
import injectSheet, { Styles } from "react-jss";
import { withRouter } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { ReduxState, Theme } from "../../types";
// @ts-ignore
import { loadInitialState, refreshWindowDimensions } from "../coreActions";
import Header from "./Header";
import { User } from "firebase";
import UserInfo from "./UserInfo";
import Alerts from "./Alerts";
import LoadingIcon from "./LoadingIcon";

interface MainAppStyles<T> extends Styles {
  MainApp: T;
  loadingScreen: T;
  loadingIcon: T;
}

interface Props {
  classes: MainAppStyles<string>;
  children: ReactNode;
  location: Location;
  user: User;
  addUser: (u: User) => any;
  deleteUser: () => any;
  onResizeWindow: () => any;
}

const styles = (theme: Theme): MainAppStyles<object> => ({
  MainApp: {
    backgroundColor: theme.backgroundColor,
    color: theme.fontColor,
    transition: "background-color 2s, font-color 2s",
    fontFamily: theme.fontFamily,
    width: "100vw",
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  loadingScreen: {
    fontFamily: theme.fontFamily,
    fontSize: "1.2em",
    fontVariant: "small-caps",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    height: "80vh"
  },
  loadingIcon: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    color: "white",
    padding: "50px",
    backgroundColor: theme.highlightColor
  }
});

class MainApp extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
    props.loadInitialState(props.location);
  }

  onResizeWindow = () => {
    this.props.onResizeWindow();
  };
  componentDidMount() {
    window.addEventListener("resize", this.onResizeWindow);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.onResizeWindow);
  }
  render() {
    let { classes, children, user, isLoading } = this.props;
    if (isLoading) {
      return (
        <div className={classes.loadingScreen}>
          <div className={classes.loadingIcon}>
          <h2> Loading... </h2>
          <LoadingIcon width="100px" height="100px" padding="0 20px 0 0"/>
          </div>
        </div>
      );
    }
    return (
      <div className={classes.MainApp}>
        <Alerts />
        <Header />
        {user && <UserInfo user={user} />}
        {children}
      </div>
    );
  }
}

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  isLoading: state.core.isLoading
});

const mapDispatchToProps = (dispatch: any) => ({
  loadInitialState: (location: Location) => {
    dispatch(loadInitialState(location));
  },
  onResizeWindow: () => {
    dispatch(refreshWindowDimensions());
  }
});

// @ts-ignore
export default compose(
  withRouter,
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(MainApp);
