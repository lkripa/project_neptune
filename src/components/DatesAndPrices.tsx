import React from 'react';
import '../style/Main.css';
import Button from 'react-bootstrap/Button'

/**
 * This is the List of Dates component for popup modal of all the dates and prices.
 */

// TODO: use the date as two states 1. Boolean: to change what is presented on the Modal 2. Date info to be shown in modal

interface FuncProps {
  listOfDates: { date: string, totalPrice: string}[],
}

class DatesAndPrices extends React.Component <FuncProps> {	

  render() {
    return (
      <div className="scroll">
        <ul className="no-bullets">
        {this.props.listOfDates.map((elem, index) => (
          <li key={index}>
            <Button variant="link" onClick={() => console.log(elem.date)}>
              Total Price from {elem.totalPrice} EUR on <b>{elem.date}</b>
            </Button>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default DatesAndPrices;