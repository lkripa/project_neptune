import React from 'react';
import './style/Main.css';
import Map from './Map';
import FormBox from './FormBox';
import Info from './Info';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';



/**
 * This is the Main component of the App.
 */

// ? Check for this error : Proxy error: Could not proxy request /cityPost from localhost:3000 to http://127.0.0.1:5000/.
// ? See https://nodejs.org/api/errors.html#errors_common_system_errors for more information (ECONNRESET).

// TODO: 
//      * Create a page for the returns
//      * Set up online server

interface LocationsProps {
  startCityList: string[];
  startCityName: string;
  inputValue1: string;
  inputValue2: string;
  inputValueArray: string[];
  info: string;
  loading: boolean;
  destinationCity: string;

  placeholderTotalPrice: string;
  placeholderPrice1: string;
  placeholderPrice2: string;
  placeholderDate: string;
  placeholderOriginCity1: string;
  placeholderOriginCity2: string;
  placeholderDestination: string;
  fullList: [];
  listOfDates: string[];
  
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
      inputValueArray: ["","",""],
      info: "hide",
      loading: false,
      destinationCity: "",

      placeholderTotalPrice: "TBD",
      placeholderPrice1: "TBD",
      placeholderPrice2: "TBD",
      placeholderDate: "TBD",
      placeholderOriginCity1: "TBD",
      placeholderOriginCity2: "TBD",
      placeholderDestination: "TBD",
      fullList: [], 
      listOfDates: [],
    }
  }
  // change origin cities for API Call
  changeStart = (isOne: boolean, city: string) => {
    this.setState({startCityName: city})
    if (isOne) {
      let updateValueArray: string[] = [city, this.state.inputValueArray[1],this.state.inputValueArray[2]]
      this.setState({
        inputValue1: city,
        inputValueArray: updateValueArray}, () => 
      console.log("cityValue1:", this.state.inputValue1, isOne, this.state.inputValueArray)
      );
    } else {
      let updateValueArray: string[] = [this.state.inputValueArray[0], city, this.state.inputValueArray[2]]
      this.setState({
        inputValue2: city,
        inputValueArray: updateValueArray}, () => 
      console.log("cityValue2:", this.state.inputValue2, isOne, this.state.inputValueArray)
      );
    }
  }

  // change destination city for API Call
  changeDestination = (_: boolean, destinationCity: string) => {
    let updateValueArray: string[] = [this.state.inputValueArray[0], this.state.inputValueArray[1], destinationCity]
    this.setState({
      destinationCity: destinationCity,
      inputValueArray: updateValueArray,
    }, () => 
      console.log("destinationCity:", this.state.inputValueArray)
    );
  }

  // checks for valid cities to show on menu selection
  updateCityList = (onlyCityList: string[]) => {
    this.setState({startCityList: onlyCityList})
  }

  // in formbox, the state is changed for every letter typed
  changeLetter = (letter: string, person: string) => {
    if (person === "myInput") {
      this.setState({
        inputValue1: letter
      })
      console.log(this.state.inputValue1);
    } else if (person === "myInput2") {
      this.setState({
        inputValue2: letter
      })
      console.log(this.state.inputValue2);
    } else {
      this.setState({
        destinationCity: letter
      })
      console.log(this.state.destinationCity);
    }
  }

  // when form block clicked, api can be called
  callAPI = () => {
    this.isFirst = true;
  }

  // api get and post
  postAPI = () => {
    this.setState({loading: true}, () => {
    axios.post("/cityPost" , 
        {
          inputOriginCities: [this.state.inputValueArray[0],this.state.inputValueArray[1]],
          inputDestinationCity: [this.state.inputValueArray[2]],
        }) //, {mode: "cors"})
        .then((response) => {       
          const data = response.data;
          // Reset inputs
          if (!response.data.data){
            this.isFirst = true;
            this.setState({
              loading: false,
              inputValueArray: ["","",""],
              inputValue1: "",
              inputValue2: "",
              destinationCity: "",
            })
          }
          this.setState({
            loading: false,
            placeholderTotalPrice: (data.data[0].total_price),
            placeholderPrice1: (data.data[0].price_1),
            placeholderPrice2: (data.data[0].price_2),
            placeholderDate: (data.data[0].date_1),
            placeholderOriginCity1: (data.data[0].origin_city_name_1),
            placeholderOriginCity2:(data.data[0].origin_city_name_2),
            placeholderDestination:(data.data[0].dest_city_name_1),
            fullList: data.data,
            info: "show",
          })
          this.setState({listOfDates: this.sortDates(this.state.fullList)}, () => { console.log(this.state.listOfDates)})
        }).catch((error) => {
          console.log("error: ", error);
          alert("Unfortunately, no flights were found. Please try again.");
      });
    });
  }

  sortDates = (fullList: any[] ) => {
    let tempList: any[] = []
    fullList.forEach((entry: any, index: Number) => {
      if (!(tempList.find(elem => elem.date === entry.date_1))) {
        tempList.push({ "date": entry.date_1, "totalPrice": entry.total_price })
      }
    });
    console.log("tempList:", tempList);
    return (tempList);
  }

  // call api after user selects origin and destination cities
  componentDidUpdate(prevState: any) {
    if ((this.isFirst) && 
        ((this.state.inputValueArray[0] !== "") && (this.state.inputValueArray[1] !== "") && (this.state.inputValueArray[2] !== ""))
    ) {
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
            Learn how the code works...
          </a>
          {this.state.loading ? 
            <div className="small">
              <Spinner animation="grow" className="small"/>
              <Spinner animation="grow" className="small"/>
              <Spinner animation="grow" className="small"/>
            </div>
             : <Info 
                info = {this.state.info}
                placeholderTotalPrice={this.state.placeholderTotalPrice}
                placeholderPrice1={this.state.placeholderPrice1}
                placeholderPrice2={this.state.placeholderPrice2}
                placeholderDate={this.state.placeholderDate}
                placeholderOriginCity1={this.state.placeholderOriginCity1}
                placeholderOriginCity2={this.state.placeholderOriginCity2}
                placeholderDestination={this.state.placeholderDestination}
              />
          }
            
        <FormBox 
          changeStart={this.changeStart}
          changeDestination={this.changeDestination}
          callAPI={this.callAPI}
          destinationCity={this.state.destinationCity}
          startCityList={this.state.startCityList}
          inputValue1={this.state.inputValue1}
          inputValue2={this.state.inputValue2}
          changeLetter={this.changeLetter}

        />
        </div>
        <Map 
          updateCityList={this.updateCityList}
          destinationCity={this.state.destinationCity}
          inputValue1={this.state.inputValue1}
          inputValue2={this.state.inputValue2}
          placeholderTotalPrice={this.state.placeholderTotalPrice}
          placeholderPrice1={this.state.placeholderPrice1}
          placeholderPrice2={this.state.placeholderPrice2}
          placeholderDate={this.state.placeholderDate}
          placeholderOriginCity1={this.state.placeholderOriginCity1}
          placeholderOriginCity2={this.state.placeholderOriginCity2}
          placeholderDestination={this.state.placeholderDestination}
          listOfDates={this.state.listOfDates}
        />
      </div>
    );
  }
}

export default Main;