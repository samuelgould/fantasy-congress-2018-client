import React from 'react';
import { Route } from 'react-router-dom';
import Header from '../Header/header';
import LandingPage from '../LandingPage/landing-page';
import About from '../About/about';
import Dashboard from '../Dashboard/dashboard';
import CandidateView from '../CandidateView/candidate-view';
import LoginPage from '../LoginPage/login-page';
import RegistrationPage from '../RegistrationPage/registration-page';
import TeamPage from '../TeamPage/team-page';
import './App.css';


export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Route component={Header} />

        <Route exact path='/' component={LandingPage} />
        <Route exact path='/about' component={About} />
        <Route exact path='/dashboard' component={Dashboard} />
        <Route exact path='/candidate' component={CandidateView} />
        <Route exact path='/login' component={LoginPage} />
        <Route exact path='/register' component={RegistrationPage} />
        <Route exact path='/team-page' component={TeamPage} />
      </div>
    );
  }
}
