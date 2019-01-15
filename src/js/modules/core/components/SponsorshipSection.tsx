import * as React from "react";
import { Styles } from "react-jss";
import { ReactNode } from "react";
import injectSheet from "react-jss/lib/injectSheet";
import { JssRules } from "../../types";

interface SponsorshipSectionStyles<T> extends Styles {
  header: T;
  SponsorshipSection: T;
  paragraph: T;
  previousSponsors: T;
  icon: T;
  link: T;
  logos: T;
  logoImage: T;
}

interface Props {
  classes: SponsorshipSectionStyles<string>;
}

const styles = (theme: Theme): SponsorshipSectionStyles<JssRules> => ({
  SponsorshipSection: {
    backgroundColor: theme.backgroundColor,
    margin: "0 8% 5% 11%"
  },
  header: {
    fontSize: "2em"
  },
  paragraph: {
    fontSize: "1.4rem",
    paddingLeft: "20px",
    margin: "4% 4% 4% 4%"
  },
  header: {
    paddingLeft: "20px"
  },
  previousSponsors: {
    fontSize: "1.4rem",
    display: "flex",
    alignItems: "left",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  icon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "50px",
    paddingRight: "20px"
  },
  logos: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row"
  },
  logoImage: {
    display: "flex",
    maxWidth: "500px",
    margin: "4% 4% 4% 4%"
  },
  link: {
    color: "yellow",
    "&:hover": {
      color: "white"
    }
  }
});

const SponsorshipInfo: React.SFC<Props> = ({ classes }) => {
  return (
    <div className={classes.SponsorshipSection}>
      <h1 className={classes.header}>SPONSORSHIP</h1>
      <div className={classes.paragraph}>
        HackNYU is graciously supported by our sponsors! We are proud to have
        sponsors represented from a wide variety of industries, sizes, and
        specializations. If you are interested in helping HackNYU 2019 be an
        even greater success, please contact us at sponsorship.hack@nyu.edu, and
        please find our sponsorship opportunities{" "}
        <a
          className={classes.link}
          href="pdf/hacknyu-sponsor-deck-2019.pdf"
          target="new"
        >
          here!
        </a>
      </div>
      <div className={classes.paragraph}>
        HackNYU is made possible thanks to the support of our wonderful
        sponsors!
      </div>
      <div className={classes.previousSponsors}>
        <h1 className={classes.header}>Current Sponsors</h1>
      </div>

      <div className={classes.logos}>
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/Google/Google-White.png"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/BNY Mellon/bnym_rgb_wht.svg"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/Gandi/Gandi-logo-white.svg"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/Kensho/kenshologo-white.svg"
        />
      </div>

      <div className={classes.logos}>
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/Contrary Capital/ContraryCapital-White.svg"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/Soylent/Soylent-White.svg"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/Facebook/Facebook-06-2015-White.svg"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/7 Chord/7Chord-White-2.png"
        />
      </div>

      <div className={classes.logos}>
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/MLH/mlh-logo-white.svg"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/Insomnia/InsomniaCookies-White2.png"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/Kind/KIND-White-3.png"
        />
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/New York Life/NYLLogo_white.png"
        />
      </div>

      <div className={classes.logos}>
        <img
          className={classes.logoImage}
          src="img/sponsorship-logos/JPMC/JPMC-White.png"
        />
      </div>
    </div>
  );
};

export default injectSheet(styles)(SponsorshipInfo);
