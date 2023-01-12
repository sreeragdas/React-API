import { useLocation } from "react-router";
import axios from "axios";
import React, { useState } from "react";
const Quotes = () => {
  const { state } = useLocation();
  console.log(state, "=-=-=-=");
  const [symbol, SetSymbol] = useState(state);
  const [data, setData] = useState([]);
  console.log(typeof symbol);
  const getData = () => {
    axios
      .get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
      .then((res) => {
        setData(res.data);
      });
  };
  console.log(typeof data.payload, "data===");
  
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div>
      <div>
   
      </div>
    </div>
  );
};
export default Quotes;
