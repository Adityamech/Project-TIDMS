import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Snackbar,TextField } from '@mui/material';


const OrdersDetails: React.FC = () => {

    const generateOrderId = () => {
        const timestamp = Date.now().toString(); // Get current timestamp
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate 4-digit random number
        return timestamp + randomNum; // Concatenate timestamp and random number
    };

    const currentDate = new Date().toISOString().split('T')[0];

    const [formData, setFormData] = useState({
        date: currentDate,
        ordersId: generateOrderId(),
        customerName: '',
        customerNumber : '',
        productName: 'Grade 1',
        quantity : '',
        advance: '',
        price: '',
        paymentStatus:'Pending',
        deliveryStatus:'Pending'

    });


    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [customerNumberError, setCustomerNumberError] = React.useState("");



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
            const response = await axios.post('http://localhost:4000/orders-form', formData);
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
    const isSubmitDisabled = !formData.customerName || 
                        formData.customerNumber.length !== 10  || 
                        !formData.quantity || 
                        !formData.advance || 
                        !formData.price;



    const resetForm = () => {
        setFormData({
            date: new Date().toISOString().split('T')[0], 
            ordersId: generateOrderId(),
            customerName: '',
            customerNumber : '',
            productName: 'Grade 1',
            quantity : '',
            advance: '',
            price: '',
            paymentStatus:'Pending',
            deliveryStatus:'Pending'
        });
    }

    const validateCustomerNumber = (customerNumber: string) => {
        const isValid = /^\d{10}$/.test(customerNumber);
        if (customerNumber == "" || isValid) {
          setCustomerNumberError("");
          return false;
        } else {
          setCustomerNumberError("Mobile number must be 10 digits long.");
          return true;
        }
      };

   
    return (
        <div style={{ width: '50%', margin: 'auto', padding: '20px', borderRadius: '0px' }}>
            <h2 style={{ textAlign: 'center' }}>Order Details</h2>
            {successMessage && <p style={{ textAlign: 'center', color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                
            <TextField
                  sx={{ height: "45px", borderRadius: "5px" }}
                  label="Customer Name"
                  color="success"
                  placeholder="Enter customer name"
                  focused
                  name="Customer Name"
                  size="small"
                  value={formData.customerName}
                  required
                  onChange={(e) => {
                   
                    setFormData({ ...formData, customerName: e.target.value });
                  }}
                  fullWidth
                  margin="normal"

                />
                <TextField
                  sx={{ height: "65px", borderRadius: "5px" }}
                  label="Customer Number"
                  color="success"
                  type='number'
                  placeholder="Enter customer phone number"
                  focused
                  name="Customer Number"
                  size="small"
                  value={formData.customerNumber}
                  required
                  onChange={(e) => {
                    const customerNumber = e.target.value;
                    validateCustomerNumber(customerNumber);
                    setFormData({ ...formData, customerNumber: e.target.value });
                  }}
                  fullWidth
                  margin="normal"
                  error={!!customerNumberError}
                  helperText={customerNumberError}
                />
               
    <TextField
    sx={{height: "50px", borderRadius: "5px"}}
        id="productName"
        select
        label="Product Name"
        value={formData.productName}
        onChange={handleChange}
        fullWidth
        variant="outlined"
        size="small"
        style={{ marginBottom: '20px' }}
        InputProps={{
            style: { fontSize: '15px', padding: '10px', borderRadius: '5px', backgroundColor: '#f5f5f5' }
        }}
        SelectProps={{
            native: true
        }}
    >
        <option value="Grade 1">Grade 1</option>
        <option value="Grade 2">Grade 2</option>
        <option value="Grade 3">Grade 3</option>
        <option value="Grade 4">Grade 4</option>
        <option value="Grade 5">Grade 5</option>
        <option value="Grade 6">Grade 6</option>
        <option value="Grade 7">Grade 7</option>
        <option value="Green Tea">Green Tea</option>
    </TextField>

<TextField
                  sx={{ height: "45px", borderRadius: "5px" }}
                  label="Quantity"
                  color="success"
                  placeholder="Enter Quantity"
                  type='number'
                  focused
                  name="Quantity"
                  size="small"
                  value={formData.quantity}
                  required
                  onChange={(e) => {
                   
                    setFormData({ ...formData, quantity: e.target.value });
                  }}
                  fullWidth
                  margin="normal"

                />
                <TextField
                  sx={{ height: "45px", borderRadius: "5px" }}
                  label="Advance"
                  color="success"
                  placeholder="Advance paid"
                  type='number'
                  focused
                  name="Advance"
                  size="small"
                  value={formData.advance}
                  required
                  onChange={(e) => {
                   
                    setFormData({ ...formData, advance: e.target.value });
                  }}
                  fullWidth
                  margin="normal"

                />
                <TextField
                  sx={{ height: "45px", borderRadius: "5px" }}
                  label="Balance"
                  color="success"
                  placeholder="Balance to be paid"
                  type='number'
                  focused
                  name="Balance"
                  size="small"
                  value={formData.price}
                  required
                  onChange={(e) => {
                   
                    setFormData({ ...formData, price: e.target.value });
                  }}
                  fullWidth
                  margin="normal"

                />
                
                <button type="submit" style={{ width: '30%', marginLeft:"35%", padding: '10px', borderRadius: '5px', border: 'none',  backgroundColor: isSubmitDisabled ? '#ccc' : '#007bff', color: '#fff', cursor: 'pointer', fontSize: '18px' }} 
                  disabled={isSubmitDisabled}
                  onClick={() => {
                    handleButtonClick();
                    router.push('/sales');
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


export default OrdersDetails;