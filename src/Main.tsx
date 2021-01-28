import React from 'react';
// import logo from './img/globe.png';
import './Main.css';
import Map from './Map';
import FormBox from './FormBox';


/**
 * This is the Main component of the App.
 */

interface Locations {
  points1 : number[];
  points2: number[];
  startCityList: string[];
}

// class Main extends React.Component{
class Main extends React.Component <{}, Locations> {
  constructor(props:Locations) {
    super(props);
    this.state = {
      // Start Locatiions
      points1 : [0,0],
      points2 : [0,0],
      startCityList: []
    };
  }

  // change city string on text field form
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

  updateCityList = (onlyCityList: string[]) => {
    this.setState({startCityList: onlyCityList})
  };
  

  render() {
    return (
      <div className="Main">
        <div className="App-header">
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Let's fly everywhere!</h2>
          <p>We'll help you find the cheapest flight for you and your friend to anywhere in the world!</p>
          <p>
            Pick your airport city and your friend's airport city.
          </p>
          <a
            className="App-link"
            href="https://github.com/alexgastone/flight_finder"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn More
          </a>
        <FormBox changeStart={this.changeStart} startCityList={this.state.startCityList}/>
        </div>
        <Map points1={this.state.points1} points2={this.state.points2} updateCityList={this.updateCityList} />
      </div>
    );
  }
}

export default Main;