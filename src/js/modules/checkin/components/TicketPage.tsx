import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import Underline from "../../core/components/Underline";
import { Theme } from "../../ThemeInjector";
import { User } from "firebase";
import * as QRCode from "qrcode.react";
import { ReduxState } from "../../../reducers";
import { connect } from "react-redux";
import { compose } from "redux";

interface Props extends WithStyles<typeof styles> {
  user: User;
}

const styles = (theme: Theme) => ({
  TicketPage: {
    borderRadius: theme.pageBorderRadius,
    backgroundColor: theme.secondBackground,
    maxWidth: theme.containerSmallWidth,
    padding: "25px",
    marginBottom: "50px",
    color: theme.secondFont,
    fontSize: "1.3rem"
  },
  title: {
    marginBottom: "1em"
  },
  link: {
    textDecoration: "underline"
  },
  QRCode: {
    maxWidth: "512px",
    maxHeight: "512px",
    display: "block",
    margin: "0 auto",
    boxSizing: "border-box"
  }
});

const TicketPage: React.FunctionComponent<Props> = ({ user, classes }) => {
  const checkInUrl = `${window.location.protocol}//${
    window.location.host
  }/user-check-in/${user.uid}`;

  return (
    <div className={classes.TicketPage}>
      <h1 className={classes.title}>
        {" "}
        Your Ticket
      </h1>
      <h2>
        Please show this QR code at check-in:
      </h2>
      <Underline />
      <QRCode value={checkInUrl} size={256} className={classes.QRCode} />
      <p>UID: {user.uid}</p>
      <p>Email: {user.email}</p>
      <p>
        {" "}
        Please confirm all your information (especially name, birthday, school,
        and emergency contact) is correct before checking in; you will not be
        able to check in until it is corrected.
      </p>
      <a className={classes.link} href="/apply">
        View and edit application.
      </a>
    </div>
  );
};

const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

export default compose(
  injectSheet(styles),
  connect(mapStateToProps)
)(TicketPage);
