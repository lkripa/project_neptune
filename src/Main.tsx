import React from 'react';
import logo from './img/globe.png';
import './Main.css';
import Map from './Map';
import FormBox from './FormBox';

/**
 * This is the Main component of the App.
 */

interface Locations {
  points1 : number[];
  points2: number[];
}

// class Main extends React.Component{
class Main extends React.Component <{}, Locations> {
  constructor(props:Locations) {
    super(props);
    this.state = {
      // Start Locatiions
      points1 : [0,0],
      points2 : [0,0],
    };
  }

  changeStart = (points: number[], isOne: boolean) => {
    if (isOne) {
      this.setState({
        points1: points,
      });
    } else {
      this.setState({
        points2: points,
      });
    }
    console.log('isPersonOne:', isOne, points);
  }

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
        <FormBox changeStart={this.changeStart} />
        </div>
        <Map points1={this.state.points1} points2={this.state.points2} />
      </div>
    );
  }
}

export default Main;