import React from 'react';
import './Main.css';

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
  // const [placeholderTotalPrice, setPlaceholderTotalPrice] = useState('TBD');
  // const [placeholderPrice1, setPlaceholderPrice1] = useState('TBD');
  // const [placeholderPrice2, setPlaceholderPrice2] = useState('TBD');
  // const [placeholderDate, setPlaceholderDate] = useState('TBD');
  // const [placeholderOriginCity1, setPlaceholderOriginCity1] = useState('TBD');
  // const [placeholderOriginCity2, setPlaceholderOriginCity2] = useState('TBD');
  // const [placeholderDestination, setPlaceholderDestination] = useState('TBD');

  // //! Write the send to server somewhere in Main and write in Python too to receive
  // useEffect(() => {
  //   fetch('/cityPost').then(res => res.json()).then(data => {
  //     setPlaceholderTotalPrice(data.data[0].total_price);
  //     setPlaceholderPrice1(d
  // ata.data[0].price_1);
  //     setPlaceholderPrice2(data.data[0].price_2);
  //     setPlaceholderDate(data.data[0].date_1);
  //     setPlaceholderOriginCity1(data.data[0].origin_city_name_1);
  //     setPlaceholderOriginCity2(data.data[0].origin_city_name_2);
  //     setPlaceholderDestination(data.data[0].dest_city_name_1);
  //   });
  // }, []);
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