import * as React from "react";
import injectSheet, { Styles } from "react-jss";
import { Theme } from "../../types";
import SubwayLine from "./SubwayLine";
import ApplyButton from "./ApplyButton";
import TrackInfo from "./TrackInfo";
import Waypoint from "react-waypoint";
import AboutSection from "./AboutSection";
import Section from "./Section";
// @ts-ignore
import { Scrollama, Step } from "react-scrollama";
import { trackColors } from "../../ThemeInjector";

const styles = (theme: Theme): Styles => ({
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
  activitiesSection: {
    background: `linear-gradient(${theme.secondBackground}, ${
      theme.thirdBackground
    })`,
    color: theme.secondFont
  },
  tracksSection: {
    backgroundColor: theme.thirdBackground,
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
  quote: {
    fontSize: "3em",
    margin: "0 5% 0 5%",
    maxWidth: "400px"
  },
  info: {
    display: "flex",
    flexDirection: "column",
    // Small hack for Chrome. Not sure why.
    backgroundColor: theme.thirdBackground
  },
  timeline: {
    width: "20vw"
  },
  quoteAuthor: {
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end"
  },
  hiddenTrip: {
    width: "100vw",
    height: "10px",
    position: "relative",
    fontSize: "10px",
    color: theme.secondBackground,
    top: "10vh"
  }
});

interface HomePageProps {
  classes: { [s: string]: string };
  viewportWidth: number;
}
interface HomePageState {
  activeBlocks: number;
}

interface StepData {
  element: HTMLElement;
  data: number;
  direction: string;
}

class HomePage extends React.Component<HomePageProps, HomePageState> {
  constructor(props: HomePageProps) {
    super(props);
    this.state = {
      activeBlocks: -1
    };
  }

  handleStepEnter = ({ element, data, direction }: StepData) => {
    if (direction === "down") {
      this.setState({ activeBlocks: data });
    }
  };

  handleStepExit = ({ element, data, direction }: StepData) => {
    if (direction === "up") {
      this.setState({ activeBlocks: data - 1 });
    }
  };

  handleTopEnter = ({
    previousPosition,
    currentPosition
  }: {
    previousPosition: string;
    currentPosition: string;
  }) => {
    if (currentPosition === "inside" && previousPosition === "above") {
      this.setState({ activeBlocks: -1 });
    }
  };

  render() {
    let { classes } = this.props;

    return (
      <div className={classes.HomePage}>
        <ApplyButton />
        <div className={classes.lines}>
          <SubwayLine delay="-2s" color={trackColors.green} />
          <SubwayLine delay="-1.6s" color={trackColors.red} />
          <SubwayLine delay="-1.2s" color={trackColors.blue} />
          <SubwayLine delay="-2.4s" color={trackColors.orange} />
        </div>
        <div className={classes.hiddenTrip}>
          <Waypoint onEnter={this.handleTopEnter} />
        </div>
        <div className={classes.info}>
          <Scrollama
            onStepEnter={this.handleStepEnter}
            onStepExit={this.handleStepExit}
          >
            <Step data={0} key={0}>
              <div className={classes.aboutSection}>
                <Section
                  activeBlocks={this.state.activeBlocks}
                  infoBlock={{
                    id: 0,
                    date: "January 1st",
                    text: "Sign Up",
                    color: trackColors.red
                  }}
                >
                  <AboutSection />
                </Section>
              </div>
            </Step>
            <Step data={1} key={1}>
              <div className={classes.activitiesSection}>
                <Section
                  activeBlocks={this.state.activeBlocks}
                  infoBlock={{
                    id: 1,
                    date: "January 14th",
                    text: "Get admissions result",
                    color: trackColors.orange
                  }}
                >
                  <div className={classes.quote}>
                    <p>Inspirational quote here!</p>
                    <span className={classes.quoteAuthor}>
                      --- Albert Einstein
                    </span>
                  </div>
                </Section>
              </div>
            </Step>
            <Step data={2}>
              <div className={classes.tracksSection}>
                <Section
                  activeBlocks={this.state.activeBlocks}
                  infoBlock={{
                    id: 2,
                    date: "February 15th",
                    text: "Go to hackathon!",
                    color: trackColors.green
                  }}
                >
                  <TrackInfo />
                </Section>
              </div>
            </Step>
          </Scrollama>
        </div>
      </div>
    );
  }
}

export default injectSheet(styles)(HomePage);
