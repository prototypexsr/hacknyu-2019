import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import promise from "redux-promise-middleware";
import reducer from "./reducers";
import logger from "redux-logger";
import { routerMiddleware } from "connected-react-router";
import { composeWithDevTools } from "redux-devtools-extension";
import createBrowserHistory from "history/createBrowserHistory";

const middleware =
  process.env.NODE_ENV == "production"
    ? applyMiddleware(
        promise(),
        thunk,
        routerMiddleware(createBrowserHistory()) //for intercepting navigation actions
      )
    : composeWithDevTools(
        applyMiddleware(
          promise(),
          thunk,
          logger,
          routerMiddleware(createBrowserHistory())
        )
      );

export default createStore(reducer(createBrowserHistory()), middleware);
