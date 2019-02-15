import { Provider } from "react-redux";
import * as React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import MainApp from "./core/components/MainApp";
import HomePage from "./core/components/HomePage";
import { ConnectedRouter } from "connected-react-router";
import store from "../store";
import ThemeInjector from "./ThemeInjector";
import ApplyPage from "./forms/components/ApplyPage";
import LoginPage from "./forms/components/LoginPage";
import AboutPage from "./core/components/AboutPage";
import RegisterPage from "./core/components/RegisterPage";
import ResetPasswordPage from "./forms/components/ResetPasswordPage";
import ProfilePage from "./core/components/ProfilePage";
import TicketPage from './checkin/components/TicketPage';
import Prizes from './core/components/Prizes';
import UserCheckInPage from './checkin/components/CheckInHackerPage';
import appHistory from "../appHistory";
import AdmissionResultPage from "./admission/components/AdmissionResultPage";
import NotFoundPage from "./core/components/NotFoundPage";
import { IS_REGISTRATION_OPEN } from "./constants";

class RoutingApp extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <ConnectedRouter history={appHistory}>
          <ThemeInjector>
            <MainApp>
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/about" component={AboutPage} />
                <Route exact path="/prizes" component={Prizes} />
                <Route exact path="/login" component={LoginPage} />
                <Route exact path="/register" component={RegisterPage} />
                <Route exact path="/status" component={AdmissionResultPage} />
                <Route
                  exact
                  path="/reset_password"
                  component={ResetPasswordPage}
                />
                <Route exact path="/apply" component={ApplyPage} />
                <Route exact path="/my_profile" component={ProfilePage} />
                <Route exact path="/404" component={NotFoundPage} />
                <Route exact path="/user-check-in/:uid" component={UserCheckInPage} />
                <Route exact path="/ticket" component={TicketPage} />
                <Redirect to="/404"/>
              </Switch>
            </MainApp>
          </ThemeInjector>
        </ConnectedRouter>
      </Provider>
    );
  }
}

export default RoutingApp;
