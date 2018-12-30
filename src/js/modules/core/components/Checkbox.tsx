import * as React from "react";
import { Field } from "react-final-form";
import { JssRules } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";


interface CheckboxStyles<T> extends Styles {
  Checkbox: T;
  input: T;
}

interface Props {
  name: string,
  classes: CheckboxStyles<string>
}

const styles: CheckboxStyles<JssRules> = {
  Checkbox: {
    display: "flex",
    padding: "20px"
  },
  input: {
    width: "20px",
    height: "20px"
  }
}

const Checkbox: React.SFC<Props> = props => {
  const { name, classes, children } = props;

  return (
    <label className={classes.Checkbox}>
      <Field
        name={name}
        className={classes.input}
        component="input"
        type="checkbox"
      />
      {children}
    </label>
  );
}

export default injectSheet(styles)(Checkbox);