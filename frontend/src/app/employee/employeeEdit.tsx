import React, { useState } from 'react';
import axios from 'axios';

const EmployeeEdit = () => {
    const [formData, setFormData] = useState({
        id: 'employee_id', // Provide the ID of the employee you want to edit
        empdate: 'updated_date',
        empId: 'updated_id',
        fullName: 'updated_name',
        phoneNumber: 'updated_phone',
        category: 'updated_category',
        salary: 'updated_salary'
    });

    const handleEdit = async () => {
        try {
            const response = await axios.put('http://localhost:4000/employee-edit/employee/' + formData.id, formData);
            console.log('Edit successful:', response.data);
            // Handle success, update UI, show message, etc.
        } catch (error) {
            console.error('Error editing employee:', error);
            // Handle error, show error message, etc.
        }
    };

    return (
        <div>
            {/* UI elements for editing employee data */}
            <button onClick={handleEdit}>Edit Employee</button>
        </div>
    );
};

export default EmployeeEdit;
