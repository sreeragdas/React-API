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
    console.log(data.payload , 'data.payload')
console.log ( Object.entries(data.payload)[0][1], '=-=-=-=-arar')

  }

  React.useEffect(() => {
    getData();
   
  }, []);

  React.useEffect(()=>{
    if(data.payload){
      setArrayData(Object.entries(data.payload)[0][1])
      }
  },[data])
  return (
    <div>
      <div>
   {
     arrayData.map((item , index)=>{
       return(
         <div>
           <div>{item.price}</div>
           <div>{item.time}</div>
           <div>{item.price}</div>
           </div>
       );
     })
   }
  
  
      </div>
    </div>
  );
};
export default Quotes;
