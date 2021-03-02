import React from 'react';
import '../style/Main.css';

/**
 * This is the Modal Info component for the flight information details of the date chosen displayed on the modal.
 */

interface LocationsProps {
  // info: string;
  // placeholderTotalPrice: string;
  // placeholderPrice1: string;
  // placeholderPrice2: string;
  placeholderDate: string;
  placeholderOriginCity1: string;
  placeholderOriginCity2: string;
  placeholderDestination: string;
  // placeholderAirline1: string;
  // placeholderAirline2: string;
  fullList: any[]; 
  changeDate(date: string): any;
}

class ModalInfo extends React.Component <LocationsProps> {

  render() {
    return (
      <div className="font-color scroll">
        Flight Date is {this.props.placeholderDate}
        {this.props.fullList.map((elem, index) =>   
          this.props.placeholderDate === elem.date_1
            ?
              <p key={index}>
                <br /><b><u>Total Price is {elem.total_price} EUR : One-Way</u></b>

                <br /> Price from {this.props.placeholderOriginCity1} to {this.props.placeholderDestination}: {elem.price_1} EUR 
                  on {elem.carrier_1}

                <br /> Price from {this.props.placeholderOriginCity2} to {this.props.placeholderDestination}: {elem.price_2} EUR 
                  on {elem.carrier_2}
              </p>
            : <></>
        )}
      </div>
    );
  }
}

export default ModalInfo;