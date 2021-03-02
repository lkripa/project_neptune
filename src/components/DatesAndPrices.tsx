import React from 'react';
import '../style/Main.css';
import Button from 'react-bootstrap/Button'

/**
 * This is the List of Dates component for popup modal of all the dates and prices.
 */


interface FuncProps {
  listOfDates: { date: string, totalPrice: string}[],
  changeDate(date: string): any;
}

class DatesAndPrices extends React.Component <FuncProps> {	

  render() {
    return (
      <div className="scroll">
        <ul className="no-bullets">
        {this.props.listOfDates.map((elem, index) => (
          <li key={index}>
            <Button 
              variant="link" 
              onClick={() => {
                console.log(elem.date);
                this.props.changeDate(elem.date);
              }}
            >
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