import React from 'react';
import '../style/Main.css';

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
  placeholderAirline1: string;
  placeholderAirline2: string;
}

class Info extends React.Component <LocationsProps> {

  render() {
    return (
      <div className={this.props.info}>
          <p>
            <b><u>Cheapest Total Price is {this.props.placeholderTotalPrice} EUR : One-Way</u></b>
            {/* <br /> You both will fly to {this.props.placeholderDestination} */}
            <br /> Price from {this.props.placeholderOriginCity1} to {this.props.placeholderDestination}: {this.props.placeholderPrice1} EUR on {this.props.placeholderAirline1}
            <br /> Price from {this.props.placeholderOriginCity2} to {this.props.placeholderDestination}: {this.props.placeholderPrice2} EUR on {this.props.placeholderAirline2}
            <br /> Flight Date is {this.props.placeholderDate}
          </p>
          <b>Click on the destination city to view more dates!</b>
      </div>
    );
  }
}

export default Info;