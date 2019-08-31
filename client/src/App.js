import React, { Component } from "react";
import {Switch, Route} from 'react-router-dom'

import Navbar from './components/layout/Navbar.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import WelcomePage from './components/WelcomePage.js'
import Admin from './components/Admin';
import "./App.css";
import jwt_decode from "jwt-decode";
import setAuthToken from "./utils/setAuthToken";
import { setCurrentUser, logoutUser } from "./actions/authActions";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <React.Fragment>
        <Navbar/>
          <Switch>
            <Route exact path = "/welcomePage" component = {WelcomePage}/>
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/register" component = {Register}/>
            <Route exact path = "/admin" component = {Admin} />
          </Switch>
        </React.Fragment>
      </Provider>
    );
  }
}
export default App;