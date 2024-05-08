import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import EditIcon from '@mui/icons-material/Edit';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import { saveAs } from 'file-saver'; // for file download
import * as XLSX from 'xlsx'; // for Excel manipulation


export default function StickyHeadTable() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState(null);
  const categoryOptions = ['Pending', 'Delivered'];
  const category2Options = ['Pending', 'Paid'];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:4000/orders-details');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError("Error fetching data. Please try again later.");
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
      await axios.put(`http://localhost:4000/orders-details/${editedRow.ordersId}`, editedRow);
      setIsEditing(false);
      setEditedRow(null);
      console.log('Record edited successfully.');
  
      // Update the data state with the edited row
      setData(prevData => prevData.map(item => (item.ordersId === editedRow.ordersId ? editedRow : item)));
    } catch (error) {
      console.error('Error editing record:', error);
      // Handle error if edit request fails
    }
  };
  
  const cancelEdit = () => {
    setIsEditing(false);
    setEditedRow(null);
  };

  const confirmDelete = (row) => {
    if (window.confirm("Are you sure you want to delete this record?")) {
      deleteRecord(row);
    }
  };

  const deleteRecord = async row => {
    try {
      const { ordersId } = row;
      await axios.delete(`http://localhost:4000/orders-details/${ordersId}`);
      setData(prevData => prevData.filter(item => item.ordersId !== ordersId));
      console.log('Record deleted successfully.');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleEditInputChange = (e, columnName) => {
    setEditedRow({ ...editedRow, [columnName]: e.target.value });
  };

  const exportToExcel = () => {
    // Remove _id and __v fields from data
    const cleanedData = data.map(({ _id, __v, ...rest }) => rest);
  
    const worksheet = XLSX.utils.json_to_sheet(cleanedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Orders');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    saveAs(new Blob([excelBuffer], { type: 'application/octet-stream' }), 'orders.xlsx');
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden',marginTop:'25px' }}>
      <div style={{ textAlign: 'right', margin: '10px' }}>
        <button onClick={exportToExcel}>Export to Excel</button>
      </div>
      <TableContainer sx={{ maxHeight: "78vh" }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Date of order</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Customer Name</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Phone Number</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Product Name</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Quantity</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Advance</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Balance</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Payment Status</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Delivery status</TableCell>
              <TableCell align="center" style={{ minWidth: 70, fontWeight: 'bold', backgroundColor: '#CFDEB1' }}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={10} align="center">
                  {error ? error : <CircularProgress />}
                </TableCell>
              </TableRow>
            ) : (
              [...data]
                
                .reverse()
                .map((row, index) => {
                  const pendingFields = [row.paymentStatus, row.deliveryStatus].filter(status => status === 'Pending');
                  const rowBackgroundColor = pendingFields.length === 1 ? '#FFFFCC' : (pendingFields.length > 1 ? '#FFCCCC' : '#CCFFCC');
                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={index}
                      style={{ backgroundColor: rowBackgroundColor }}
                    >
                      <TableCell align="center" style={{ minWidth: 70 }}>
                        {row.date}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: 70 }}>{row.customerName}</TableCell>
                      <TableCell align="center" style={{ minWidth: 70 }}>
                        {isEditing && editedRow.ordersId === row.ordersId ? (
                          <input
                            type="text"
                            value={editedRow.customerNumber}
                            onChange={e => handleEditInputChange(e, 'customerNumber')}
                          />
                        ) : (
                          row.customerNumber
                        )}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: 70 }}>{row.productName}</TableCell>
                      <TableCell align="center" style={{ minWidth: 70 }}>
                        {isEditing && editedRow.ordersId === row.ordersId ? (
                          <input
                            type="text"
                            value={editedRow.quantity}
                            onChange={e => handleEditInputChange(e, 'quantity')}
                          />
                        ) : (
                          row.quantity
                        )}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: 70 }}>
                        {isEditing && editedRow.ordersId === row.ordersId ? (
                          <input
                            type="number"
                            value={editedRow.advance}
                            onChange={e => handleEditInputChange(e, 'advance')}
                          />
                        ) : (
                          row.advance
                        )}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: 70 }}>
                        {isEditing && editedRow.ordersId === row.ordersId ? (
                          <input
                            type="number"
                            value={editedRow.price}
                            onChange={e => handleEditInputChange(e, 'price')}
                          />
                        ) : (
                          row.price
                        )}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: 70 }}>
                        {isEditing && editedRow.ordersId === row.ordersId ? (
                          <select
                            value={editedRow.paymentStatus}
                            onChange={e => handleEditInputChange(e, 'paymentStatus')}
                          >
                            {category2Options.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          row.paymentStatus
                        )}
                      </TableCell>
                      <TableCell align="center" style={{ minWidth: 70 }}>
                        {isEditing && editedRow.ordersId === row.ordersId ? (
                          <select
                            value={editedRow.deliveryStatus}
                            onChange={e => handleEditInputChange(e, 'deliveryStatus')}
                          >
                            {categoryOptions.map(option => (
                              <option key={option} value={option}>{option}</option>
                            ))}
                          </select>
                        ) : (
                          row.deliveryStatus
                        )}
                      </TableCell>
                      
                      <TableCell align="center" style={{ minWidth: 70 }}>
                        <div className='flex justify-center'>
                          {isEditing && editedRow.ordersId === row.ordersId ? (
                            <>
                              <button onClick={saveEditedRecord}>Save</button>
                              <button onClick={cancelEdit}>Cancel</button>
                            </>
                          ) : (
                            <>
                              <div className='cursor-pointer #00FF00' onClick={() => editRecord(row)}>
                                <EditIcon />
                              </div>
                              <div className="flex justify-center">
                <div
                  className="cursor-pointer #FF0000"
                  onClick={() => confirmDelete(row)}
                >
                  <DeleteIcon />
                </div>
              </div>
                            </>
                          )}
                        </div>
                      </TableCell>
                    </TableRow>
                  );
                })
            )}
          </TableBody>
        </Table>
      </TableContainer>
      {/* <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      /> */}
    </Paper>
  );
}
