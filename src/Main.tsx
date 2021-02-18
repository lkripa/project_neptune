import React from 'react';
// import logo from './img/globe.png';
import './Main.css';
import Map from './Map';
import FormBox from './FormBox';
import Info from './Info';


/**
 * This is the Main component of the App.
 */

interface LocationsProps {
  // points1 : number[];
  // points2: number[];
  startCityList: string[];
  startCityName: string;
  inputValue1: string;
  inputValue2: string;
  // cityCoords: number[];
}

// class Main extends React.Component{
class Main extends React.Component < {}, LocationsProps> {
  constructor(props:LocationsProps) {
    super(props);
    this.state = {
      // Start Locatiions
      // points1 : [0,0],
      // points2 : [0,0],
      startCityList: [],
      startCityName: "",
      inputValue1: "",
      inputValue2: "",
      // cityCoords: [0,0]
    };
  }

  // change city string on text field form
  // updateStartCity = (startCity: string) => {
  //   this.setState({startCityName: startCity})
  // }

  changeStart = (isOne: boolean, city: string) => {
    this.setState({startCityName: city})
    if (isOne) {
      this.setState({
        // points1: points,
        inputValue1: city}, () => 
      console.log("cityValue:", this.state.inputValue1, isOne)
      );
    } else {
      this.setState({
        // points2: points,
        inputValue2: city}, () => 
      console.log("cityValue:", this.state.inputValue2, isOne)
      );
    }
  }

  updateCityList = (onlyCityList: string[]) => {
    this.setState({startCityList: onlyCityList})
  }

  changeLetter = (letter: string, person: string) => {
    if (person === "myInput") {
      this.setState({
        inputValue1: letter
      })
      console.log(this.state.inputValue1);
    } else {
      this.setState({
        inputValue2: letter
      })
      console.log(this.state.inputValue2);
    }
  }

  // updateCityCoords = (coordinates: number[]) => {
  //   this.setState({cityCoords: coordinates})
  // }
  
  render() {
    return (
      <div className="Main">
        <div className="App-header">
          
          {/* <img src={logo} className="App-logo" alt="logo" /> */}
          <h2>Let's fly everywhere!</h2>
          <p>We'll help you find the cheapest flight anywhere in the world!</p>
          <p>
            Pick two airport cities and where ever you want to go!
          </p>
          <a
            className="App-link"
            href="https://github.com/alexgastone/flight_finder"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn how to code works
          </a>
          
          <Info />
        <FormBox 
          changeStart={this.changeStart} 
          startCityList={this.state.startCityList}
          inputValue1={this.state.inputValue1}
          inputValue2={this.state.inputValue2}
          changeLetter={this.changeLetter}
          // cityCoords={this.state.cityCoords}
          // updateStartCity={this.updateStartCity}
          // startCity={this.state.startCityName}
        />
        </div>
        <Map 
          // points1={this.state.points1} 
          // points2={this.state.points2} 
          updateCityList={this.updateCityList}
          // startCityName={this.state.startCityName}
          // updateCityCoords={this.updateCityCoords}
          inputValue1={this.state.inputValue1}
          inputValue2={this.state.inputValue2}
        />
      </div>
    );
  }
}

export default Main;