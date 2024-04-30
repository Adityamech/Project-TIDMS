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
import { Content } from 'next/font/google';

export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const categoryOptions = ['manager', 'developer', 'tester'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/employee-details');
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
      await axios.put(`http://localhost:4000/employee-details/${editedRow.empId}`, editedRow);
      setIsEditing(false);
      setEditedRow(null);
      console.log('Record edited successfully.');
  
      // Update the data state with the edited row
      setData(prevData => prevData.map(item => (item.empId === editedRow.empId ? editedRow : item)));
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
      const { empId } = row;
      await axios.delete(`http://localhost:4000/employee-details/${empId}`);
      setData(prevData => prevData.filter(item => item.empId !== empId));
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
            <TableContainer sx={{ maxHeight: 1000 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
            <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Date of Joining</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Employee ID</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Name</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Phone Number</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Category</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Salary</TableCell>
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
                      {isEditing && editedRow.empId === row.empId ? (
                        <input
                          type="date"
                          value={editedRow.empdate}
                          onChange={e => handleEditInputChange(e, 'empdate')}
                        />
                      ) : (
                        row.empdate
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.empId}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      {isEditing && editedRow.empId === row.empId ? (
                        <input
                          type="text"
                          value={editedRow.fullName}
                          onChange={e => handleEditInputChange(e, 'fullName')}
                        />
                      ) : (
                        row.fullName
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      {isEditing && editedRow.empId === row.empId ? (
                        <input
                          type="text"
                          value={editedRow.phoneNumber}
                          onChange={e => handleEditInputChange(e, 'phoneNumber')}
                        />
                      ) : (
                        row.phoneNumber
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      {isEditing && editedRow.empId === row.empId ? (
                        <select
                          value={editedRow.category}
                          onChange={e => handleEditInputChange(e, 'category')}
                        >
                          {categoryOptions.map(option => (
                            <option key={option} value={option}>{option}</option>
                          ))}
                        </select>
                      ) : (
                        row.category
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      {isEditing && editedRow.empId === row.empId ? (
                        <input
                          type="number"
                          value={editedRow.salary}
                          onChange={e => handleEditInputChange(e, 'salary')}
                        />
                      ) : (
                        row.salary
                      )}
                    </TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      <div className='flex justify-center'>
                        {isEditing && editedRow.empId === row.empId ? (
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
