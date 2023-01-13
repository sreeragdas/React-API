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
  const [order, setOrder] = useState("ASC");
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

  console.log(data, "data");

  const sorting = (sort) => {
    const sorted = [...arrayData].sort((a, b) => {
      for (let i = 0; i < arrayData.length; i++) {
        console.log(b.time.localeCompare(a.timestamp), "++++++++++@@@@@@@@@@@");
      }
    });
    setArrayData(sorted);
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>
              <button>Price</button>
            </TableCell>
            <TableCell>
              <button
                onClick={() => {
                  sorting("time");
                }}
              >
                time
              </button>
            </TableCell>
            <TableCell>
              <button
                onClick={() => {
                  sorting("valid_till");
                }}
              >
                Validtill
              </button>
            </TableCell>
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
  );
};
export default Quotes;
