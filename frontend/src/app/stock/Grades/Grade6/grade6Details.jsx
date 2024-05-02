import React, { useState } from 'react';
import Snackbar from '@mui/material/Snackbar';

const FormPage = () => {
  // State variables to store form data
  const [date, setDate] = useState('');
  const [quantity, setQuantity] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // Function to handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log('Form submitted with:', { date, quantity });
    // Open snackbar on successful form submission
    setSnackbarOpen(true);
    // Reset form fields after submission
    setDate('');
    setQuantity('');
  };

  // Function to handle closing of snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <div style={{ width: '50%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
      <h2 style={{ textAlign: 'center' }}>Grade 6</h2>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        message="Added successfully!"
      />
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="date" style={{ fontSize: '18px' }}>Present Date:</label><br />
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }}
          />
        </div>
        <div style={{ marginBottom: '20px' }}>
          <label htmlFor="quantity" style={{ fontSize: '18px' }}>Quantity:</label><br />
          <input
            type="number"
            id="quantity"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }}
          />
        </div>
        <button
          type="submit"
          style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', fontSize: '18px' }}
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default FormPage;
