import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Snackbar } from '@mui/material';


const Grade4Details: React.FC = () => {

    const generateStockId = () => {
        const timestamp = Date.now().toString(); // Get current timestamp
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate 4-digit random number
        return timestamp + randomNum; // Concatenate timestamp and random number
    };

    const currentDate = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({

        stockId: generateStockId(),
        stockDate: currentDate,
        quantity : '',

    });



    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        let newValue = value;
        if (id === 'date') {
            const date = new Date(value);
            if (!isNaN(date.getTime())) {
                newValue = date.toISOString().split('T')[0];
            }
        }
        setFormData({
            ...formData,
            [id]: newValue
        });
        
    }
    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
      };
      const handleButtonClick = () => {
        // Your form submission logic here
        // For demonstration purposes, I'm just setting the snackbar to open
        setSnackbarOpen(true);
      };
    
    
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/grade4-form', formData);
            if (response.status === 200) {
                setSuccessMessage('orders details added successfully');
                setTimeout(() => {
                    setSuccessMessage('Data Entry successfull');
                    resetForm();
                    window.location.href = '/ordersList'; // Redirect to the home page or any other page
                }, 3000);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const resetForm = () => {
        setFormData({
          stockId: generateStockId(),
          stockDate: currentDate,
          quantity : '',
        });
    }

    return (
      <div style={{ width: '50%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '0px', backgroundColor: '#f9f9f9' }}>
          <h2 style={{ textAlign: 'center' }}>Order Details</h2>
          {successMessage && <p style={{ textAlign: 'center', color: 'green' }}>{successMessage}</p>}
          <form onSubmit={handleSubmit}>
              <div style={{ marginBottom: '20px' }}>
                  <label htmlFor="quantity" style={{ fontSize: '18px' }}>Quantity:</label><br />
                  <input type="text" placeholder="Enter the Quantity" id="quantity" value={formData.quantity} onChange={handleChange} style={{ fontSize:'15px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
              </div>
              {/* <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', fontSize: '18px' }} onClick={handleButtonClick}>Submit</button> */}
              <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', fontSize: '18px' }} 
                  onClick={() => {
                    handleButtonClick();
                    window.location.reload();
                }}>Submit</button>     
          </form>
          <Snackbar
              open={snackbarOpen}
              autoHideDuration={6000}
              onClose={handleSnackbarClose}
              message="Form submitted successfully!"
          />
      </div>
  );
}

export default Grade4Details;