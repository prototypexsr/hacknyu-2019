import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Link } from "react-router-dom";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";
// @ts-ignore
import Scrollchor from "react-scrollchor";

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  LiveHero: {
    maxWidth: theme.containerMaxWidth,
    width: "100%",
    paddingTop: "50px",
    textAlign: "center"
  },
  icon: {
    width: "48px",
    marginBottom: "15px"
  },
  title: {
    fontSize: "3.6em",
    fontWeight: "bold",
    paddingRight: "0.2em"
  },
  subtitle: {
    fontWeight: "400",
    fontSize: "2.5em"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "column",
    alignItems: "center",
    margin: "15px"
  },
  button: {
    margin: "0.5em 1em",
    padding: "15px 35px 15px 35px",
    borderRadius: "5px",
    fontSize: "1.2em",
    backgroundColor: theme.highlightColor,
    color: theme.backgroundColor,
    fontWeight: "bold",
    transition: "color 1s, background-color 1s, transform 200ms",
    width: "fit-content",
    display: "block",
    "&:hover": {
      textDecoration: "none",
      transform: "scale(1.1)"
    }
  },
  buttonSecondary: {
    backgroundColor: theme.backgroundColor,
    color: theme.highlightColor,
    border: theme.highlightColor + " 2px solid"
  },
  firstRow: {
    display: "flex"
  },
  info: {
    margin: "0.5em"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    buttons: {
      flexFlow: "column"
    }
  }
});

const LiveHero: React.FunctionComponent<Props> = ({ user, classes }) => {
  return (
    <div className={classes.LiveHero}>
      <img className={classes.icon} src="img/logo-icon.svg" />
      <div>
        <span className={classes.title}>HackNYU</span>
        <span className={classes.subtitle}>is live!</span>
      </div>
      <div className={classes.buttons}>
        <div className={classes.firstRow}>
          <Scrollchor to="#tweets" className={classes.button}>
            TWEETS
          </Scrollchor>
          <Scrollchor to="#schedule" className={classes.button}>
            SCHEDULE
          </Scrollchor>
        </div>
        <Link to="/resources">
          <div className={`${classes.buttonSecondary} ${classes.button}`}>
            RESOURCES
          </div>
        </Link>
      </div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(LiveHero);
