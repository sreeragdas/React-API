import React from "react";
import { BrowserRouter as Router, Link, Routes, Route } from "react-router-dom";
import Quotes from "../screens/quotes/Quotes";
import Stock from "../screens/stock/Stock";


function RoutesMain() {
  return (
    <div>
       
      <Routes>
      <Route path="/"  element={<Stock />}></Route>
        <Route exact path="/stock" element={<stock />} />
  
        <Route exact path="/quotes" element={<Quotes/>}/>
   
        
      </Routes>
    </div>
  );
}
export default RoutesMain;
