import React from 'react';
import ReactDOM from 'react-dom';
import './style/index.css';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import Main from './pages/Main';
import About from './pages/About';
import { BrowserRouter, Switch, Route } from "react-router-dom";
import reportWebVitals from './testScripts/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'semantic-ui-css/semantic.min.css';

/**
 * This is the navigation component.
 */

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);

ReactDOM.render(
  // <React.StrictMode>
  <BrowserRouter>
    <NavBar />
    <Switch>
      <Route exact path="/">
        <Main />
        {/* <Footer /> */}
      </Route>
      <Route path="/about">
        <About />
        <Footer />
      </Route>
      <Route path="/contact">
        <About />
        <Footer />
      </Route>
    </Switch>
  </BrowserRouter>,
  // </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);