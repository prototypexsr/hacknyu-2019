import "@babel/polyfill";
import * as React from "react";
import * as ReactDOM from "react-dom";
import RoutingApp from "./modules/RoutingApp";
import injectTapEventPlugin from "react-tap-event-plugin";

// for onClick events with MUI/React
try {
  injectTapEventPlugin();
} catch (err) {
  /* hot reloading, no issue  */
}

ReactDOM.render(<RoutingApp />, document.getElementById("app"));
