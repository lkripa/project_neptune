import React from 'react';
import {Dropdown} from 'react-bootstrap';

/**
 * This is the Menu component for the start Locations.
 */

interface FuncProps {
  changeStart(isOne: boolean, city: string): any;
  // updateStartCity(startCity: string): any;
  isOne: boolean;
  startCityList: string[];
  inputValue: string;
  // cityCoords: number[];
  // startCity: string;
}

class Menu extends React.Component <FuncProps> {	

  render() {
    return (
      <Dropdown.Menu>
        {this.props.startCityList.map((city,index) => (
          (city.toUpperCase().includes(this.props.inputValue.toUpperCase()) && this.props.inputValue.length >= 3)
            ? <Dropdown.Item 
                key={city+index} 
                onClick={() => {
                  //TODO problem is here: UNTIL the cityCoords update first, then changeStart() work
                  // this.props.updateStartCity(city, this.props.isOne);
                  this.props.changeStart(this.props.isOne, city);
              }}>
                {city}
              </Dropdown.Item>
            : <></> // TODO fix error here with children need "key"
      ))}
        {/* <Dropdown.Item
          onClick={() => {
            this.props.changeStart([8.5500000, 47.3666700], this.props.isOne);  
            this.props.changeCity("Zurich", this.props.isOne);
          }}>
          Zurich
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            this.props.changeStart([-3.7025600, 40.4165000], this.props.isOne);
            this.props.changeCity("Madrid", this.props.isOne);
          }}>
          Madrid
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => {
            this.props.changeStart([-118.243683,34.052235], this.props.isOne);
            this.props.changeCity("Los Angeles", this.props.isOne);
          }}>
          Los Angeles
        </Dropdown.Item> */}
      </Dropdown.Menu>
    );
  }
}
                  
export default Menu;