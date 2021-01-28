import React from 'react';
// import logo from './img/globe.png';
import './Main.css';
import Map from './Map';
import FormBox from './FormBox';


/**
 * This is the Main component of the App.
 */

interface LocationsProps {
  points1 : number[];
  points2: number[];
  startCityList: string[];
  startCityName: string;
  inputValue1: string;
  inputValue2: string;
}

// class Main extends React.Component{
class Main extends React.Component <{}, LocationsProps> {
  constructor(props:LocationsProps) {
    super(props);
    this.state = {
      // Start Locatiions
      points1 : [0,0],
      points2 : [0,0],
      startCityList: [],
      startCityName: "",
      inputValue1: "",
      inputValue2: ""
    };
  }

  // change city string on text field form
  changeStart = (points: number[], isOne: boolean, startCity: string) => {
    if (isOne) {
      this.setState({
        points1: points,
      });
      this.setState({inputValue1: startCity}, () => 
      console.log("city:", this.state.inputValue1
    ));
    } else {
      this.setState({
        points2: points,
      });
      this.setState({inputValue2: startCity}, () => 
      console.log("city:", this.state.inputValue2
    ));
    }
    this.setState({startCityName: startCity})
    console.log('isPersonOne:', isOne, points);
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
        <FormBox 
          changeStart={this.changeStart} 
          startCityList={this.state.startCityList}
          inputValue1={this.state.inputValue1}
          inputValue2={this.state.inputValue2}
          changeLetter={this.changeLetter}
        />
        </div>
        <Map 
          points1={this.state.points1} 
          points2={this.state.points2} 
          updateCityList={this.updateCityList} 
        />
      </div>
    );
  }
}

export default Main;