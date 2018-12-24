import * as React from "react";
import { Theme } from "../../types";
import injectSheet from "react-jss/lib/injectSheet";
import { ReactNode } from "react";

const styles = (theme: Theme) => ({
  button: {
    //@ts-ignore
    width: (props: Props) => props.width,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: theme.submitButton,
    color: theme.secondFont,
    margin: "5px",
    fontVariant: "small-caps",
    padding: "10px",
    border: "none",
    fontSize: "1.2em",
    transition: "background-color 0.4s",
    "&:hover": {
      backgroundColor: theme.submitButtonHover
    }
  }
});

interface Props {
  classes: { [s: string]: string };
  children: ReactNode;
  type?: string;
  width?: string;
  onClick: () => any;
}

const Button: React.SFC<Props> = ({ classes, children, ...props }) => {
  return (
    <button {...props} className={classes.button}>
      {children}
    </button>
  );
};

//@ts-ignore
export default injectSheet(styles)(Button);
