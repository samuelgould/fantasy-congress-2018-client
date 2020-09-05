import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Header from '../Header/header';
import LandingPage from '../LandingPage/landing-page';
import About from '../About/about';
import Dashboard from '../Dashboard/dashboard';
import LoginPage from '../LoginPage/login-page';
import RegistrationPage from '../RegistrationPage/registration-page';
import TeamPage from '../TeamPage/team-page';

export default class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Route component={Header} />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/about' component={About} />
          <Route path='/dashboard' render={(props) => <Dashboard {...props} />} />
          <Route exact path='/login' component={LoginPage} />
          <Route exact path='/register' component={RegistrationPage} />
          <Route path='/team-page' render={(props) => <TeamPage {...props} />} />
        </Switch>
      </BrowserRouter>
    );
  }
}
