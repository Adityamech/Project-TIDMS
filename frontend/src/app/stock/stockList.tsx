import React, {useState, useEffect} from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import axios from "axios";
import EditIcon from '@mui/icons-material/Edit';
import { format, formatDistance, formatRelative, subDays } from 'date-fns'


export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setloading] = useState(true);


  useEffect(() => {
    getData();
  },[]);

  const getData = () => {
    axios.get('/api/users')
      .then(response => {
        console.log('Data', response);
        setData(response.data);
        setloading(false);
    })
    .catch(err => {
      console.log('Error', err);
    })
  }


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editRecord = (row: React.ChangeEvent<HTMLInputElement>) => {
      console.log('Row', row);
  };

//const date = (row: React.ChangeEvent<HTMLInputElement>) => {
// console.log('Row', row);};

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell
                  align="center"
                  style={{ minWidth: 70 }}
                >
                  Serial No.
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 70 }}
                >
                  Date
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 70 }}
                >
                  Product
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 70 }}
                >
                  Price(kg/gm)
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 70 }}
                >
                  Quantity
                </TableCell>
                <TableCell
                  align="center"
                  style={{ minWidth: 70 }}
                >
                  Total Price
                </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row, index) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row}>
                        <TableCell key={index} align="right">
                          (row.serial_no.)
                        </TableCell>
                        <TableCell key={index} align="right">
                          (row.date)
                        </TableCell>
                        <TableCell key={index} align="right">
                          (row.product)
                        </TableCell>
                        <TableCell key={index} align="right">
                          (row.price(kg/gm))
                        </TableCell>
                        <TableCell key={index} align="right">
                          (row.quantity)
                        </TableCell>
                        <TableCell key={index} align="right">
                          (row.total_price)
                        </TableCell>
                        <TableCell key={index} align="right">
                          <div className='flex justify-center'>
                            <div className='cursor-pointer #00FF00' onClick={()=>editRecord(row)}>
                              <EditIcon />
                            </div>
                           
                          </div>
                        </TableCell>
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
