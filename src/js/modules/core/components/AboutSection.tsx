import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "./Underline";
import { Theme } from "../../ThemeInjector";

interface Props extends WithStyles<typeof styles> {}

const styles = (theme: Theme) => ({
  AboutSection: {
    display: "flex",
    alignItems: "center",
    padding: "40px",
    flexDirection: "column",
    margin: "0 5% 0 5%"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "25px",
    padding: "5% 0 5% 0",
    margin: "5%",
    width: "80vw",
    maxWidth: "750px",
    backgroundColor: theme.secondBackgroundHighlight,
    color: theme.secondFont,
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "4px 7px 21px -2px rgba(0,0,0,0.25)"
  },
  intro: {
    fontSize: "1.4rem",
    maxWidth: "500px",
    width: "60vw",
    lineHeight: "1.1em"
  },
  title: {
    fontSize: "2em"
  }
});

const AboutSection: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.AboutSection}>
      <div className={classes.content}>
        <h1 className={classes.title}> ABOUT </h1>
        <Underline />
        <p className={classes.intro}>
          HackNYU is NYU's annual student-run hackathon, where people of all
          disciplines come together to create a project that addresses one of
          several social initiatives, or &ldquo;tracks&rdquo;. HackNYU takes
          place simultaneously in New York, Abu Dhabi and Shanghai over 48
          hours. This year, HackNYU be from February 15th to 17th. HackNYU is
          free, and made possible thanks to our wonderful sponsors and
          volunteers.
        </p>
        <p className={classes.intro}>Come join us at HackNYU 2019!</p>
      </div>
    </div>
  );
};

export default injectSheet(styles)(AboutSection);
