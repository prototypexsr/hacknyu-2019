import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { Theme } from "../../types";

const styles = (theme: Theme): Styles => ({
  infoBlock: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: "1.5em",
    display: "flex",
    flexDirection: "column",
    // @ts-ignore
    position: props =>
      props.activeBlocks >= props.id ? "fixed" : "absolute",
    // @ts-ignore
    top: props =>
      props.activeBlocks >= props.id ? `${100 + 180 * props.id}px` : "auto",
    // @ts-ignore
    transform: props =>
      props.activeBlocks >= props.id ? "none" : "translateX(30vw)",
    transition: "transform 2s, position 5s",
    marginTop: "2vh",
    right: "7vw",
    width: "300px",
    height: "100px",
    color: theme.secondFont,
    borderRadius: "10px",
    // @ts-ignore
    backgroundColor: props => props.color
  },
  text: {
   // width: "100px"
  }
});

interface Props {
  classes: { [s: string]: string };
  activeBlocks: number;
  id: number;
  text: string;
  date: string;
  color: string;
}
const InfoBlock: React.SFC<Props> = ({ classes, date, text }) => {
  return (
    <div className={classes.infoBlock}>
      <div> <b> {date} </b> </div>
      <div className={classes.text}> {text} </div>
    </div>
  );
};

export default injectSheet(styles)(InfoBlock);
