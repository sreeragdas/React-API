import { useLocation } from "react-router";
import axios from "axios";
import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
const Quotes = () => {
  const { state } = useLocation();
  console.log(state, "=-=-=-=");
  const [symbol, SetSymbol] = useState(state);
  const [arrayData, setArrayData] = useState([]);
  const [data, setData] = useState([]);
  console.log(typeof symbol);
  const getData = () => {
    axios
      .get(`https://prototype.sbulltech.com/api/v2/quotes/${symbol}`)
      .then((res) => {
        setData(res.data);
      });
  };

  if (data.payload) {
    console.log(data.payload, "data.payload");
    console.log(Object.entries(data.payload)[0][1], "=-=-=-=-arar");
  }

  React.useEffect(() => {
    getData();
  }, []);

  React.useEffect(() => {
    if (data.payload) {
      setArrayData(Object.entries(data.payload)[0][1]);
    }
  }, [data]);
  return (
    //   <div>
    //     <div>
    //  {
    //    arrayData.map((item , index)=>{
    //      return(
    //        <div>
    //          <div>{item.price}</div>
    //          <div>{item.time}</div>
    //          <div>{item.price}</div>
    //          </div>
    //      );
    //    })
    //  }
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Price</TableCell>
            <TableCell>time</TableCell>
            <TableCell>Validtill</TableCell>

          </TableRow>
        </TableHead>
        <TableBody>
         
              <TableCell component="th" scope="row">
                {/* {row.name} */}
              </TableCell>
              {arrayData.map((item, index) => {
                return (
                  <TableRow>
                    <TableCell align="right">{item.price}</TableCell>
                    <TableCell align="right">{item.time}</TableCell>
                    <TableCell align="right">{item.valid_till}</TableCell>
                  </TableRow>
                );
              })}
           
      
        </TableBody>
      </Table>
    </TableContainer>

    //   </div>
    // </div>
  );
};
export default Quotes;
