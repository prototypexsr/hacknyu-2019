import * as React from "react";
import { Styles } from "react-jss";
import { ReduxState, Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import { FormEvent } from "react";
import { Form, Field } from "react-final-form";
import { db } from "../../../firebase";
import { User } from "firebase";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { push } from "connected-react-router";

const styles = (theme: Theme): Styles => ({
  ApplyPage: {
    display: "flex",
    width: "80%",
    height: "100%",
    maxWidth: "800px",
    flexDirection: "column",
    padding: "20px",
    alignItems: "center",
    backgroundColor: theme.formBackground
  },
  header: {
    padding: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-start",
    width: "100%",
    lineHeight: "1.3em",
    fontSize: "1.5em"
  },
  inputs: {
    display: "flex",
    lineHeight: "3em",
    flexDirection: "column"
  },
  input: {
    marginLeft: "5px",
    padding: "5px",
    fontSize: "1em"
  },
  submit: {
    width: "150px",
    padding: "5px",
    backgroundColor: theme.highlightColor,
    fontSize: "1em",
    border: "none",
    color: theme.secondFont,
    "&:disabled": {
      backgroundColor: theme.highlightColorHover
    }
  },
  save: {
    width: "100px",
    padding: "5px",
    backgroundColor: theme.submitButton,
    fontSize: "1em",
    border: "none",
    color: theme.secondFont
  }
});

interface Props {
  classes: { [s: string]: string };
  user: User;
  push: (route: string) => any;
}

class ApplyPage extends React.Component<Props> {
  constructor(props: Props) {
    super(props);
  }

  shouldComponentUpdate(nextProps: Props, nextState: object): boolean {
    if (!nextProps.user) {
      nextProps.push("/login");
    }
    return true;
  }

  handleChange = (event: FormEvent<HTMLInputElement>) => {
    this.setState({ name: event.currentTarget.value });
  };

  handleSubmit = (values: [string]) => {
    const { user } = this.props;
    db
      .collection("users")
      .doc(user.uid)
      .set(values)
      .then(res => console.log(res))
      .catch(err => console.error(err));
  };

  render() {
    let { classes } = this.props;
    return (
      <div className={classes.ApplyPage}>
        <h1 className={classes.header}> Apply </h1>
        <Form
          onSubmit={this.handleSubmit}
          render={({ handleSubmit, pristine, invalid }) => (
            <div className={classes.form}>
              <form onSubmit={handleSubmit}>
                <div className={classes.inputs}>
                  <label>
                    First Name:
                    <Field
                      className={classes.input}
                      name="firstName"
                      component="input"
                      placeholder="Rose"
                    />
                  </label>
                  <label>
                    Last Name:
                    <Field
                      className={classes.input}
                      name="lastName"
                      component="input"
                      placeholder="Kolodny"
                    />
                  </label>
                  <label>
                    Date of Birth:
                    <Field
                      id="date"
                      name="birthDate"
                      label="Date Of Birth"
                      type="date"
                      className={classes.input}
                      component="input"
                    />
                  </label>
                  <label>
                    Phone Number:
                    <Field
                      name="phoneNumber"
                      label="Phone Number"
                      className={classes.input}
                      component="input"
                      type="tel"
                      placeholder="1-800-867-5309"
                    />
                  </label>
                  <label>
                    School:
                    <Field
                      className={classes.input}
                      name="school"
                      label="School"
                      component="input"
                      placeholder="South Harmon Institute of Technology"
                    />
                  </label>
                  <label>
                    Gender:
                    <Field
                      name="gender"
                      component="select"
                      className={classes.input}
                    >
                      <option value="male"> Male </option>
                      <option value="female"> Female </option>
                      <option value="non-binary"> Non-binary </option>
                      <option value="prefer-not"> Prefer not to say </option>
                      <option value="other"> Other </option>
                    </Field>
                  </label>
                  <button
                    className={classes.submit}
                    type="submit"
                    disabled={pristine || invalid}
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          )}
        />
      </div>
    );
  }
}
const mapStateToProps = (state: ReduxState) => ({
  user: state.core.user
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ push }, dispatch);

export default compose(
  injectSheet(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(ApplyPage);
