import * as React from "react";
import { ReduxState, Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import { push } from "connected-react-router";
import { Form, Field } from "react-final-form";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { User } from "firebase";

import { db } from "../../../firebase";

const styles = (theme: Theme): object => ({
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
  loadingText: {
    fontSize: "1.3em"
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

interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  phoneNumber: string;
  school: string;
  gender: string;
}

interface ApplyPageState {
  formData: FormData | null;
  isSubmitting: boolean;
  isLoading: boolean;
}

class ApplyPage extends React.Component<Props, ApplyPageState> {
  unmounted: boolean;

  constructor(props: Props) {
    super(props);
    this.unmounted = false;
    this.state = {
      isLoading: false,
      isSubmitting: false,
      formData: undefined
    };
  }

  componentDidMount() {
    this.setFormState();
  }

  componentWillUnmount() {
    this.unmounted = true;
  }

  componentDidUpdate(prevProps: Props) {
    if (this.props.user !== prevProps.user) {
      this.setFormState();
    }
  }

  async setFormState() {
    const { user } = this.props;

    if ("uid" in user) {
      this.setState({ isLoading: true });

      const formData = await this.loadValues(user);

      if (!this.unmounted) {
        this.setState({ isLoading: false, formData: formData });
      }
    }
  }

  async loadValues(user: User): Promise<FormData> {
    const snapshot = await db
      .collection("users")
      .doc(user.uid)
      .get();
    const formData = snapshot.data() as FormData;

    return formData;
  }

  // https://reactjs.org/docs/react-component.html#shouldcomponentupdate
  // We should make this cleaner?
  shouldComponentUpdate(nextProps: Props, nextState: object): boolean {
    if (!nextProps.user) {
      nextProps.push("/login");
    }
    return true;
  }

  handleSubmit = (values) => {
    const { user } = this.props;
    this.setState({ isSubmitting: true });
    db.collection("users")
      .doc(user.uid)
      .set(values)
      .then(() => this.setState({ isSubmitting: false }))
      .catch(err => console.error(err));
  };

  render() {
    let { classes } = this.props;
    let { isLoading, isSubmitting } = this.state;

    return (
      <div className={classes.ApplyPage}>
        <h1 className={classes.header}> Apply </h1>
        {isLoading ? (
          <div className={classes.loadingText}> Loading form... </div>
        ) : (
          <Form
            onSubmit={this.handleSubmit}
            initialValues={this.state.formData}
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
                        className={classes.input}
                        id="date"
                        name="birthDate"
                        label="Date Of Birth"
                        type="date"
                        component="input"
                      />
                    </label>
                    <label>
                      Phone Number:
                      <Field
                        className={classes.input}
                        name="phoneNumber"
                        label="Phone Number"
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
                        className={classes.input}
                        name="gender"
                        component="select"
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
                      disabled={pristine || invalid || isSubmitting}
                    >
                      Submit
                    </button>
                  </div>
                </form>
              </div>
            )}
          />
        )}
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
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ApplyPage);
