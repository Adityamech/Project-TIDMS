import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress'; // Added CircularProgress for loading indicator
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { METHODS } from 'http';


export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(true); // Added error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/employee-details');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.'); // Set error state
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  // const editRecord = (row) => {
  //   console.log('Edit record:', row);
  //   // Implement editing functionality here
  // };

  const deleteRecord = async (row: { empId: number }) => {
    try {
      const { empId } = row; // Extract empId from the row object
  
      // Send delete request to the backend to delete the record
      //await axios.delete(`http://localhost:4000/employee-details/${empId}`);
  
      // If the delete request is successful, update the client-side state to reflect the change
      setData(prevData => prevData.filter(item => item.empId !== empId));
  
      console.log('Record deleted successfully.');
    } catch (error) {
      console.error('Error deleting record:', error);
      // Handle error if delete request fails
    }
  };
  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: 70 }}>Date of Joining</TableCell>
              <TableCell align="center" style={{ minWidth: 70 }}>Employee ID</TableCell>
              <TableCell align="center" style={{ minWidth: 70 }}>Name</TableCell>
              <TableCell align="center" style={{ minWidth: 70 }}>Phone Number</TableCell>
              <TableCell align="center" style={{ minWidth: 70 }}>Category</TableCell>
              <TableCell align="center" style={{ minWidth: 70 }}>Salary</TableCell>
              <TableCell align="center" style={{ minWidth: 70 }}>Status</TableCell>
              <TableCell align="center" style={{ minWidth: 70 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={7} align="center">
                  {error ? error : <CircularProgress />}
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.empdate}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.empId}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.fullName}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.phoneNumber}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.category}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.salary}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.status}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
    <div className='flex justify-center'>
        <div className='cursor-pointer #00FF00' onClick={() => editRecord(row)}>
            <EditIcon />
        </div>
        <div className='cursor-pointer #FF0000' onClick={() => deleteRecord(row)}>
            <DeleteIcon />
        </div>
    </div>
</TableCell>

                  </TableRow>
                ))
            )}
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
