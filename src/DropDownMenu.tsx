import React from 'react';
import {Dropdown} from 'react-bootstrap';

/**
 * This is the Menu component for the start Locations.
 */

interface FuncProps {
  changeStart(isOne: boolean, city: string): any;
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
                  //TODO problem is here: UNTIL the cityCoords update first, then changeStart() work
                  this.props.changeStart(this.props.isOne, city);
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