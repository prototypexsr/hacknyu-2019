import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import LiveHero from "./LiveHero";
import TrackInfo from "./TrackInfo";
import AnimatedSubwayLines from "./AnimatedSubwayLines";
import { Theme } from "../../ThemeInjector";
import SponsorshipSection from "./SponsorshipSection";
import TwitterFeed from "./TwitterFeed";

type Props = WithStyles<typeof styles>;

const styles = (theme: Theme) => ({
  LivePage: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    alignItems: "center",
    width: "100vw"
  },
  twitterSection: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  tracksSection: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  sponsorshipSection: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  curvedTop: {
    width: "100vw",
    transform: "translateY(0.75vh)"
  },
  info: {
    display: "flex",
    width: "100vw",
    flexDirection: "column"
  }
});

const LivePage: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.LivePage}>
      <LiveHero />
      <AnimatedSubwayLines />
      <div className={classes.info}>
        <div id="tweets" className={classes.twitterSection}>
          <TwitterFeed />
        </div>
        <div className={classes.tracksSection}>
          <TrackInfo />
        </div>
        <div className={classes.sponsorshipSection}>
          <SponsorshipSection />
        </div>
      </div>
    </div>
  );
};

export default injectSheet(styles)(LivePage);
