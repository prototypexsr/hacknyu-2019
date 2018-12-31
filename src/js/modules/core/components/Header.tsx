import * as React from "react";
import { connect } from "react-redux";
import injectSheet, { Styles } from "react-jss";
import { Link } from "react-router-dom";
// @ts-ignore
import { loginWithGoogle, logout } from "../coreActions";
import { User } from "firebase";
import { Theme } from "../../types";

interface HeaderStyles<T> extends Styles {
  Header: T;
  masthead: T;
  headerText: T;
  link: T;
  links: T;
  locations: T;
  dot: T;
  "@media (max-width: 800px)": T;
  bullet: T;
}
const styles = (theme: Theme): HeaderStyles => ({
  Header: {
    height: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "flex-start",
    width: "100%",
    maxWidth: theme.containerWidth,
  },
  link: {
    display: "flex",
    flexDirection: "row",
    fontSize: "1.4em",
    fontWeight: "bold",
    marginRight: "1em",
    color: theme.fontColor,
    "&:hover": {
      textDecoration: "underline",
    },
    "&:active": {
      textDecoration: "underline",
    },
  },
  links: {
    width: "100%",
    height: "6.5em",
    display: "flex",
    alignItems: "center",
  },
  error: {
    color: "red"
  },
  locations: {
    paddingTop: "40px",
    paddingBottom: "5px",
    display: "flex",
    flexDirection: "row",
    alignItems: "flex-end",
    fontSize: "1.4em",
    fontVariant: "small-caps"
  },
  dot: {
    padding: "0px 8px 0px 8px"
  },
  "@media (max-width: 800px)": {
    Header: {
      flexDirection: "column",
      minHeight: "200px"
    },
    headerText: {
      maxWidth: "80vw",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      fontSize: "1em"
    },
    link: {
      fontSize: "1em",
    }
  }
});

interface Props {
  classes: { [s: string]: string };
  user: User;
  error: string;
  viewportWidth: number;
  logout: () => any;
}

const Header: React.SFC<Props> = ({ classes, user, logout, viewportWidth }) => {
  return (
    <div className={classes.Header}>
      <div className={classes.links}>
            <Link to="/">
                <div className={classes.link}>HOME</div>
            </Link>
            <Link to="/about">
                <div className={classes.link}>ABOUT</div>
            </Link>
        {user ? (
          [
            <Link to="/my_profile" className={classes.link} key={1}>
              PROFILE
            </Link>,
            <a key={0} href="#" className={classes.link} onClick={logout}>
              LOGOUT
            </a>
          ]
          ) : (
          [
            <Link to="/login" className={classes.link}>
              LOGIN
            </Link>,
            <Link to="/register" className={classes.link}>
              REGISTER
            </Link>
          ]
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state: any) => ({
  user: state.core.user,
  error: state.core.error,
  viewportWidth: state.core.viewportWidth
});

const mapDispatchToProps = (dispatch: any) => ({
  logout: () => {
    dispatch(logout());
  }
});

export default injectSheet(styles)(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Header)
);
