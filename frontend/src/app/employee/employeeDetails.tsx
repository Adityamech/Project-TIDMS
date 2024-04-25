import axios from 'axios';
import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface FormData {
    empDate: string;
    empId: string;
    fullName: string;
    phoneNumber: string;
    category: string;
    salary: string;
}

const EmployeeDetails: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        empDate: '',
        empId: '',
        fullName: '',
        phoneNumber: '',
        category: 'Manager', // Default value
        salary: ''
    });

    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        let newValue = value;
        // For the date field, extract only the date portion
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
    
    

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/employee-form', formData);
            if (response.status === 200) {
                setSuccessMessage('Employee details added successfully');
                setTimeout(() => {
                    setSuccessMessage('');
                    resetForm();
                }, 3000); // Reset form after 3 seconds
            }
            console.log("Data added successfully")
        } catch (err) {
            console.log(err)
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
        <div style={{ width: '50%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Employee Details</h2>
            {successMessage && <p style={{ textAlign: 'center', color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
            <label htmlFor="empdate">Date:</label>
            <input type="date" id="empdate" value={formData.date} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="empId">Employee ID:</label>
                    <input type="text" placeholder="Enter the employee ID" id="empId" value={formData.empId} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="fullName">Full Name:</label>
                    <input type="text" placeholder="Enter the full name" id="fullName" value={formData.fullName} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="phoneNumber">Phone Number:</label>
                    <input type="text" placeholder="Enter the phone number" id="phoneNumber" value={formData.phoneNumber} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="Manager">Manager</option>
                        <option value="Developer">Developer</option>
                        <option value="Tester">Tester</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="salary">Salary:</label>
                    <input type="text" placeholder="Enter the salary" id="salary" value={formData.salary} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default EmployeeDetails;
