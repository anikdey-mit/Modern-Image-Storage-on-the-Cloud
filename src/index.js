import React from 'react';
import ReactDOM from 'react-dom';
import './App.css'
import App from './App';
import * as serviceWorker from './serviceWorker';
import 'jquery/dist/jquery'
import 'popper.js/dist/popper'
import 'bootstrap/dist/js/bootstrap'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
  useParams
} from "react-router-dom";
import { Amplify } from 'aws-amplify'

// Cognito: Aditya's Account 
// Amplify.configure({
//   Auth: {
//     mandatorySignIn: true,
//     region: 'us-east-1',
//     userPoolId: 'us-east-1_qoCYZyhHa',
//     userPoolWebClientId: '6rj69edkbbuq9aeecla6526koo'
//   }
// });

// Cognito: Nadeesh's Account
Amplify.configure({
  Auth: {
    mandatorySignIn: true,
    region: 'us-east-1',
    userPoolId: 'us-east-1_Uhsl65aWl',
    userPoolWebClientId: '737ehjikfr2e4qf1v4fpui4ukt'
  }
})

ReactDOM.render(
  <Router>
    <App />
  </Router>,
  document.getElementById('appRoot')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
