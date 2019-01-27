import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Link } from "react-router-dom";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";


interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
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
    margin: "1em auto",
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
      {user && <Link to="/status" className={`${classes.button} ${classes.buttonSecondary}`}>ADMISSION STATUS</Link>}
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
