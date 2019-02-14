import * as React from "react";
import withStyles, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";

type Props = WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
  FirstTimePage: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    color: theme.secondFont,
    backgroundColor: theme.secondBackground,
    width: theme.containerLargeWidth,
    borderRadius: "0.5em",
    padding: "50px",
    fontSize: "1.1em"
  },
  content: {
    fontSize: "1.3rem"
  },
  adviceBullet: {
    padding: "5px"
  },
  sectionHeader: {
    margin: "50px 0 15px 0"
  },
  tinyText: {
    fontSize: "0.8rem"
  },
  languageList: {
    paddingTop: "5px"
  },
  languageGroup: {
    fontSize: "1.05em"
  }
});

const FirstTimePage: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.FirstTimePage}>
      <h1> First Time Hacker Guide </h1>
      <div className={classes.content}>
        <p>
          First time at a hackathon? Feeling overwhelmed? Not to worry! We've
          prepared a guide for first time hackers (or anybody looking for
          awesome activities).
        </p>
        <h2 className={classes.sectionHeader}> Bucket List </h2>
        <p>
          HackNYU is far more than just a programming competition! If competing
          isn't your style, or if you need a break from coding, check out some
          of our awesome activities!
        </p>
        <ul>
          <li> Attend a workshop! </li>
          <li> Win a cup stacking competition! </li>
          <li> Go to team hunt! </li>
          <li> Chat with a sponsor! </li>
          <li> Borrow from the MLH Hardware Lab! </li>
          <li> Decorate some cupcakes! </li>
          <li> Play pool at midnight </li>
        </ul>
        <h2 className={classes.sectionHeader}> Ideas &amp; Projects </h2>
        <p>
          Trying to brainstorm project ideas? Worried about finding the right
          team? Not a problem. Hackathons are a great place to experiment and
          take risks. Here's some advice when it comes to projects.
        </p>
        <ul>
          <li className={classes.adviceBullet}>
            <b>Try a new role.</b> You're a back end badass? Try front end!
            Master at mobile? Give data science a shot!
          </li>
          <li className={classes.adviceBullet}>
            <b>Join a new team. </b> The best hackathon teams are made at the
            event. Go to team hunt and meet some new, awesome programmers!
          </li>
          <li className={classes.adviceBullet}>
            <b>Find a problem in your day to day life.</b> Hackathon projects
            don't always need to be grandiose and world-changing. Some of the
            best hacks solve a small, but relatable problem.
          </li>
          <li className={classes.adviceBullet}>
            <b> Take a break. </b> Hackathons are tiring! Sometimes it's good to
            take a break from the coding and cross something off your bucket
            list *hint* *hint*.
          </li>
          <li className={classes.adviceBullet}>
            <b> Sleep. </b> Sleep is good for you. Sleep is the best stimulant.
            If you're too tired, you can't code. Or worse, you make more bugs
            which you have to fix later.
          </li>
          <li className={classes.adviceBullet}>
            <b> Learn a new language. </b> Learning a new language opens up
            different usecases and a different philosophy of programming. Here's
            some languages to check out:
            <ul className={classes.languageList}>
              <li>
                <span className={classes.languageGroup}>
                  Functional &amp; Fun:{" "}
                </span>
                Haskell, Elixir, OCaml, Racket, Elm, Carp, F#, 1ML, Agda, Coq,
                Idris
              </li>
              <li>
                <span className={classes.languageGroup}>
                  Speedy &amp; Smart:{" "}
                </span>
                Rust, Go, Zig, Nim, D, Futhark
              </li>
              <li>
                <span className={classes.languageGroup}>Old Made New: </span>
                Ruby, Clojure, Crystal, Dart, Kotlin, TypeScript
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default withStyles(styles)(FirstTimePage);
