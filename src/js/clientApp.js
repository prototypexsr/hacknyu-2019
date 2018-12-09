import React from "react";
import ReactDOM from "react-dom";
import RoutingApp from "./modules/RoutingApp";
import { AppContainer } from "react-hot-loader";
import injectTapEventPlugin from "react-tap-event-plugin";

// for onClick events with MUI/React
try {
  injectTapEventPlugin();
} catch (err) {
  /* hot reloading, no issue  */
}

import VersionInfo  from "./versionInfo";


console.log("appVersion ->", VersionInfo.VERSION);

ReactDOM.render(
  <AppContainer>
    <RoutingApp />
  </AppContainer>,
  document.getElementById("app")
);
