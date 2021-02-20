import React from 'react';
import './style/Main.css';

interface LocationsProps {
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
      <div className="small">
          <p>
            Cheapest Total Price is {this.props.placeholderTotalPrice} EUR
            <br /> Flight Date is {this.props.placeholderDate}
            <br /> You both will fly to {this.props.placeholderDestination}
            <br /> Price from {this.props.placeholderOriginCity1}: {this.props.placeholderPrice1} 
            <br /> Price from {this.props.placeholderOriginCity2}: {this.props.placeholderPrice2}
          </p>
      </div>
    );
  }
}

export default Info;