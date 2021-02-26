import React from 'react';
import { Dropdown } from 'react-bootstrap';

/**
 * This is the Menu component for the start Locations.
 */

 // TODO: Update dropdown menu to sematic ui

interface FuncProps {
  changeStart(isOne: boolean, city: string): any;
  callAPI(): any;
  isOne: boolean;
  startCityList: string[];
  inputValue: string;
  
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
                  this.props.changeStart(this.props.isOne, city)
                  this.props.callAPI()
                }}>
                {city}
              </Dropdown.Item>
            : <></> // TODO fix error here with children need "key"
      ))}
      </Dropdown.Menu>
    );
  }
}
                  
export default Menu;