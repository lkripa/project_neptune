import React from 'react';
import '../style/Main.css';
import Button from 'react-bootstrap/Button'

/**
 * This is the List of Dates component for popup modal of all the dates and prices.
 */


interface FuncProps {
  listOfDates: { date: string, totalPrice: string}[],
}

class DatesAndPrices extends React.Component <FuncProps> {	

  render() {
    return (
      <div className="scroll">
        <ul className="no-bullets">
        {this.props.listOfDates.map(elem => (
          <li>
            <Button variant="link">
            Date: {elem.date} Total Price from {elem.totalPrice}
            </Button>
          </li>
        ))}
        </ul>
      </div>
    );
  }
}

export default DatesAndPrices;