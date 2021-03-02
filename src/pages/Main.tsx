import React from 'react';
import '../style/Main.css';
import Map from '../components/Map';
import FormBox from '../components/FormBox';
import HeaderInfo from '../components/HeaderInfo';
import ModalInfo from '../components/ModalInfo';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';
import { serverURL } from '../data/config.js';
import { Modal, Button } from 'react-bootstrap';
import DatesAndPrices from '../components/DatesAndPrices';


/**
 * This is the Main component of the App.
 */


// TODO: 
//      * When I re-click on the city, clear value (last)
//      * Create a page for the returns
//      * Change to component functions
//      * If wait time is longer than 15 seconds, let the user know the wait will be 1 minute.

interface LocationsProps {
  startCityList: {
    text: string, 
    key: string,
    value: string,
  }[];
  // startCityName: string;
  inputValue1: string;
  inputValue2: string;
  inputValueArray: string[];
  info: string;
  loading: boolean;
  destinationCity: string;
  canAPI: boolean;
  doesModalShow: boolean;
  chosenDate: string;

  placeholderTotalPrice: string;
  placeholderPrice1: string;
  placeholderPrice2: string;
  placeholderDate: string;
  placeholderOriginCity1: string;
  placeholderOriginCity2: string;
  placeholderDestination: string;
  placeholderAirline1: string;
  placeholderAirline2: string;
  fullList: [];
  listOfDates: {
    date: string,
    totalPrice: string,
  }[];
  
}

class Main extends React.Component < {}, LocationsProps> {
  startTimer = 0
  stopTimer = 0
  totalTime = 15
  constructor(props:LocationsProps) {
    super(props);
    this.state = {
      startCityList: [],
      // startCityName: "",
      inputValue1: "",
      inputValue2: "",
      inputValueArray: ["","",""],
      info: "hide",
      loading: false,
      destinationCity: "",
      canAPI: true,
      doesModalShow: false,
      chosenDate: "",

      placeholderTotalPrice: "TBD",
      placeholderPrice1: "TBD",
      placeholderPrice2: "TBD",
      placeholderDate: "TBD",
      placeholderOriginCity1: "TBD",
      placeholderOriginCity2: "TBD",
      placeholderDestination: "TBD",
      placeholderAirline1: "TBD",
      placeholderAirline2: "TBD",
      fullList: [], 
      listOfDates: [],
    }
  }

  // change origin cities for API Call
  changeStart = (isOne: boolean, city: string) => {
    // this.setState({startCityName: city})
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
  updateCityList = (onlyCityList: { text: string, key: string, value: string}[]) => {
    this.setState({startCityList: onlyCityList})
  }

  // when form block clicked, api can be called
  callAPI = () => {
    this.setState({ 
      canAPI: true,
    })
  }

  // api get and post
  postAPI = () => {
    let url = serverURL + "/cityPost"
    this.setState({loading: true}, () => {
    axios.post(url, 
        {
          inputOriginCities: [this.state.inputValueArray[0],this.state.inputValueArray[1]],
          inputDestinationCity: [this.state.inputValueArray[2]],
        }) //, {mode: "cors"})
        .then((response) => {       
          const data = response.data;
          // Reset inputs
          if (!response.data.data){
            this.setState({
              canAPI: true,
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
              placeholderAirline1: (data.data[0].carrier_1),
              placeholderAirline2: (data.data[0].carrier_2),
              fullList: data.data,
              info: "show",
            }, () => {
              this.stopTimer = Date.now();
              let timeTimer = this.stopTimer - this.startTimer;
              let minutes = ("0" + (Math.floor(timeTimer /60000) % 60)).slice(-2);
              let seconds = ("0" + (Math.floor(timeTimer /1000) % 60)).slice(-2);
              console.log("TIMER: ", minutes, ":", seconds);
            }
          )
          this.setState({listOfDates: this.sortDates(this.state.fullList)})
        }).catch((error) => {
          console.log("error: ", error);
          this.setState({loading:false});
          alert("Unfortunately, no flights were found. Please try again.");
      });
    });
  }

  // take the full list and add the unique dates to the listOfDates list
  sortDates = (fullList: any[]) => {
    let tempList: any[] = []
    console.log(fullList);
    fullList.forEach((entry: any, index: Number) => {
      if (!(tempList.find(elem => elem.date === entry.date_1))) {
        tempList.push({ "date": entry.date_1, "totalPrice": entry.total_price })
      }
    });
    console.log("tempList:", tempList);
    return (tempList);
  }

  // change the date after selection on modal
  changeDate = (date: string) => {
    this.setState({ 
      chosenDate: date,
    })
  }

  // close the modal
  handleClose = () => { 
    this.setState({
      doesModalShow: false,
      chosenDate: "",
    })
  };
  
  // open the modal for more flight dates
  handleShow = () => { 
    this.setState({doesModalShow: true}) 
  };

  // call api after user selects origin and destination cities
  componentDidUpdate() {
    if ((this.state.canAPI === true) && 
       ((this.state.inputValueArray[0] !== "") && (this.state.inputValueArray[1] !== "") && (this.state.inputValueArray[2] !== ""))
    ){
      this.setState({ canAPI: false, loading: true, });
      this.postAPI();
      console.log("=== API CALLED ===")  
    }

    if (this.state.loading === true) {
      this.startTimer = Date.now()
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
          {this.state.loading 
            ? 
              <div className="small">
                <Spinner animation="grow" className="small"/>
                <Spinner animation="grow" className="small"/>
                <Spinner animation="grow" className="small"/>
              </div>
            : 
              <HeaderInfo 
                info = {this.state.info}
                placeholderTotalPrice={this.state.placeholderTotalPrice}
                placeholderPrice1={this.state.placeholderPrice1}
                placeholderPrice2={this.state.placeholderPrice2}
                placeholderDate={this.state.placeholderDate}
                placeholderOriginCity1={this.state.placeholderOriginCity1}
                placeholderOriginCity2={this.state.placeholderOriginCity2}
                placeholderDestination={this.state.placeholderDestination}
                placeholderAirline1={this.state.placeholderAirline1}
                placeholderAirline2={this.state.placeholderAirline2}
              />
          }
          <FormBox 
            changeStart={this.changeStart}
            changeDestination={this.changeDestination}
            callAPI={this.callAPI}
            startCityList={this.state.startCityList}
            // inputValue1={this.state.inputValue1}
            // inputValue2={this.state.inputValue2}
            // destinationCity={this.state.destinationCity}
          />
          <Modal
            contentClassName="font-color"
            // centered={true}
            show={this.state.doesModalShow}
            // onHide={() => this.handleClose()}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header closeButton>
              <Modal.Title>From {this.state.inputValue1} and {this.state.inputValue2} <br />To {this.state.destinationCity}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {/* <div className="scroll"> */}
              {(this.state.chosenDate === "") 
                ?
                  <DatesAndPrices 
                    listOfDates={this.state.listOfDates}
                    changeDate={this.changeDate}
                  />
                :
                  <ModalInfo 
                    // info = {this.state.info}
                    fullList = {this.state.fullList}
                    // placeholderTotalPrice={this.state.placeholderTotalPrice}
                    // placeholderPrice1={this.state.placeholderPrice1}
                    // placeholderPrice2={this.state.placeholderPrice2}
                    placeholderDate={this.state.chosenDate}
                    placeholderOriginCity1={this.state.placeholderOriginCity1}
                    placeholderOriginCity2={this.state.placeholderOriginCity2}
                    placeholderDestination={this.state.placeholderDestination}
                    // placeholderAirline1={this.state.placeholderAirline1}
                    // placeholderAirline2={this.state.placeholderAirline2}
                    changeDate={this.changeDate}
                  />
              }
              {/* </div> */}
            </Modal.Body>
            <Modal.Footer>
              {(this.state.chosenDate === "") 
                ?
                  <> </>
                : 
                  <Button 
                    onClick={() => {
                        this.changeDate("");
                    }}
                  >
                    Back
                  </Button> 
              }
              <Button variant="secondary" onClick={() => this.handleClose()}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
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
          handleShow={this.handleShow}
        />
      </div>
    );
  }
}

export default Main;