import * as React from "react";
import Underline from "./Underline";
import { Link } from "react-router-dom";
import { compose } from "redux";
import { connect } from "react-redux";
import { User } from "firebase";
import injectSheet, { WithStyles } from "react-jss";
import { ReduxState } from "../../../reducers";
import { Theme } from "../../ThemeInjector";

const styles = (theme: Theme) => ({
  AboutPage: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    maxWidth: theme.containerMaxWidth,
    borderRadius: "0.5em"
  },
  icons: {
    display: "flex",
    width: "100px",
    justifyContent: "space-around",
    fontSize: "2em",
    padding: "1em"
  },
  text: {
    maxWidth: "50vw",
    fontSize: "1.3em",
    paddingLeft: "2em",
    paddingRight: "2em"
  },
  title: {
    fontSize: "2em",
    paddingTop: "1.5em",
    paddingBottom: "0.2em",
    textTransform: "uppercase"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    AboutPage: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    AboutPage: {
      width: theme.containerMediumWidth
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    AboutPage: {
      width: theme.containerMobileWidth
    }
  }
});

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const AboutPage: React.FunctionComponent<Props> = ({ classes, user }) => {
  return (
    <div className={classes.AboutPage}>
      <h1 className={classes.title}>
        <a href="https://join.slack.com/t/hacknyu2019/shared_invite/enQtNTM2NjU0NjM1MTg3LTUxNThiNjNlYmU4Y2E1OWEzZWFiZjBhYzhhNzQ5ODY1ZWRkNzA0MjFkNzM4ZTE0YmZiMWMxY2NkMjdmMGQ4MDA">
          SLACK
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        Please join the HackNYU 2019 Slack to communicate with other hackers
        during the event! Click{" "}
        <a href="https://join.slack.com/t/hacknyu2019/shared_invite/enQtNTM2NjU0NjM1MTg3LTUxNThiNjNlYmU4Y2E1OWEzZWFiZjBhYzhhNzQ5ODY1ZWRkNzA0MjFkNzM4ZTE0YmZiMWMxY2NkMjdmMGQ4MDA">
          this link
        </a>{" "}
        to create an account or open the slack at hacknyu2019.slack.com
      </p>
      <h1 className={classes.title}>
        <a href="https://wp.nyu.edu/developers/2019/02/14/nyu-it-hackathon-apis/">
          NYU IT APIS
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        Make use of{" "}
        <a href="https://wp.nyu.edu/developers/2019/02/14/nyu-it-hackathon-apis/">
          NYU IT's APIs
        </a>{" "}
        to create innovative hacks!
      </p>
      <h1 className={classes.title}>
        <a href="https://bit.ly/2FXX2cQ"> GOOGLE CLOUD PLATFORM CREDITS </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        For students who would like to use Google Cloud Platform, fill out{" "}
        <a href="https://bit.ly/2FXX2cQ">this link</a> to receive $100 in
        credit!
      </p>
      <h1 className={classes.title}>
        <a href="https://jumpstart.me/r/hacknyu"> JUMPSTART </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        Jumpstart is a university recruiting platform dedicated to democratizing
        the college tech recruiting process. Sign-up today using{" "}
        <a href="https://jumpstart.me/r/hacknyu">this link</a> to start using the platform! As a bonus, every
        sign-up this weekend through the link at HackNYU will be entered into a
        raffle for a new (6th generation) iPad!
      </p>
      <h1 className={classes.title}>
        <a href="https://ripplematch.com/index?r=cudqVH#register">
          {" "}
          RIPPLEMATCH{" "}
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        If you want to get a head start on getting in touch with tons of awesome
        companies, including our sponsors, sign up for RippleMatch with our{" "}
        <a href="https://ripplematch.com/index?r=cudqVH#register">
          HackNYU link
        </a>
        ! RippleMatch uses AI to help busy students increase their likelihood of
        getting first-round interviews to over 100 different leading tech teams
        with a one-off, free 5-minute account. Sign up using the HackNYU link by
        Friday, February 15th and enter a raffle to win a free t-shirt and 1-1
        meeting with RippleMatch CTO, Eric Ho, a Yale computer science and
        Facebook alum.
      </p>
      <h1 className={classes.title}>
        <a href="https://www.codecademy.com/"> CODECADEMY </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        Sign up <a href="https://www.codecademy.com/">at Codecademy</a> with
        promo code TANDON for a one time only, $10 off for any Codecademy Pro
        plan expiring 3/11/2018 (in a month!)
      </p>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(AboutPage);
