import React from 'react';
import {Dropdown} from 'react-bootstrap';

/**
 * This is the Menu component for the start Locations.
 */

interface FuncProps {
  changeStart(points: number[], isOne: boolean): any;
  changeCity(city: string, isOne: boolean): any;
  isOne: boolean;
  startCityList: string[];
}

class Menu extends React.Component <FuncProps> {	

  render() {
    return (
      <Dropdown.Menu>
        {this.props.startCityList.map((city, index) => (
        <Dropdown.Item key={index} onClick={() => {
          this.props.changeStart([8.5500000, 47.3666700], this.props.isOne);  
          this.props.changeCity(city, this.props.isOne);
        }}>
          {city}
        </Dropdown.Item>
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