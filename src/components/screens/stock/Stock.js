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
import Fuse from 'fuse.js';
const  Stock = ()=> {
const [query , setQuery] = React.useState("");
  const [csvArray, setCsvArray] = React.useState([]);
const [searchData , setSearchData] = React.useState([]);
  const [filterVal ,setFilterVal] = React.useState('');
  const getData = () => {
  
    axios
      .get(`https://prototype.sbulltech.com/api/v2/instruments`)
      .then((res) => {
        setSearchData(res.data)
        processCSV(res.data);
       
      });

  };
  React.useEffect(() => {
  
    getData();

  }, []);
console.log(searchData , 'seachdatatatata==-=-=-')

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
    setSearchData(csvArray)

  };



  const rows = Object.values(csvArray);
 

  const navigate = useNavigate();

console.log(searchData,'data')
console.log( csvArray, 'csvsvsvsvsv')

  const fuse = new Fuse(csvArray , {
    keys:[
      'Name',
      'Symbol'
    ]
  })
const result = fuse.search(query)
console.log(result , 'result ++++++++++++++++++++++++++++++++++++++++++++++')
const csvArrayResult = result.map(result =>result.item)

const handleSearch = ({currentTarget={}}) =>{
  const {value} = currentTarget;
  setQuery(value)


}
  return (
<div>
  <input placeholder="Search.." type="text" value={query} onChange={handleSearch}  />
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
        
            <TableCell component="th" scope="row">
     
            </TableCell>
            
        {
          query ? csvArrayResult.map((item, index) => {
         
        
            return (
              <TableRow>
              <TableCell align="right" onClick={()=>{ navigate("/quotes", { state: item.Symbol })}}>{item.Symbol}</TableCell> 
                <TableCell align="right">{item.Name}</TableCell>
              
               <TableCell align="right">{item.Sector}</TableCell>
               <TableCell align="right">{item.Validtill}</TableCell> 
                  </TableRow>
          );
          }) : csvArray.map((item, index) => {
         
        
            return (
              <TableRow>
              <TableCell align="right" onClick={()=>{ navigate("/quotes", { state: item.Symbol })}}>{item.Symbol}</TableCell> 
                <TableCell align="right">{item.Name}</TableCell>
              
               <TableCell align="right">{item.Sector}</TableCell>
               <TableCell align="right">{item.Validtill}</TableCell> 
                  </TableRow>
          );
          })
        }

           {/* {csvArrayResult.map((item, index) => {
         
        
         return (
           <TableRow>
           <TableCell align="right" onClick={()=>{ navigate("/quotes", { state: item.Symbol })}}>{item.Symbol}</TableCell> 
             <TableCell align="right">{item.Name}</TableCell>
           
            <TableCell align="right">{item.Sector}</TableCell>
            <TableCell align="right">{item.Validtill}</TableCell> 
               </TableRow>
       );
       })}  */}
       

    
    
      </TableBody>
    </Table>
  </TableContainer>
  </div>
  );
}
export default Stock;