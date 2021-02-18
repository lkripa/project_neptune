import React, { useState, useEffect } from 'react';
import './Main.css';

function Info() {
  const [placeholderTotalPrice, setPlaceholderTotalPrice] = useState('TBD');
  const [placeholderPrice1, setPlaceholderPrice1] = useState('TBD');
  const [placeholderPrice2, setPlaceholderPrice2] = useState('TBD');
  const [placeholderDate, setPlaceholderDate] = useState('TBD');
  const [placeholderOriginCity1, setPlaceholderOriginCity1] = useState('TBD');
  const [placeholderOriginCity2, setPlaceholderOriginCity2] = useState('TBD');
  const [placeholderDestination, setPlaceholderDestination] = useState('TBD');

  useEffect(() => {
    fetch('/hello').then(res => res.json()).then(data => {
      setPlaceholderTotalPrice(data.data[0].total_price);
      setPlaceholderPrice1(data.data[0].price_1);
      setPlaceholderPrice2(data.data[0].price_2);
      setPlaceholderDate(data.data[0].date_1);
      setPlaceholderOriginCity1(data.data[0].origin_city_name_1);
      setPlaceholderOriginCity2(data.data[0].origin_city_name_2);
      setPlaceholderDestination(data.data[0].dest_city_name_1);
    });
  }, []);

  return (
    <div className="small">
        <p>
          Cheapest Total Price is {placeholderTotalPrice} EUR
          <br /> Flight Date is {placeholderDate}
          <br /> You both will fly to {placeholderDestination}
          <br /> Price from {placeholderOriginCity1}: {placeholderPrice1} 
          <br /> Price from {placeholderOriginCity2}: {placeholderPrice2}
        </p>
    </div>
  );
}

export default Info;