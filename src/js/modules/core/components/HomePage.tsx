import * as React from "react";
import injectSheet, { Styles } from "react-jss";
import { JssRules, Theme } from "../../types";
import AnimatedSubwayLine from "./AnimatedSubwayLine";
import ApplyButton from "./ApplyButton";
import TrackInfo from "./TrackInfo";
import AboutSection from "./AboutSection";
import { trackColors } from "../../ThemeInjector";
import Timeline from "./Timeline";

interface HomePageStyles<T> extends Styles {
  HomePage: T;
  aboutSection: T;
  timelineSection: T;
  tracksSection: T;
  lines: T;
  info: T;
  timeline: T;
}

interface Props {
  classes: HomePageStyles<string>;
  viewportWidth: number;
}
interface State {
  activeBlocks: number;
}

interface StepData {
  element: HTMLElement;
  data: number;
  direction: string;
}

const styles = (theme: Theme): HomePageStyles<JssRules> => ({
  HomePage: {
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.backgroundColor,
    alignItems: "center"
  },
  aboutSection: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  timelineSection: {
    background: `linear-gradient(${theme.secondBackground}, ${
      theme.secondBackground
    })`,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "400px"
  },
  tracksSection: {
    backgroundColor: theme.secondBackground,
    color: theme.secondFont
  },
  lines: {
    display: "flex",
    minHeight: "300px",
    flexDirection: "column",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "20px 0 0 0",
    width: "100%"
  },
  info: {
    display: "flex",
    flexDirection: "column"
  },
  timeline: {
    width: "20vw"
  },
});

class HomePage extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.HomePage}>
        <ApplyButton />
        <div className={classes.lines}>
          <AnimatedSubwayLine color={trackColors.green} />
          <AnimatedSubwayLine color={trackColors.red} />
          <AnimatedSubwayLine color={trackColors.blue} />
          <AnimatedSubwayLine color={trackColors.orange} />
        </div>
        <div className={classes.info}>
          <div className={classes.aboutSection}>
            <AboutSection />
          </div>
          <div className={classes.timelineSection}>
            <Timeline/>
          </div>
          <div className={classes.tracksSection}>
            <TrackInfo />
          </div>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(HomePage);
