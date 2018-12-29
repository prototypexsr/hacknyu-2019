import * as React from "react";
import injectSheet from "react-jss/lib/injectSheet";
import { Styles } from "jss";
import { User } from "firebase";
import { bindActionCreators, compose } from "redux";
import { push } from "connected-react-router";
import { connect } from "react-redux";
import { JssRules, Theme } from "../../types";
import Button from "./Button";
import PasswordForm from "./UpdatePasswordForm";
import ProfilePic from "./ProfilePic";

interface ProfilePageStyles<T> extends Styles {
  ProfilePage: T;
  name: T;
}

interface Props {
  classes: ProfilePageStyles<string>;
  user: User;
}

interface State {
  isPasswordFormVisible: boolean;
}

const styles = (theme: Theme): ProfilePageStyles<JssRules> => ({
  ProfilePage: {
    width: "80vw",
    height: "100vh",
    padding: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground
  },
  name: {
    paddingBottom: "5%"
  }
});

class ProfilePage extends React.Component<Props, State> {
  constructor(props) {
    super(props);
    this.state = {
      isPasswordFormVisible: false
    };
    this.fileUploader = React.createRef();
  }

  shouldComponentUpdate(nextProps: Props, nextState: object): boolean {
    if (!nextProps.user) {
      nextProps.push("/login");
    }
    return true;
  }

  togglePasswordForm = () => {
    const { isPasswordFormVisible } = this.state;
    this.setState({ isPasswordFormVisible: !isPasswordFormVisible });
  };

  render() {
    let { user, classes } = this.props;
    const defaults = {
      displayName: "User McUserFace",
      photoURL: "img/profile_pic.png"
    };
    return (
      <div className={classes.ProfilePage}>
        <h1 className={classes.name}>
          {user.displayName || defaults.displayName}
        </h1>
        <ProfilePic photoURL={user.photoURL || defaults.photoURL} uid={user.uid}/>
        <Button onClick={this.togglePasswordForm}>Change Password</Button>
        {this.state.isPasswordFormVisible && <PasswordForm />}
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.core.user
});

const mapDispatchToProps = dispatch => bindActionCreators({ push }, dispatch);

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ProfilePage);
