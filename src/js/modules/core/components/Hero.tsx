import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Link } from "react-router-dom";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";
import { IS_REGISTRATION_OPEN } from "../../constants";

interface Props extends WithStyles<typeof styles> {
  user: User;
  confirmTimestamp?: string;
}

const styles = (theme: Theme) => ({
  Hero: {
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
    margin: "0.15em 0em",
    fontSize: "3.6em"
  },
  subtitle: {
    fontWeight: "400",
    fontSize: "1.8em",
    marginBottom: "0px"
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
  info: {
    margin: "0.5em"
  },
  blurb: {
    width: "360px"
  },
});

// Murai
const Hero: React.FunctionComponent<Props> = ({
  confirmTimestamp,
  user,
  classes
}) => {
  let mainButtons = [];
  // Some nasty logic here. TODO: Fix this shit
  mainButtons.push(
    <p className={classes.blurb}> 
    Welcome to the event!
    <br/> Login and have your ticket ready for check in. 
    <br/> Make sure all your information is correct before you show your ticket.
    </p>
  );

  mainButtons.push(
  <Link key={0} to="/live" className={`${classes.button}`}>
    DAY OF INFO
  </Link>
  );

  if (IS_REGISTRATION_OPEN) {
    if (user) {
      mainButtons.push(
        <Link key={1} to="/apply" className={classes.button}>
          EDIT APPLICATION
        </Link>
      );
    } else {
      mainButtons.push(
        <Link key={2} to="/register" className={classes.button}>
          REGISTER
        </Link>
      );
    }
  } else if (confirmTimestamp) {
    mainButtons.push(
      <Link className={`${classes.button} ${classes.buttonSecondary}`} to="/ticket">
        CHECK IN TICKET
      </Link>
    );
    mainButtons.push(
      <Link
        to="/apply"
        className={`${classes.button} ${classes.buttonSecondary}`}
      >
        EDIT INFORMATION
      </Link>
    );
  } else {
    if (user) {
      mainButtons.push(
        <Link key={3} to="/status" className={classes.button}>
          ADMISSION STATUS
        </Link>
      );
      mainButtons.push(
        <Link
          to="/apply"
          className={`${classes.button} ${classes.buttonSecondary}`}
        >
          EDIT APPLICATION
        </Link>
      );
    } else {
      mainButtons.push(
        <Link key={4} to="/login" className={classes.button}>
          LOGIN
        </Link>
      );
    }
  }

  return (
    <div className={classes.Hero}>
      <img className={classes.icon} src="img/logo-icon.svg" />
      <h1 className={classes.title}>HackNYU</h1>
      <h3 className={classes.subtitle}>Feb 15&ndash;17, 2019</h3>
      {IS_REGISTRATION_OPEN && [
        <p key={0} className={classes.info}>
          Registration for HackNYU 2019 is now closed.
        </p>,
        <p key={1} className={classes.info}>
          Log in to check your admission status.
        </p>
      ]}
      <div className={classes.buttons}>{mainButtons}</div>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user,
  confirmTimestamp: state.core.confirmForm.confirmTimestamp
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(Hero);
