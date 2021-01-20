import React from 'react';
import ReactDOM from 'react-dom';

import './index.css';
import App from './App.jsx';
import Footer from './Footer';
import NavBar from './NavBar';
import Main from './Main';

import reportWebVitals from './testScripts/reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';

/**
 * This is the navigation component.
 */

ReactDOM.render(
  <React.StrictMode>
    <>
      <NavBar />
      <App />
      <Main />
      <Footer />
    </>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();