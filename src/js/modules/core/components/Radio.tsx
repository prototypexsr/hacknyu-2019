import * as React from "react";
import { Field } from "react-final-form";
import { JssRules, Theme } from "../../types";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";


interface RadioStyles<T> extends Styles {
  Radio: T;
  input: T;
  [s: string]: T;
}

interface Props {
  name: string,
  classes: RadioStyles<string>,
  value: string
}

const styles = (theme: Theme): RadioStyles<JssRules> => ({
  Radio: {
    display: "flex",
    alignItems: "center",
    padding: "20px"
  },
  input: {
    width: "20px",
    height: "20px",
    margin: "8px"
  },
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    description: {
      width: "200px"
    }
  },
})

const Radio: React.SFC<Props> = props => {
  const { name, classes, children, value } = props;

  return (
    <label className={classes.Radio}>
      <Field
        name={name}
        className={classes.input}
        component="input"
        type="radio"
        value = {value}
      />
      <div className={classes.description}> {children} </div>
    </label>
  );
}

export default injectSheet(styles)(Radio);