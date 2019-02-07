import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { User } from "firebase";
import { compose } from "redux";
import { connect } from "react-redux";
import { Theme } from "../../ThemeInjector";
import { ReduxState } from "../../../reducers";
import Underline from "./Underline";
// @ts-ignore
import { TwitterTimelineEmbed } from "react-twitter-embed";

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  TwitterFeed: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: "80px"
  },
  title: {
    fontSize: "2em",
    textTransform: "uppercase"
  },
  feed: {
    paddingTop: "20px",
    width: "600px"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    feed: {
      width: "70vw"
    }
  }
});

const TwitterFeed: React.FunctionComponent<Props> = ({ user, classes }) => {
  return (
    <div className={classes.TwitterFeed}>
      <h1 className={classes.title}> Twitter Feed </h1>
      <Underline />
      <div className={classes.feed}>
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="HackNYU"
          noHeader={true}
          noFooter={true}
          noBorders={true}
          options={{ height: 500 }}
        />
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
)(TwitterFeed);
