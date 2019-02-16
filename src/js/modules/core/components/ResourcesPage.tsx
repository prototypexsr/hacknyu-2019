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
  ResourcesPage: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    maxWidth: theme.containerMaxWidth,
    borderRadius: "0.5em",
    paddingBottom: "100px"
  },
  icons: {
    display: "flex",
    width: "100px",
    justifyContent: "space-around",
    fontSize: "2em",
    padding: "1em"
  },
  header: {
    width: "250px"
  },
  link: {
    textDecoration: "underline"
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
    ResourcesPage: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    ResourcesPage: {
      width: theme.containerMediumWidth
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    ResourcesPage: {
      width: theme.containerMobileWidth
    }
  }
});

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const ResourcesPage: React.FunctionComponent<Props> = ({ classes, user }) => {
  return (
    <div className={classes.ResourcesPage}>
      <h1 className={classes.title}>
        <a href="https://join.slack.com/t/hacknyu2019/shared_invite/enQtNTM2NjU0NjM1MTg3LTUxNThiNjNlYmU4Y2E1OWEzZWFiZjBhYzhhNzQ5ODY1ZWRkNzA0MjFkNzM4ZTE0YmZiMWMxY2NkMjdmMGQ4MDA">
          <img className={classes.header} src="/img/logos/slack.png" />
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        Please join the HackNYU 2019 Slack to communicate with other hackers
        during the event! Click{" "}
        <a className={classes.link} href="https://join.slack.com/t/hacknyu2019/shared_invite/enQtNTM2NjU0NjM1MTg3LTUxNThiNjNlYmU4Y2E1OWEzZWFiZjBhYzhhNzQ5ODY1ZWRkNzA0MjFkNzM4ZTE0YmZiMWMxY2NkMjdmMGQ4MDA">
          this link
        </a>{" "}
        to create an account or open the slack at hacknyu2019.slack.com
      </p>
      <h1 className={classes.title}>
        <a href="https://wp.nyu.edu/developers/2019/02/14/nyu-it-hackathon-apis/">
          <img className={classes.header} src="/img/logos/nyuit.jpg" />
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        Make use of{" "}
        <a className={classes.link} href="https://wp.nyu.edu/developers/2019/02/14/nyu-it-hackathon-apis/">
          NYU IT's APIs
        </a>{" "}
        to create innovative hacks! Gain access to datasets and APIs that power NYU.
      </p>
      <h1 className={classes.title}>
        <a href="https://bit.ly/2FXX2cQ">
          <img src="/img/logos/gcp.png" className={classes.header} />
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        For students who would like to use Google Cloud Platform, fill out{" "}
        <a className={classes.link} href="https://bit.ly/2FXX2cQ">this link</a> to receive $100 in
        credit!
      </p>
      <h1 className={classes.title}>
        <a href="https://jumpstart.me/r/hacknyu">
          <svg
            width="148"
            height="40"
            xmlns="http://www.w3.org/2000/svg"
            className="home-footer__logo"
          >
            <path
              d="M0 20.696V19.3C.37 8.595 9.196 0 19.994 0 31.026 0 40 8.97 40 19.998 40 31.028 31.025 40 19.994 40 9.196 40 .37 31.404 0 20.696zM20 37c9.374 0 17-7.625 17-17.002C37 10.626 29.374 3 20 3 10.625 3 3 10.626 3 19.998 3 29.375 10.625 37 20 37zm8.01-25.998c1.637 0 2.99 1.35 2.99 3A3.008 3.008 0 0 1 28.01 17 3.016 3.016 0 0 1 25 14.24v-.48A3.014 3.014 0 0 1 28.01 11v.002zm-8.02 0h2.99s.045 1.11 0 2.775v11.166c0 1.68-1.344 3.057-2.99 3.057H17V14.054C17 12.374 18.347 11 19.99 11v.002zm-8.505 11a3.007 3.007 0 0 1 2.987 2.762c0 .088.015.16.015.236 0 .08-.015.15-.015.23A3.008 3.008 0 0 1 11.487 28c-1.65 0-3-1.35-3-3.003a3 3 0 0 1 3-3h-.002v.005zm40.212-.36c0 .563-.07 1.073-.206 1.52-.13.448-.34.83-.61 1.143-.27.32-.61.56-1.01.73-.4.17-.87.255-1.4.255-.24 0-.48-.015-.72-.044-.23-.033-.48-.08-.74-.144l.09-.978a.426.426 0 0 1 .11-.228c.06-.055.14-.08.26-.08.09 0 .19.017.33.054.13.033.31.048.52.048.28 0 .54-.04.76-.125.22-.08.41-.212.56-.392.15-.18.268-.4.34-.69.08-.28.118-.62.118-1.02v-6.57h1.63v6.53h.003l-.035-.009zm8.99 2.218c.385 0 .73-.07 1.037-.197.304-.132.56-.316.775-.547.21-.234.37-.516.48-.842.11-.33.17-.69.17-1.094v-6.068h1.62v6.068c0 .595-.1 1.138-.28 1.642-.2.505-.47.94-.82 1.302-.35.37-.78.654-1.29.86-.51.207-1.07.315-1.71.315-.64 0-1.21-.11-1.71-.32-.51-.21-.94-.49-1.29-.86-.36-.36-.63-.8-.81-1.3-.2-.51-.29-1.05-.29-1.64v-6.07h1.63v6.06c0 .4.05.76.17 1.09.11.33.27.61.48.84.21.23.47.41.77.55.3.12.65.19 1.04.19l.028.021zm19.793-8.748v10.065h-1.436v-6.895c0-.112.002-.234.01-.366.007-.134.018-.27.03-.403l-3.235 5.973c-.13.247-.32.373-.58.373h-.23c-.27 0-.46-.13-.58-.38l-3.29-5.98.03.4c0 .14.01.26.01.38v6.89h-1.43V15.11H71c.144 0 .257.015.337.044.08.024.15.103.216.234l3.227 5.846c.07.133.137.276.2.415.06.14.12.28.17.44.056-.16.114-.3.18-.45.06-.15.127-.29.198-.42l3.178-5.84c.065-.13.138-.21.218-.24.08-.03.19-.05.334-.05h1.222v.023zm8.25 0c.658 0 1.226.08 1.707.236.483.152.88.368 1.197.646.314.277.547.61.7 1 .154.387.23.815.23 1.288 0 .48-.08.918-.24 1.317-.165.4-.407.73-.73 1.02-.32.28-.72.51-1.197.67-.478.16-1.034.24-1.667.24h-1.496v3.63H85.6V15.11h3.13v.002zm0 5.135c.366 0 .684-.048.962-.143.274-.09.507-.225.692-.395.183-.17.322-.38.417-.62.09-.24.14-.51.14-.81 0-.29-.04-.56-.13-.79a1.51 1.51 0 0 0-.4-.59c-.18-.17-.41-.29-.69-.38-.27-.09-.6-.13-.97-.13h-1.5v3.85h1.5l-.021.008zm13.39-3.415a.614.614 0 0 1-.16.19.374.374 0 0 1-.21.06.515.515 0 0 1-.296-.114 5.827 5.827 0 0 0-.406-.247c-.16-.09-.35-.17-.57-.25-.217-.08-.48-.11-.782-.11-.28 0-.525.04-.736.11-.214.07-.393.17-.534.29-.145.13-.254.28-.328.45-.07.17-.108.36-.108.56 0 .26.068.47.204.64.135.18.31.32.534.44.223.12.474.23.758.32.285.09.574.19.87.29.297.1.584.22.868.35.287.13.538.3.76.5.22.2.4.44.535.73.13.29.2.64.2 1.06 0 .45-.08.87-.23 1.26-.16.39-.38.73-.67 1.02-.29.29-.65.52-1.08.69-.43.17-.91.26-1.46.26-.32 0-.64-.032-.94-.094a4.525 4.525 0 0 1-1.66-.677c-.25-.164-.46-.35-.65-.544l.47-.784a.45.45 0 0 1 .16-.152c.06-.036.13-.06.21-.06.102 0 .22.054.36.156.13.1.28.206.47.324.18.12.4.224.67.33.26.1.57.15.93.15.59 0 1.05-.15 1.37-.44.322-.29.483-.69.483-1.194 0-.286-.07-.52-.2-.694a1.678 1.678 0 0 0-.54-.455 3.284 3.284 0 0 0-.76-.31c-.285-.09-.574-.176-.867-.27-.293-.1-.584-.214-.868-.34-.29-.13-.54-.3-.76-.504-.226-.21-.4-.464-.54-.77s-.204-.682-.204-1.14c0-.362.07-.72.21-1.06.143-.34.35-.64.62-.91.27-.26.606-.47 1.01-.63.4-.16.85-.24 1.37-.24.575 0 1.1.09 1.585.27.48.18.893.44 1.244.78l-.4.78.068-.021zm12.014-.355h-3.14v8.7h-1.624v-8.7h-3.145v-1.365h7.91v1.365h-.001zm11.56 8.7h-1.263a.523.523 0 0 1-.35-.11.726.726 0 0 1-.2-.267l-.83-2.222h-4.33l-.83 2.222c-.03.093-.1.18-.2.263a.547.547 0 0 1-.35.114h-1.26l3.99-10.065h1.66l3.99 10.065h-.027zm-3.096-3.77l-1.385-3.678c-.114-.29-.224-.65-.34-1.09-.052.22-.107.42-.17.6-.06.18-.116.34-.168.48l-1.383 3.67h3.446v.018zm14.654 3.77h-1.46c-.288 0-.498-.112-.628-.335l-2.35-3.39a.73.73 0 0 0-.256-.248.916.916 0 0 0-.42-.08h-.908v4.053h-1.636V15.112h2.964c.66 0 1.23.068 1.708.207.477.13.87.32 1.176.57.31.24.536.55.68.9.15.34.22.73.22 1.16 0 .35-.05.67-.153.98-.11.3-.26.57-.46.82-.2.24-.44.46-.73.64s-.62.32-.99.42c.2.12.37.29.52.51l2.71 3.83.013.028zm-4.738-5.24c.374 0 .7-.045.98-.137.28-.09.514-.22.7-.38.185-.16.324-.36.418-.586.093-.223.14-.476.14-.746 0-.55-.18-.972-.545-1.263-.364-.283-.913-.43-1.65-.43h-1.327v3.543h1.285l-.001-.001zm15.316-3.46h-3.14v8.7h-1.626v-8.7h-3.146v-1.365h7.912v1.365z"
              fill="#111"
              scale="1.2"
            />
          </svg>{" "}
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        Jumpstart is a university recruiting platform dedicated to democratizing
        the college tech recruiting process. Sign-up today using{" "}
        <a className={classes.link} href="https://jumpstart.me/r/hacknyu">this link</a> to start using
        the platform! As a bonus, every sign-up this weekend through the link at
        HackNYU will be entered into a raffle for a new (6th generation) iPad!
      </p>
      <h1 className={classes.title}>
        <a href="https://ripplematch.com/index?r=cudqVH#register">
          <img className={classes.header} src="/img/logos/ripplematch.png" />
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        If you want to get a head start on getting in touch with tons of awesome
        companies, including our sponsors, sign up for RippleMatch with our{" "}
        <a className={classes.link} href="https://ripplematch.com/index?r=cudqVH#register">
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
        <a href="https://www.codecademy.com/">
          <img
            className={classes.header}
            src="/img/logos/codecademy.png"
          />
        </a>
      </h1>
      <Underline />
      <p className={classes.text}>
        Sign up <a className={classes.link} href="https://www.codecademy.com/">at Codecademy</a> with
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
)(ResourcesPage);
