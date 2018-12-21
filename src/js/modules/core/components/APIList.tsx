import * as React from "react";
import injectSheet, { Styles } from "react-jss/lib/injectSheet";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons/faReact";
import { Theme } from "../../types";
import { faAws } from "@fortawesome/free-brands-svg-icons/faAws";

const styles = (theme: Theme): Styles => ({
    icons: {
      display: "flex",
      width: "100px",
      justifyContent: "space-around"
    },
    text: {
      maxWidth: "500px"
    }
  });

  interface Props {
    classes: { [s: string]: string };
  }
  
  const APIList: React.SFC<Props> = ({ classes }) => {
    return (
      <div className={classes.API}>
        <h1 className={classes.title}> API List </h1>
        <div className={classes.content}>
          <p className={classes.intro}>
            HackNYU has several APIs available from NYU. You can take a look at them below:
          </p>
         <ul>
             <li>Class Roster/Albert</li>
             <li>Bus Locations</li>
             <li>Course Catalog</li>
             <li>Public Safety</li>
             <li>Engage</li>
             <li>Third-party APIs: Data.gov, NYC Public Data, GitHub REST API</li>
             <li>Events</li>
             <li>Faculty Bibliography</li>
             <li>Library Share Space</li>
             <li>Academic Calendar</li>
        </ul>
        </div>
      </div>
    );
  };
  
  export default injectSheet(styles)(APIList);
