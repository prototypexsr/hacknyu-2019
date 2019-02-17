import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";
import { Link } from "react-router-dom";
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
  link: {
    color: theme.secondBackground,
    textDecoration: "underline"
  },
  subtitle: {
    fontWeight: "400",
    fontSize: "2.5em"
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    flexFlow: "row",
    alignItems: "center",
    maxWidth: "500px",
    flexWrap: "wrap",
    margin: "15px auto"
  },
  button: {
    margin: "0.5em",
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
    width: "300px",
    margin: "0 auto",
    padding: "10px"
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
        <p className={classes.info}>
        Judging will take place on Sunday from 1:15pm to 4pm. Submit projects via the button below. If your project is not submitted, it will not be judged (please check with an organizer if you need help).
        {" "}
        </p>
      </div>
      <div className={classes.buttons}>
        <a href="https://hacknyu2019.devpost.com/" className={`${classes.button}`}>
          SUBMIT PROJECT
        </a>
        <Scrollchor to="#tweets" className={`${classes.button} ${classes.buttonSecondary}`}>
          TWEETS
        </Scrollchor>
        <Scrollchor
          to="#schedule"
          className={`${classes.button} ${classes.buttonSecondary}`}
        >
          SCHEDULE
        </Scrollchor>
        <Link
          to="/prizes"
          className={`${classes.button} ${classes.buttonSecondary}`}
        >
          PRIZES
        </Link>        
        <Link to="/resources">
          <div className={`${classes.buttonSecondary} ${classes.button}`}>
            RESOURCES
          </div>
        </Link>
        <a href="https://mentors.mlh.io/" className={`${classes.buttonSecondary} ${classes.button}`}>
          FIND A MENTOR
        </a>
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
