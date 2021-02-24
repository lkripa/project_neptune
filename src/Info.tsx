import React from 'react';
import './style/Main.css';

/**
 * This is the Info component for the flight information details of the cheapest flight.
 */

interface LocationsProps {
  info: string;
  placeholderTotalPrice: string;
  placeholderPrice1: string;
  placeholderPrice2: string;
  placeholderDate: string;
  placeholderOriginCity1: string;
  placeholderOriginCity2: string;
  placeholderDestination: string;
}

class Info extends React.Component <LocationsProps> {

  render() {
    return (
      <div className={this.props.info}>
          <p>
            <b><u>Cheapest Total Price is {this.props.placeholderTotalPrice} EUR</u></b>
            <br /> Flight Date is {this.props.placeholderDate}
            <br /> You both will fly to {this.props.placeholderDestination} : One-Way
            <br /> Price from {this.props.placeholderOriginCity1}: {this.props.placeholderPrice1} 
            <br /> Price from {this.props.placeholderOriginCity2}: {this.props.placeholderPrice2}
          </p>
      </div>
    );
  }
}

export default Info;