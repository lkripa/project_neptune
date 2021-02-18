import React from 'react';
import './Main.css';
import Map from './Map';
import FormBox from './FormBox';
import Info from './Info';
import axios from 'axios';


/**
 * This is the Main component of the App.
 */
// ! Create Processing Symbol for waiting time
// ? Check for this error : Proxy error: Could not proxy request /cityPost from localhost:3000 to http://127.0.0.1:5000/.
// ? See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).
// * Change so that <Info /> pops up after request call

interface LocationsProps {
  startCityList: string[];
  startCityName: string;
  inputValue1: string;
  inputValue2: string;
  inputValueArray: string[];

  placeholderTotalPrice: string;
  placeholderPrice1: string;
  placeholderPrice2: string;
  placeholderDate: string;
  placeholderOriginCity1: string;
  placeholderOriginCity2: string;
  placeholderDestination: string;
  
}

class Main extends React.Component < {}, LocationsProps> {
  isFirst = true;
  constructor(props:LocationsProps) {
    super(props);
    this.state = {
      startCityList: [],
      startCityName: "",
      inputValue1: "",
      inputValue2: "",
      inputValueArray: ["",""],
      placeholderTotalPrice: "TBD",
      placeholderPrice1: "TBD",
      placeholderPrice2: "TBD",
      placeholderDate: "TBD",
      placeholderOriginCity1: "TBD",
      placeholderOriginCity2: "TBD",
      placeholderDestination: "TBD",
    };
  }

  changeStart = (isOne: boolean, city: string) => {
    this.setState({startCityName: city})
    if (isOne) {
      let updateValueArray: string[] = [city, this.state.inputValueArray[1]]
      this.setState({
        inputValue1: city,
        inputValueArray: updateValueArray}, () => 
      console.log("cityValue1:", this.state.inputValue1, isOne, this.state.inputValueArray)
      );
    } else {
      let updateValueArray: string[] = [this.state.inputValueArray[0], city]
      this.setState({
        inputValue2: city,
        inputValueArray: updateValueArray}, () => 
      console.log("cityValue2:", this.state.inputValue2, isOne, this.state.inputValueArray)
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
  postAPI= () => {
    axios.post("/cityPost" , {input: this.state.inputValueArray}) //, {mode: "cors"})
        .then((response) => {       
          const data = response.data;
          this.setState({
            placeholderTotalPrice: (data.data[0].total_price),
            placeholderPrice1: (data.data[0].price_1),
            placeholderPrice2: (data.data[0].price_2),
            placeholderDate: (data.data[0].date_1),
            placeholderOriginCity1: (data.data[0].origin_city_name_1),
            placeholderOriginCity2:(data.data[0].origin_city_name_2),
            placeholderDestination:(data.data[0].dest_city_name_1),
          })
        }).catch((error) => {
          console.log("error: ", error);
          alert("An error occurred.");
      });
  }

  componentDidUpdate(prevState: any) {
    if ((this.isFirst) && ((this.state.inputValueArray[0] !== "") && (this.state.inputValueArray[1] !== ""))) {
        this.postAPI()
        this.isFirst = false;
    }
  }

  render() {
    return (
      <div className="Main">
        <div className="App-header">
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
          
          <Info 
            placeholderTotalPrice={this.state.placeholderTotalPrice}
            placeholderPrice1={this.state.placeholderPrice1}
            placeholderPrice2={this.state.placeholderPrice2}
            placeholderDate={this.state.placeholderDate}
            placeholderOriginCity1={this.state.placeholderOriginCity1}
            placeholderOriginCity2={this.state.placeholderOriginCity2}
            placeholderDestination={this.state.placeholderDestination}
          />
        <FormBox 
          changeStart={this.changeStart} 
          startCityList={this.state.startCityList}
          inputValue1={this.state.inputValue1}
          inputValue2={this.state.inputValue2}
          changeLetter={this.changeLetter}

        />
        </div>
        <Map 
          updateCityList={this.updateCityList}
          inputValue1={this.state.inputValue1}
          inputValue2={this.state.inputValue2}
        />
      </div>
    );
  }
}

export default Main;