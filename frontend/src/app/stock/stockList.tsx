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
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/stock-details');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
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

  const editRecord = row => {
    setIsEditing(true);
    setEditedRow(row);
  };

  const saveEditedRecord = async () => {
    try {
      // Send a PUT request to update the edited row
      await axios.put(`http://localhost:4000/stock-details/${editedRow.product}`, editedRow);
      setIsEditing(false);
      setEditedRow(null);
      console.log('Record edited successfully.');
  
      // Update the data state with the edited row
      setData(prevData => prevData.map(item => (item.product === editedRow.product ? editedRow : item)));
    } catch (error) {
      console.error('Error editing record:', error);
      // Handle error if edit request fails
    }
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
    setEditedRow(null);
  };

  const deleteRecord = async row => {
    try {
      const { product } = row;
      await axios.delete(`http://localhost:4000/stock-details/${product}`);
      setData(prevData => prevData.filter(item => item.product !== product));
      console.log('Record deleted successfully.');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleEditInputChange = (e, columnName) => {
    setEditedRow({ ...editedRow, [columnName]: e.target.value });
  };

  

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
            <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Product</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Price</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Quantity</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Actions</TableCell>
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
                    
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      {isEditing && editedRow.product === row.product ? (
                        <input
                          type="text"
                          value={editedRow.product}
                          onChange={e => handleEditInputChange(e, 'product')}
                        />
                      ) : (
                        row.product
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      {isEditing && editedRow.product === row.product ? (
                        <input
                          type="text"
                          value={editedRow.price}
                          onChange={e => handleEditInputChange(e, 'price')}
                        />
                      ) : (
                        row.price
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      {isEditing && editedRow.product === row.product ? (
                        <input
                          type="number"
                          value={editedRow.quantity}
                          onChange={e => handleEditInputChange(e, 'quantity')}
                        />
                      ) : (
                        row.quantity
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      <div className='flex justify-center'>
                        {isEditing && editedRow.product === row.product ? (
                          <>
                            <button onClick={saveEditedRecord}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <div className='cursor-pointer #00FF00' onClick={() => editRecord(row)}>
                              <EditIcon />
                            </div>
                            <div className='cursor-pointer #FF0000' onClick={() => deleteRecord(row)}>
                              <DeleteIcon />
                            </div>
                          </>
                        )}
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
