import React from 'react';
import logo from './img/globe.png';
import './Main.css';
import App from './App';



class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            We're going to fly everywhere!
          </p>
          <a
            className="App-link"
            href="https://github.com/alexgastone/flight_finder"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        </div>
        <App />
      </div>
    );
  }
}

export default Main;