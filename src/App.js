import React, { useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";
import $ from "jquery";
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap';
import SearchByTags from './SearchByTags';
import ImageUpload from './ImageUpload';
import SignIn from './SignIn';
import { AppContext } from './contextLib';
// import Routes from "./Routes";

function App() {
  function handleLogout() {
    userHasAuthenticated(false);
  }
  const [isAuthenticated, userHasAuthenticated] = useState(false);
  const [givenName, setGivenName] = useState(false);
  const [familyName, setFamilyName] = useState(false);
  const [idToken, setIdToken] = useState(false);


  if (isAuthenticated) {
    return (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, givenName, setGivenName, familyName, setFamilyName, idToken, setIdToken}}>
        <Router>
          <nav className="navbar navbar-expand-lg navbar-dark text-white bg-primary">
            <h2>TagStore</h2>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item bg-light text-primary rounded px-3" style={{lineHeight:'42px'}}>Welcome, {givenName + ' ' + familyName}!</li>
                <li className="nav-item">
                  <NavLink to="/" exact className='nav-link' activeClassName='active'>Image Upload</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/searchByTags" exact className='nav-link' activeClassName='active'>Search By Tags</NavLink>
                </li>
                <li className="nav-item">
                  <button className="nav-link btn btn-default" onClick={() => handleLogout()}>Logout</button>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
            <Route path="/" exact component={ImageUpload} />
            <Route path="/searchByTags" exact component={SearchByTags} />
          </Switch>
        </Router>
      </AppContext.Provider>
    )
  }
  else {
    return (
      <AppContext.Provider value={{ isAuthenticated, userHasAuthenticated, givenName, setGivenName, familyName, setFamilyName, idToken, setIdToken}}>
        <SignIn />
      </AppContext.Provider>
    )
  }
}

export default App;
