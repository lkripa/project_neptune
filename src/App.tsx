import React from 'react';
import logo from './globe.png';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
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
      </header>
    </div>
  );
}

export default App;
