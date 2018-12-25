import * as React from "react";
import injectSheet from "react-jss/lib/injectSheet";
import { Styles } from "react-jss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faReact } from "@fortawesome/free-brands-svg-icons/faReact";
import { Theme, JssRules } from "../../types";
import { faAws } from "@fortawesome/free-brands-svg-icons/faAws";

interface APIListStyles<T> extends Styles {
  APIList: T
}

const styles: APIListStyles<JssRules> = {
  APIList:{ 
    display: "flex", 
    width: "100px", 
    justifyContent: "space-around", 
    maxWidth: "500px"
  }
};
  
  class APIList extends React.Component<JssRules> {
    render (){
      return(
      <div>
        <h1> API List </h1>
        <div>
          <p>
            HackNYU has several APIs available from NYU. You can take a look at them below:
          </p>
         <ul>
             <li><a href="http://wp.nyu.edu/developers/2018/03/02/class-roster/">Class Roster/Albert</a></li>
             <li> <a href="https://wp.nyu.edu/developers/2018/02/17/transloc-api/">Bus Locations</a></li>
             <li> <a href="http://wp.nyu.edu/developers/2018/03/08/course-catalog/">Course Catalog</a></li>
             <li><a href="http://wp.nyu.edu/developers/2018/03/16/public-safety-incident-data/">Public Safety</a></li>
             <li><a href="http://wp.nyu.edu/developers/2018/03/15/engage/">Engage</a></li>
             <li><ul>Third-party APIs:</ul> 
                  <li><a href="http://wp.nyu.edu/developers/2018/05/21/datagov/">Data.gov</a></li>
                  <li><a href="http://wp.nyu.edu/developers/2018/05/21/nyc-open-data/">NYC Public Data</a></li> 
                  <li><a href="http://wp.nyu.edu/developers/2018/05/21/rest-api-v3-github/">GitHub REST API V3</a></li>
             </li>
             <li><a href="http://wp.nyu.edu/developers/2018/03/15/events-calendar/">Events</a></li>
             <li><a href="http://wp.nyu.edu/developers/2018/03/15/nyu-faculty-bibliography-for-med-dental-and-nursing/">Faculty Bibliography</a></li>
             <li><a href="http://wp.nyu.edu/developers/2018/03/08/library-shared-space/">Library Share Space</a></li>
             <li><a href="http://wp.nyu.edu/developers/2018/03/08/academic-calendar/">Academic Calendar</a></li>
        </ul>
        </div>
      </div>
      )
    }
  }
  
  export default injectSheet(styles)(APIList);
