import * as React from "react";
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useNavigate } from "react-router";
import axios from "axios";
const  Stock = ()=> {
  const [data, setData] = React.useState([]);
  const [csvArray, setCsvArray] = React.useState([]);
  const [symbol , setSymbol ] =React.useState("");
const [name , setName]=React.useState("");
const [sector , setSector]=React.useState("");
const [validtill , setValidtill]=React.useState("");
  
  const getData = () => {
  
    axios
      .get(`https://prototype.sbulltech.com/api/v2/instruments`)
      .then((res) => {
        processCSV(res.data);
       
      });
    
  };
  React.useEffect(() => {
  
    getData();

  }, []);


  const processCSV = (str, delim = ",") => {
    const headers = str.slice(0, str.indexOf("\n")).split(delim);
    const rows = str.slice(str.indexOf("\n") + 1).split("\n");

    const newArray = rows.map((row) => {
      const values = row.split(delim);
      const eachObject = headers.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    setCsvArray(newArray);
  };
  console.log(csvArray, "-----------");
  console.log(typeof csvArray);

  const rowsHead = Object.entries(csvArray);
  const rows = Object.values(csvArray);
 
  console.log(rowsHead);
  const navigate = useNavigate();
 
  return (

    <TableContainer component={Paper}>
    <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>symbol</TableCell>
          <TableCell>name</TableCell>
          <TableCell >sector</TableCell>
          <TableCell>validtill</TableCell>
    
        </TableRow>
      </TableHead>
      <TableBody>
        {rows.map((row) => (
          <TableRow
            key={row.name}
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
          >
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            {rows.map((item, index) => {
         return (
           <TableRow>
           <TableCell align="right" onClick={()=>{ navigate("/quotes", { state: item.Symbol })}}>{item.Symbol}</TableCell> 
             <TableCell align="right">{item.Name}</TableCell>
            <TableCell align="right">{item.Sector}</TableCell>
            <TableCell align="right">{item.Validtill}</TableCell> 
               </TableRow>
       );
       })}
       

          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}
export default Stock;