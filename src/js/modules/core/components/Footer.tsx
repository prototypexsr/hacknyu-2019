import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter
} from "@fortawesome/free-brands-svg-icons";

const styles = (theme: Theme): object => ({
  Footer: {
    padding: "2em",
    marginTop: "100px",
    backgroundColor: "#333",
    width: "100%"
  },
  footerLogo: {
    width: "200px",
    padding: "50px",
    display: "block",
    margin: "25px auto",
    border: "3px solid white"
  },
  a: {
    color: theme.fontColor,
    textDecoration: "underline"
  },
  socialMediaLink: {
    color: theme.fontColor,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "none"
    }
  },
  p: {
    margin: "0.25em",
    textAlign: "center"
  }
});

const Footer: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.Footer}>
      <p class={classes.p}>Copyright © 2018 HackNYU. </p>
      <p class={classes.p}>Contact us at: support.hack@nyu.edu</p>
      <p class={classes.p}>Find us on social media: 
        <a class={classes.socialMediaLink} href="https://www.facebook.com/hacknyu"> <FontAwesomeIcon icon={faFacebook} /> </a>
        <a class={classes.socialMediaLink} href="https://twitter.com/hacknyu"> <FontAwesomeIcon icon={faTwitter} /> </a>
      </p>
      <img class={classes.footerLogo} src="/img/hacknyu-logo-full.svg"/>
      <p class={classes.p}>Website proudly built from scratch by HackNYU tech team!</p>
      <p class={classes.p}>Open sourced <a href="https://github.com/hacknyu/hacknyu-2019" class={classes.a}>here</a>.</p>
      
    </div>
  );
};

export default injectSheet(styles)(Footer);