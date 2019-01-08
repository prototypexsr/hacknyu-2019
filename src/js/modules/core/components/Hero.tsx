import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { JssRules, ReduxState, Theme } from "../../types";
import { Link } from "react-router-dom";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";

interface HeroStyles<T> extends Styles {
  Hero: T;
  title: T;
  subtitle: T;
  button: T;
}

interface Props {
  classes: { [s: string]: string };
  user: User;
}

const styles = (theme: Theme): HeroStyles<JssRules> => ({
  Hero: {
    maxWidth: theme.containerMaxWidth,
    width: "100%",
    paddingTop: "4em",
    paddingBottom: "4em",
    textAlign: "center",
  },
  title: {
    margin: "0.15em 0em",
    fontSize: "3.6em",
  },
  subtitle: {
    fontWeight: "400",
    fontSize: "1.8em",
    marginBottom: "1.6em",
  },
  button: {
    maxWidth: "80px",
    margin: "0 auto",
    padding: "15px 35px 15px 35px",
    borderRadius: "5px",
    fontSize: "1.2em",
    backgroundColor: theme.highlightColor,
    color: theme.backgroundColor,
    fontWeight: "bold",
    transition: "color 1s, background-color 1s",
    width: "fit-content",
    "&:hover": {
      textDecoration: "none"
    }
  }
});

// Murai
const Hero: React.SFC<Props> = ({ user, classes }) => {
  return (
    <div className={classes.Hero}>
      <h1 className={classes.title}>HackNYU</h1>
      <h3 className={classes.subtitle}>Feb 15&ndash;17, 2019</h3>
      <Link to={user ? "/apply" : "/register"} className={classes.button}>
        {user ? "APPLY" : "REGISTER"}
      </Link>
    </div>
  )
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(Hero);
