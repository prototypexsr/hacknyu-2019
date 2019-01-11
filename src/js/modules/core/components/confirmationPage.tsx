import * as React from "react";
import { JssRules, ReduxState, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { push } from "connected-react-router";
//import { submitConfirmation } from "../coreActions";
import { Form, Field, FormSpy } from "react-final-form";
import { bindActionCreators, compose } from "redux";
import { connect } from "react-redux";
import { User } from "firebase";
import Button from "./Button";
import UploadResumeButton from "./UploadResumeButton";
import Radio from "./Radio";

interface Props {
  classes: ConfirmationPageStyles<string>;
  user: User;
  push: (route: string) => any;
  formData: FormData;
  confirmTimestamp: string;
  resumeTimestamp: string;
  // submitConfirmation: (values: FormData, incompleteFields: string[]) => any;
}

interface ConfirmationPageStyles<T> extends Styles {
  ConfirmationPage: T;
  header: T;
  form: T;
  inputs: T;
  inputLabel: T;
  submit: T;
  checkbox: T;
  radio: T;
  loadingText: T;
  autocompleteItem: T;
  nyuPolicy: T;
  multipleCheckboxes: T;
  genderOptions: T;
  termsAndConditions: T;
  [`@media(max-width: ${theme.mediumBreakpoint})`]: T;
}

interface FormData {
  location: string;

  nyuCodeOfConduct: boolean;
  nyuPrivacyPolicy: boolean;
}

interface ConfirmationPageState {
  formData: FormData | null;
  isLoading: boolean;
}

const requiredFields = {
  nyuCodeOfConduct: "NYU Code of Conduct",
  nyuPrivacyPolicy: "NYU Privacy Policy",
  location: "Participation Location"
};

const styles = (theme: Theme): ConfirmationPageStyles<JssRules> => ({
  ConfirmationPage: {
    display: "flex",
    width: "100%",
    maxWidth: theme.containerMaxWidth,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.formBackground,
    color: theme.secondFont,
    borderRadius: "0.5em",
    paddingTop: "3em",
    paddingBottom: "2em"
  },
  header: {
    padding: "10px"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    lineHeight: "1.2em",
    fontSize: "1.0em",
    padding: "40px 0 40px 0"
  },
  inputs: {
    display: "flex",
    lineHeight: "2rem",
    flexDirection: "column"
  },
  inputLabel: {
    maxWidth: "300px",
    lineHeight: "1.8rem"
  },
  submit: {
    width: "fit-content",
    padding: "13px",
    fontSize: "1.3rem",
    border: "none",
    maxWidth: "250px"
  },
  checkbox: {
    width: "20px",
    height: "20px"
  },
  radio: {
    width: "20px",
    height: "20px"
  },
  loadingText: {
    fontSize: "1.3em"
  },
  autocompleteItem: {
    padding: theme.inputPadding
  },
  nyuPolicy: {
    maxWidth: "500px",
    lineHeight: "1.8rem"
  },
  termsAndConditions: {
    padding: "15px"
  },
  [`@media(max-width: ${theme.largeBreakpoint})`]: {
    ApplyPage: {
      width: theme.containerLargeWidth
    }
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    ApplyPage: {
      width: theme.containerMediumWidth
    }
  },
  [`@media(max-width: ${theme.smallBreakpoint})`]: {
    ApplyPage: {
      width: theme.containerMobileWidth
    },
    multipleCheckboxes: {
      width: "10em"
    },
    inputs: {
      alignItems: "center"
    }
  }
});

interface IncompleteField {
  field: string;
  name: string;
}

class ConfirmationPage extends React.Component<Props, ConfirmationPageState> {
  getIncompleteFields = (values: any): IncompleteField[] => {
    let incompleteFields = [];
    Object.entries(requiredFields).forEach(([field, name]) => {
      if (
        !(field in values) ||
        values[field] === undefined ||
        values[field] === "" ||
        values[field] === false
      ) {
        values[field] = "";
        incompleteFields.push({ field, name });
      }
    });
    return incompleteFields;
  };

  handleSubmit = values => {
    //this.props.submitConfirmation(values, []);
  };

  validateForm = (values: FormData): object => {
    const incomplete = this.getIncompleteFields(values);
    let errors = {};
    incomplete.map(({ field }) => {
      errors[field] = `Field cannot be empty`;
    });
    return errors;
  };

  render() {
    let {
      classes,
      isSubmitting,
      user,
      formData,
      confirmTimestamp,
      resumeTimestamp
    } = this.props;
    return (
      <div className={classes.ConfirmationPage}>
        <h1 className={classes.header}>YAY YOU'RE IN!</h1>
        Before you accept your offer, there are a few things we need to share
        with you.
        <ul>
          <li>
            At this time, participation at either the Abu Dhabi or Shanghai
            location is only available for NYU students who are currently
            enrolled at those campuses.
          </li>

          <li>
            Any student who is or has been enrolled in the last 12 months at a
            high school or university can participate <strong>at</strong> our
            Brooklyn, NY location.
          </li>
          <li>
            If you are under 18 years of age at the time of the event, you must
            have your parent(s) or legal guardian(s) print and sign the Minors
            Release Form, which you can access{" "}
            <a href="/img/minors-waiver.pdf" target="_blank">
              here.
            </a>{" "}
            Please be sure to bring a physical copy of this waiver to you when
            you arrive to HackNYU, otherwise we will not be able to let you
            participate!
          </li>
        </ul>
        <Form
          onSubmit={this.handleSubmit}
          validate={this.validateForm}
          initialValues={formData}
          render={({ handleSubmit, pristine, invalid }) => (
            <div className={classes.form}>
              <form onSubmit={handleSubmit}>
                <div className={classes.inputs}>
                  <label className={classes.termsAndConditions}>
                    <div className={classes.nyuPolicy}>
                      By checking this box, I hereby acknowledge that I have
                      read and agree to comply with New York University’s Code
                      of Conduct, which can be found{" "}
                      <a href="https://www.nyu.edu/students/student-information-and-resources/student-community-standards/university-student-conduct-policies.html">
                        here
                      </a>
                    </div>
                    <Field
                      className={classes.checkbox}
                      name="nyuCodeOfConduct"
                      component="input"
                      type="checkbox"
                    />
                  </label>
                  <label className={classes.termsAndConditions}>
                    <div className={classes.nyuPolicy}>
                      By checking this box, I hereby acknowledge that I have
                      read and agree to comply with New York University’s Data
                      Privacy Policy, which can be found{" "}
                      <a href="/img/nyu-dataprivacy.pdf" target="_blank">
                        here
                      </a>
                    </div>
                    <Field
                      className={classes.checkbox}
                      name="nyuPrivacyPolicy"
                      component="input"
                      type="checkbox"
                    />
                  </label>
                  <div className={classes.inputs}>
                    Please upload your latest resume as a PDF, so we can share
                    it with our awesome sponsors who are interested in hiring
                    you!
                    <UploadResumeButton uid={user.uid} />
                  </div>

                  <label className={classes.termsAndConditions}>
                    <div className={classes.nyuPolicy}>
                      Finally, please select the location where you will be
                      participating. You may only choose once, so choose wisely!
                    </div>
                    <Radio name="location" value="abuDhabi">
                      Abu Dhabi
                    </Radio>
                    <Radio name="location" value="newYork">
                      New York
                    </Radio>
                    <Radio name="location" value="shanghai">
                      Shanghai
                    </Radio>
                  </label>
                  <FormSpy
                    render={({ form }) => {
                      const fields = form.getState().values;
                      const incompleteFields = this.getIncompleteFields(fields);
                      if (
                        !confirmTimestamp &&
                        incompleteFields.length !== 0 &&
                        !resumeTimestamp
                      ) {
                        return (
                          <Button
                            className={classes.submit}
                            type="submit"
                            disabled={pristine || isSubmitting}
                          >
                            ???
                          </Button>
                        );
                      } else {
                        return (
                          <Button
                            className={classes.submit}
                            type="submit"
                            disabled={pristine || invalid || isSubmitting}
                          >
                            ACCEPT
                          </Button>
                        );
                      }
                    }}
                  />
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
  user: state.core.user,
  formData: state.core.applyForm.formData,
  confirmTimestamp: state.core.applyForm.confirmTimestamp,
  isSubmitting: state.core.applyForm.isSubmitting
});

const mapDispatchToProps = (dispatch: any) =>
  bindActionCreators({ push }, dispatch);

export default compose(
  injectSheet(styles),
  connect(
    mapStateToProps,
    mapDispatchToProps
  )
)(ConfirmationPage);
