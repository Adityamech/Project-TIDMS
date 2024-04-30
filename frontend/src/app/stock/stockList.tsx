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

interface Row {
  product: string;
  price: number;
  quantity: number;
}

export default function StickyHeadTable(): JSX.Element {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState<Row[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedRow, setEditedRow] = useState<Row | null>(null);

  useEffect(() => {
    fetchData();
  }, []);


    const fetchData = async () => {
      try {
        const response = await axios.get<Row[]>('http://localhost:4000/stock-details');
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
        setLoading(false);
      }
    };


  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const editRecord = (row: Row) => {
    setIsEditing(true);
    setEditedRow(row);
  };

  const saveEditedRecord = async () => {
    try {
      if (editedRow) {
        await axios.put(`http://localhost:4000/stock-details/${editedRow.product}`, editedRow);
        setIsEditing(false);
        setEditedRow(null);
        console.log('Record edited successfully.');
        fetchData(); // Fetch updated data
      }
    } catch (error) {
      console.error('Error editing record:', error);
    }
  };

  const cancelEdit = () => {
    setIsEditing(false);
    setEditedRow(null);
  };

  const deleteRecord = async (row: Row) => {
    try {
      const { product } = row;
      await axios.delete(`http://localhost:4000/stock-details/${product}`);

      setData(prevData => prevData.filter(item => item.product !== product));

      console.log('Record deleted successfully.');
    } catch (error) {
      console.error('Error deleting record:', error);
    }
  };

  const handleEditInputChange = (e: React.ChangeEvent<HTMLInputElement>, columnName: string) => {
    if (editedRow) {
      setEditedRow({ ...editedRow, [columnName]: e.target.value });
    }
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
                <TableCell colSpan={4} align="center">
                  {error ? error : <CircularProgress />}
                </TableCell>
              </TableRow>
            ) : (
              data
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => (
                  <TableRow hover role="checkbox" tabIndex={-1} key={index}>
                    <TableCell align="center" style={{ minWidth: 70 }}>{row.product}</TableCell>
                    <TableCell align="center" style={{ minWidth: 70 }}>
                      {isEditing && editedRow?.product === row.product ? (
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
                      {isEditing && editedRow?.product === row.product ? (
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
                        {isEditing && editedRow?.product === row.product ? (
                          <>
                            <button onClick={saveEditedRecord}>Save</button>
                            <button onClick={cancelEdit}>Cancel</button>
                          </>
                        ) : (
                          <>
                            <div className='cursor-pointer edit-button' onClick={() => editRecord(row)}>
                              <EditIcon />
                            </div>
                            <div className='cursor-pointer delete-button' onClick={() => deleteRecord(row)}>
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
