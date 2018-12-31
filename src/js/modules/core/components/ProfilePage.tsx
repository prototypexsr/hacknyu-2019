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
    width: "100%",
    maxWidth: theme.containerWidth,
    height: "100vh",
    paddingTop: "3em",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    borderRadius: "5px",
    color: theme.secondFont
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

  togglePasswordForm = () => {
    const { isPasswordFormVisible } = this.state;
    this.setState({ isPasswordFormVisible: !isPasswordFormVisible });
  };

  render() {
    let { user, classes } = this.props;
    const defaults = {
      displayName: "Add your name to the application!",
      photoURL: "/img/blank-profile.png"
    };
    return (
      <div className={classes.ProfilePage}>
        <h1 className={classes.name}>
          {user.displayName || defaults.displayName}
        </h1>
        <ProfilePic photoURL={user.photoURL || defaults.photoURL} uid={user.uid}/>
        <Button onClick={this.togglePasswordForm}>CHANGE PASSWORD</Button>
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
