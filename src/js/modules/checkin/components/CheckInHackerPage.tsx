import * as React from "react";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";
import { UserData } from "../../types";
import Button from "../../core/components/Button";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import { RouteComponentProps } from "react-router-dom";
import { reportCheckinError } from "../../core/coreActions"
import { db } from "../../../firebase";
import Info from "./Info";

type PathParams = {
  uid: string;
};

interface Timestamp {
  toDate(): Date;
}
interface DirectProps extends WithStyles<typeof styles> {
  reportCheckinError: (msg: string) => any;
}

type Props = DirectProps & RouteComponentProps<PathParams>;

interface State {
  userData: UserData | null;
  checkinTimestamp: Timestamp;
  isAdmitted: boolean;
  _isMounted: boolean;
  _isLoading: boolean;
}

interface AdmittedData {
  isAdmitted: boolean;
  checkinTimestamp: Timestamp;
}

const styles = (theme: Theme) => ({
  CheckInHackerPage: {
    borderRadius: theme.pageBorderRadius,
    backgroundColor: theme.secondBackground,
    maxWidth: theme.containerSmallWidth,
    padding: "25px",
    color: theme.secondFont,
    fontSize: "1.3rem",
    width: "90vw"
  },
  sectionTitle: {
    marginBottom: "20px"
  },
  alert: {
    color: theme.fontColor,
    padding: "10px",
    textAlign: "center"
  },
  checkedInAlert: {
    backgroundColor: theme.green
  },
  notCheckedInAlert: {
    backgroundColor: theme.red
  },
  title: {
    marginBottom: "25px"
  },
  checkInButton: {
    margin: "25px 0"
  }
});

async function fetchUserData(
  uid: string
): Promise<{ userData: UserData; admittedData: AdmittedData }> {
  let userData = (await db
    .collection("users")
    .doc(uid)
    .get()
    .then((doc: any) => doc.data())) as UserData;
  let admittedData = (await db
    .collection("admitted")
    .doc(uid)
    .get()
    .then((doc: any) => {
      return {
        isAdmitted: doc.exists,
        checkinTimestamp: doc.exists ? doc.data().checkinTimestamp : ""
      };
    })) as AdmittedData;

  return { userData, admittedData };
}

class CheckInHackerPage extends React.Component<Props> {
  state: State = {
    userData: null,
    checkinTimestamp: null,
    isAdmitted: false,
    _isMounted: false,
    _isLoading: false
  };
  uid: string = "";

  constructor(props: Props) {
    super(props);
    this.uid = props.match.params.uid;
  }

  loadData = (uid: string) => {
    this.setState({ _isLoading: true });

    fetchUserData(uid).then(({ userData, admittedData }) => {
      const { isAdmitted, checkinTimestamp } = admittedData;

      this.setState({ _isLoading: false });
      if (this.state._isMounted) {
        this.setState({ userData, isAdmitted, checkinTimestamp });
      }
    });
  }

  componentDidMount() {
    this.setState({ _isMounted: true });
    this.loadData(this.uid);
  }

  componentWillUnmount() {
    this.setState({ _isMounted: false });
  }

  submitCheckIn = async (uid: string) => {
    const checkinTimestamp = new Date();
    try {
      await db
        .collection("admitted")
        .doc(uid)
        .set({ checkinTimestamp });
    } catch (e) {
      this.props.reportCheckinError(e.message);
    }

    this.loadData(uid);
  }

  render() {
    const { classes } = this.props;
    const { userData, isAdmitted, checkinTimestamp, _isLoading } = this.state;
    return (
      <div className={classes.CheckInHackerPage}>
        <h1 className={classes.title}>Check in panel</h1>
        <Info label="UID" value={this.uid} />
        {userData && userData.confirmData && !_isLoading ? (
          <div>
            {userData.confirmData && (
              <div
                className={`${classes.alert} ${
                  checkinTimestamp
                    ? classes.checkedInAlert
                    : classes.notCheckedInAlert
                }`}
              >
                {checkinTimestamp
                  ? `Checked in: ${checkinTimestamp.toDate()}`
                  : "Not checked in"}
              </div>
            )}
            <h2 className={classes.sectionTitle}>Identification</h2>
            <Info label="First name" value={userData.firstName} />
            <Info label="Last name" value={userData.lastName} />
            <Info label="Birthday" value={userData.birthDate} />
            <p>
              <em>Under 18: Birthday after Feb 15th, 2001</em>
            </p>
            <h2 className={classes.sectionTitle}>Event</h2>
            <Info label="Location" value={userData.confirmData.location} />
            <Info label="Is accepted" value={isAdmitted ? "Yes" : "No"} />
            <Info
              label="Is confirmed"
              value={userData.confirmTimestamp ? "Yes" : "No"}
            />
            <Info label="Shirt size" value={userData.tshirtSize} />
            <h2 className={classes.sectionTitle}>School</h2>
            <Info label="Grad year" value={userData.gradYear} />
            <Info label="School" value={userData.school} />
            <h2 className={classes.sectionTitle}>Emergency contact</h2>
            <Info label="Contact name" value={userData.emergencyContactName} />
            <Info
              label="Contact relation"
              value={userData.emergencyContactRelation}
            />
            <Info
              label="Contact number"
              value={userData.emergencyContactNumber}
            />
            {!checkinTimestamp && (
              <Button
                className={classes.checkInButton}
                onClick={() => this.submitCheckIn(this.uid)}
              >
                Check in this user
              </Button>
            )}
          </div>
        ) : userData && !userData.confirmData ? (
          <div>Not RSVP'd</div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch: Dispatch) =>
  bindActionCreators({ reportCheckinError }, dispatch);

export default injectSheet(styles)(
  connect(
    null,
    mapDispatchToProps
  )(CheckInHackerPage)
);
