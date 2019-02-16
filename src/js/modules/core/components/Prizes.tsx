import * as React from "react";
import injectSheet, {WithStyles} from "react-jss";
import { Theme } from "../../ThemeInjector";

const styles = (theme: Theme) => ({
  prizesSection: {
    padding: "50px",
    fontSize: "18px",
    lineHeight: "1.2",
    width: "90vw",
    maxWidth: theme.containerMaxWidth
  },
  prizes: {
    margin: "0 -1.25%",
    backgroundColor: theme.backgroundColor,
    "&::after": {
      content: '""',
      clear: "both",
      display: "table"
    }
  },
  trackPrizes: {
    padding: "20px",
    paddingBottom: "50px",
    "&::after": {
      content: '""',
      clear: "both",
      display: "table"
    }
  },
  prizeItem: {
    width: "22%",
    padding: "1.5%",
    float: "left",
    height: "250px"
  },
  trackPrizeItem: {
    padding: "2%",
    width: "46%",
    float: "left",
    height: "150px"
  },
  info: {
    maxWidth: "500px"
  },
  link: {
    color: theme.fontColor,
    textDecoration: "underline"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    prizeItem: {
      width: "46%",
      padding: "2%",
      height: "200px"
    },
    trackPrizeItem: {
      width: "100%"
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    prizeItem: {
      width: "100%",
      height: "200px"
    }
  }
})

type Props = WithStyles<typeof styles>;

const Prizes: React.FunctionComponent<Props> = ({ classes }) => {
  return (
    <div className={classes.prizesSection}>
      <h1>Track Prizes</h1>
      <div className={classes.info}>
      <p>For HackNYU, your project must be related to one of our four tracks: Health & Well Being, Sustainability, Education, and Financial Development. You can create whatever you want, as long as it falls into one of these tracks. Ask an organizer if you aren't sure where your hack belongs!</p>
      <p>All tracks have a 1st, 2nd, and 3rd place prize. The winners of these prizes can choose from a selection of prizes from Amazon.</p>
      <p>1st place: prizes up to $200, 2nd place: up to $100, 3rd place: up to $50 (all per team member!)</p>
      </div>
      <div className={classes.trackPrizes}>
        <div className={classes.trackPrizeItem}>
          <h2>Health & Well-Being</h2>
          <p>How can we improve the way we manage and think about our health and well-being? 
          What can we do to ensure everyone gets the care they deserve?</p>
        </div>
        <div className={classes.trackPrizeItem}>
          <h2>Sustainability</h2>
          <p>How can we encourage and educate others about being more sustainable? How can we reduce waste and increase reuse?</p>
        </div>
        <div className={classes.trackPrizeItem}>
          <h2>Education</h2>
          <p>How should we educate the next generation of students? How can we improve outcomes among all students? What technology can we use to enhance the classroom?</p>
        </div>
        <div className={classes.trackPrizeItem}>
          <h2>Financial Empowerment</h2>
          <p>How do we encourage being financially responsible? How can we ensure a more equitable distribution of capital?</p>
        </div>
      </div>
      <h1>Sponsor Prizes</h1>
      <div className={classes.info}>
      <p>HackNYU is also sponsored by many fantastic sponsors with great tech and onsite support to offer!</p>
      <p> In addition to submitting for a track prize, you can also submit for as many sponsor prizes as you like, as long as it matches the criteria.</p>
      </div>
      <div className={classes.prizes}>
        <div className={classes.prizeItem}>
          <h2>IBM</h2>
          <p>Best use of <a href="https://www.ibm.com/cloud/ai" className={classes.link}>The IBM Cloud Watson</a> to complete their project.</p>
          <p>1st place: Powerbanks <br/> 2nd place: IBM Sling Backpacks</p>
        </div>
        <div className={classes.prizeItem}>
          <h2>Google</h2>
          <p>Best Use of <a href="https://cloud.google.com/" className={classes.link}>Google Cloud Platform.</a></p>
          <p>Prize: Google Home Minis</p>
        </div>
        <div className={classes.prizeItem}>
          <h2>NYU API / Mulesoft</h2>
          <p>Best <a href="https://wp.nyu.edu/developers/2019/02/14/nyu-it-hackathon-apis/" className={classes.link}>NYU API (Mulesoft)</a> hack.</p>
          <p>Prize: iPads (max team size of 3)</p>
        </div>
        <div className={classes.prizeItem}>
          <h2>JPMorgan Chase</h2>
          <p>Best Accessibility Hack.</p>
          <p>Prize: Bose SoundLink Wireless Headphones (max team size of 5)</p>
        </div>
        <div className={classes.prizeItem}>
          <h2>Facebook</h2>
          <p>Best hack that aligns with Facebook’s motto: “Give people the power to build community and bring the world closer together.</p>
          <p>Prize: TBA</p>
        </div>
        <div className={classes.prizeItem}>
          <h2>Major League Hacking</h2>
          <p>MLH has partnered with a number of sponsors for prizes, TBA!</p>
          <p>Prize: TBA</p>
        </div>
      </div>
    </div>
  )
}

export default injectSheet(styles)(Prizes);