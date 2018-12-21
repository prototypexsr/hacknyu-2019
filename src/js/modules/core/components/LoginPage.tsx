import * as React from "react";
import { Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import { Field, Form } from "react-final-form";
import Button from "./Button";
import { compose } from "redux";
import { connect } from "react-redux";
//@ts-ignore
import { loginWithGoogle, loginWithPassword } from "../coreActions";
import { emailRegex } from "../../constants";
import Input from "./Input";
import { Link } from "react-router-dom";

const styles = (theme: Theme): object => ({
  LoginPage: {
    padding: "30px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    height: "100%",
    width: "75%",
    color: theme.fontColor,
    backgroundColor: theme.formBackground
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    alignItems: "flex-end"
  },
  registerLink: {
    padding: "20px 20px 0px 20px",
    fontSize: "1.2em"
  },
  resetPasswordLink: {
    padding: "5px 20px 20px 20px",
    fontSize: "1.2em"
  }
});

interface Props {
  classes: { [s: string]: string };
  loginWithGoogle: () => any;
  loginWithPassword: (
    { email, password }: { email: string; password: string }
  ) => any;
  resetPassword: () => any;
}

interface FormValues {
  email: string;
  password: string;
}

const LoginPage: React.SFC<Props> = ({
  classes,
  loginWithGoogle,
  loginWithPassword,
}) => {
  const handleSubmit = (values: FormValues) => {
    loginWithPassword(values);
  };

  const handleGoogleLogin = (event: Event) => {
    event.preventDefault();
    loginWithGoogle();
  };

  return (
    <div className={classes.LoginPage}>
      <h1> Login </h1>
      <Form
        onSubmit={handleSubmit}
        validate={values => {
          let errors: { email?: string; password?: string } = {};
          //@ts-ignore
          if (values.email && !emailRegex.test(values.email)) {
            errors.email = "Invalid email";
          }
          return errors;
        }}
        render={({ handleSubmit, invalid }) => (
          <form className={classes.form} onSubmit={handleSubmit}>
            <Field name="email">
              {({ input, meta }) => (
                <Input
                  input={input}
                  meta={meta}
                  label="Email"
                  type="email"
                  placeholder="alyssap@hacker.com"
                />
              )}
            </Field>
            <Field name="password">
              {({ input, meta }) => (
                <Input
                  input={input}
                  meta={meta}
                  label="Password"
                  type="password"
                  placeholder="********"
                />
              )}
            </Field>
            <Button disabled={invalid} width="100px" type="submit">
              Login
            </Button>
            <Button width="200px" onClick={handleGoogleLogin}>
              Login w/ Google
            </Button>
            <Link to="/register" className={classes.registerLink}>
            Don't have an account? Register
            </Link>
            <Link to="/reset_password" className={classes.resetPasswordLink}>
              Forgot your password? Reset it
            </Link>
          </form>
        )}
      />
    </div>
  );
};

const mapDispatchToProps = (dispatch: any) => ({
  loginWithGoogle: () => {
    dispatch(loginWithGoogle());
  },
  loginWithPassword: ({ email, password }: FormValues) => {
    dispatch(loginWithPassword({ email, password }));
  },
  resetPassword: () => {
    dispatch(resetPassword());
  }
});

export default compose(injectSheet(styles), connect(null, mapDispatchToProps))(
  LoginPage
);
