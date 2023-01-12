import { useLocation } from "react-router";
import axios from "axios";
import React, { useState } from "react";
const Quotes = () => {
  const { state } = useLocation();
  console.log(state, "=-=-=-=");
  const [symbol, SetSymbol] = useState(state);
  const [arrayData , setArrayData]=useState([])
  const [data, setData] = useState([]);
  console.log(typeof symbol);
  const getData = () => {
    axios
      .get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
      .then((res) => {
        setData(res.data);
      });
  };

  if(data.payload){
    console.log(data.payload)
  console.log(Object.entries(data.payload)[0][1][0].price, "key===");
  }
  
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
