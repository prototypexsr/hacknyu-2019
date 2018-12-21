import * as React from "react";
import { Field, Form } from "react-final-form";
import Input from "./Input";
import Button from "./Button";
import { bindActionCreators, compose } from "redux";
import { updatePassword } from "../coreActions";
import { connect } from "react-redux";
import injectSheet from "react-jss/lib/injectSheet";

interface Props {
  classes: PasswordFormStyles<string>;
  updatePassword: (password: string) => any;
}

interface PasswordFormStyles<T> {
  PasswordForm: T;
}

const styles: PasswordFormStyles<object> = {
  PasswordForm: {
    display: "flex",
    flexDirection: "column",
    padding: "40px"
  }
};

const ChangePasswordForm: React.SFC<Props> = ({ classes, updatePassword }) => {
  const handleSubmit = values => {
    updatePassword(values.password);
  };

  return (
    <Form
      className={classes.PasswordForm}
      onSubmit={handleSubmit}
      validate={({ password, passwordConfirmation }) => {
        let errors: { password?: string } = {};
        if (password && password.length < 8) {
          errors.password = "Password must be at least 8 characters"
        }
        return errors;
      }}
      render={({ handleSubmit, invalid }) => (
        <form onSubmit={handleSubmit}>
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
          <Field name="passwordConfirmation">
            {({ input, meta }) => (
              <Input
                input={input}
                meta={meta}
                label="Confirm"
                type="password"
                placeholder="********"
              />
            )}
          </Field>
          <Button type="submit" disabled={invalid}>
            Update
          </Button>
        </form>
      )}
    />
  );
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ updatePassword }, dispatch);

export default compose(
  connect(
    undefined,
    mapDispatchToProps
  ),
  injectSheet(styles)
)(ChangePasswordForm);
