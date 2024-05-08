import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Snackbar,TextField } from '@mui/material';




const EmployeeDetails: React.FC = () => {

    const generateEmployeeId = () => {
        const timestamp = Date.now().toString(); // Get current timestamp
        const randomNum = Math.floor(Math.random() * 10000).toString().padStart(4, '0'); // Generate 4-digit random number
        return timestamp + randomNum; // Concatenate timestamp and random number
    };

    const [formData, setFormData] = useState({
        empdate: '',
        empId: generateEmployeeId(),
        fullName: '',
        phoneNumber: '',
        category: 'Manager',
        salary: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    const [phoneNumberError, setPhoneNumberError] = React.useState("");
    



    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        let newValue = value;
        if (id === 'empDate') {
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
            const response = await axios.post('http://localhost:4000/employee-form', formData);
            if (response.status === 200) {
                setSuccessMessage('Employee details added successfully');
                setTimeout(() => {
                    setSuccessMessage('Data Entry successfull');
                    resetForm();
                    window.location.href = '/employeeList'; // Redirect to the home page or any other page
                }, 3000);
            }
        } catch (err) {
            console.error(err);
        }
    }

    const isSubmitDisabled = !formData.fullName || 
    formData.phoneNumber.length !== 10  || 
    !formData.empdate || 
    !formData.salary;

    const resetForm = () => {
        setFormData({
            empdate: '',
            empId: '',
            fullName: '',
            phoneNumber: '',
            category: 'Manager',
            salary: ''
        });
    }

    const validateCustomerNumber = (customerNumber: string) => {
        const isValid = /^\d{10}$/.test(customerNumber);
        if (customerNumber == "" || isValid) {
          setPhoneNumberError("");
          return false;
        } else {
          setPhoneNumberError("Mobile number must be 10 digits long.");
          return true;
        }
      };

    return (
        <div style={{ width: '50%', margin: 'auto', padding: '20px', borderRadius: '5px'}}>
            <h2 style={{ textAlign: 'center' }}>Employee Details</h2>
            {successMessage && <p style={{ textAlign: 'center', color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
            <TextField
                  sx={{ height: "45px", borderRadius: "5px" }}
                  label="Date of Joining"
                  color="success"
                  
                  type='date'
                  focused
                  name="Date of Joining"
                  size="small"
                  value={formData.empdate}
                  required
                  onChange={(e) => {
                   
                    setFormData({ ...formData, empdate: e.target.value });
                  }}
                  fullWidth
                  margin="normal"

                />
                
                <TextField
                  sx={{ height: "45px", borderRadius: "5px" }}
                  label="Name"
                  color="success"
                  placeholder="Enter name"
                  focused
                  name="Customer Name"
                  size="small"
                  value={formData.fullName}
                  required
                  onChange={(e) => {
                   
                    setFormData({ ...formData, fullName: e.target.value });
                  }}
                  fullWidth
                  margin="normal"

                />
                <TextField
                  sx={{ height: "65px", borderRadius: "5px" }}
                  label="Phone Number"
                  color="success"
                  type='number'
                  placeholder="Enter Mobile No"
                  focused
                  name="Customer Number"
                  size="small"
                  value={formData.phoneNumber}
                  required
                  onChange={(e) => {
                    const phoneNumber = e.target.value;
                    validateCustomerNumber(phoneNumber);
                    setFormData({ ...formData, phoneNumber: e.target.value });
                  }}
                  fullWidth
                  margin="normal"
                  error={!!phoneNumberError}
                  helperText={phoneNumberError}
                />
                 <TextField
    sx={{height: "50px", borderRadius: "5px"}}
        id="category"
        select
        label="Designation"
        value={formData.category}
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
        <option value="Manager">Manager</option>
        <option value="Assistant Manager">Assistant Manager</option>
        <option value="Operator">Operator</option>
        <option value="Labour">Labour</option>

    </TextField>
    <TextField
                  sx={{ height: "45px", borderRadius: "5px" }}
                  label="Salary"
                  color="success"
                  type='number'
                  placeholder="Salary"
                  focused
                  name="Salary"
                  size="small"
                  value={formData.salary}
                  required
                  onChange={(e) => {
                   
                    setFormData({ ...formData, salary: e.target.value });
                  }}
                  fullWidth
                  margin="normal"

                />
                <button type="submit" style={{ width: '30%',marginLeft:'35%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor:  isSubmitDisabled ? '#ccc' : '#007bff', color: '#fff', cursor: 'pointer', fontSize: '18px' }} 
                  disabled={isSubmitDisabled}
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


export default EmployeeDetails;