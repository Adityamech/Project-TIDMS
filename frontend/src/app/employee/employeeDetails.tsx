import axios from 'axios';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Snackbar } from '@mui/material';

const EmployeeDetails: React.FC = () => {
    const [formData, setFormData] = useState({
        empDate: '',
        empId: '',
        fullName: '',
        phoneNumber: '',
        category: 'Manager',
        salary: ''
    });

    const [successMessage, setSuccessMessage] = useState('');
    const router = useRouter();
    const [snackbarOpen, setSnackbarOpen] = useState(false);
    



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

    const resetForm = () => {
        setFormData({
            empDate: '',
            empId: '',
            fullName: '',
            phoneNumber: '',
            category: 'Manager',
            salary: ''
        });
    }

    return (
        <div style={{ width: '50%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center' }}>Employee Details</h2>
            {successMessage && <p style={{ textAlign: 'center', color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="empDate" style={{ fontSize: '18px' }}>Date:</label><br />
                    <input type="date" id="empDate" value={formData.empDate} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="empId" style={{ fontSize: '18px' }}>Employee ID:</label><br />
                    <input type="text" placeholder="Enter the employee ID" id="empId" value={formData.empId} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="fullName" style={{ fontSize: '18px' }}>Full Name:</label><br />
                    <input type="text" placeholder="Enter the full name" id="fullName" value={formData.fullName} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="phoneNumber" style={{ fontSize: '18px' }}>Phone Number:</label><br />
                    <input type="number" placeholder="Enter the phone number" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="category" style={{ fontSize: '18px' }}>Category:</label><br />
                    <select id="category" value={formData.category} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }}>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="salary" style={{ fontSize: '18px' }}>Salary:</label><br />
                    <input type="text" placeholder="Enter the salary" id="salary" value={formData.salary} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
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


export default EmployeeDetails;