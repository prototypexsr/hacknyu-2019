import * as React from "react"
import { Styles } from "react-jss";
import injectSheet from "react-jss/lib/injectSheet";
import { Theme } from "../../types";

interface ErrorStyles<T> extends Styles {
  Error: T
}

interface Props {
  classes: ErrorStyles<string>
  error: object,
}

const styles= (theme: Theme): ErrorStyles<object> => ({
  Error: {
    color: theme.errorText,
    width: "200px",
    margin: "20px",
    height: "60px",
    borderRadius: "20px",
    border: "2px solid red",
    backgroundColor: theme.errorBackground,
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  }
})

const Error: React.SFC<Props> = ({ classes, error }) => {
  return(<div className={classes.Error}> {error.message} </div>)
}

export default injectSheet(styles)(Error);