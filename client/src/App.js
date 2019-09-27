import React, { Component } from "react";
import { Switch, Route } from 'react-router-dom'
import NavigationBar from './components/layout/NavigationBar.js'
import Login from './components/Login.js'
import Register from './components/Register.js'
import WelcomePage from './components/WelcomePage.js'
import Product from './components/Product.js'
import AddBid from './components/AddBid.js'
import ShowActiveBids from './components/ShowActiveBids.js'
import OpenMap from './components/OpenMap.js'
import RequestWaiting from './components/RequestWaiting.js'
import AdvancedSearch from './components/AdvancedSearch.js'
import SearchResults from './components/SearchResults.js'
import Logout from "./components/Logout";
import RecommendedProducts from "./components/RecommendedProducts";
import Messages from "./components/Messages";
import ErrorPage from './components/ErrorPage.js'


import Admin from './components/Admin.js';
import "./App.css";

import { Provider } from "react-redux";
import store from "./store";

class App extends Component {
  render() {
    return (
      <Provider store = {store}>
        <React.Fragment>
        <NavigationBar />
          <Switch>
            {/*<Route exact path = "/" component = {WelcomePage}/>*/}
            <Route exact path = "/welcomePage" component = {WelcomePage}/>
            <Route exact path = "/login" component = {Login}/>
            <Route exact path = "/register" component = {Register}/>
            <Route exact path = "/admin" component = {Admin}/>
            <Route exact path = "/product" component = {Product}/>
            <Route exact path = "/addBid" component = {AddBid}/>
            <Route exact path = "/messages" component = {Messages}/>
            <Route exact path = "/showActiveBids" component = {ShowActiveBids}/>
            <Route exact path = "/openMap" component = {OpenMap}/>
            <Route exact path = "/requestWaiting" component = {RequestWaiting} />
            <Route exact path = "/advancedSearch" component = {AdvancedSearch} />
            <Route exact path = "/searchResults" component = {SearchResults} />
            <Route exact path = "/logout" component={Logout} />
            <Route exaxt path = "/recommend" component = {RecommendedProducts} />
            <Route component = {ErrorPage} />
          </Switch>
        {/* <Footer className = "footer">
          <p className="footer-copyright mb-0">
            &copy; {new Date().getFullYear()} Copyright
          </p>
        </Footer>  */}
        </React.Fragment>
      </Provider>
    );
  }
}
export default App;