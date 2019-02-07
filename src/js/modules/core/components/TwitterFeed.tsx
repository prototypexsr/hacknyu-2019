import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";
import Underline from "./Underline";

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  TwitterFeed: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "50px",
  },
  title: {
    fontSize: "2em",
    textTransform: "uppercase"
  }
});

const TwitterFeed: React.FunctionComponent<Props> = ({ user, classes }) => {
  return (
    <div className={classes.TwitterFeed}>
      <h1 className={classes.title}> Twitter Feed </h1>
      <Underline />
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(TwitterFeed);
