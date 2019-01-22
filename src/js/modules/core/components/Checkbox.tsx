import * as React from "react";
import { Field } from "react-final-form";
import injectSheet, { WithStyles } from "react-jss";
import { Theme } from "../../ThemeInjector";


interface Props extends WithStyles<typeof styles> {
  name: string,
}

const styles = (theme: Theme) => ({
  Checkbox: {
    display: "flex",
    alignItems: "center",
    padding: "20px"
  },
  input: {
    width: "20px",
    height: "20px",
    margin: "8px"
  },
  description: {},
  [`@media(max-width: ${theme.mediumBreakpoint})`]: {
    description: {
      width: "200px"
    }
  },
})

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
      <div className={classes.description}> {children} </div>
    </label>
  );
}

export default injectSheet(styles)(Checkbox);