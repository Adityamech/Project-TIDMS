import axios from 'axios';
import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface FormData {
    orderDate: string;
    productId: string;
    category: string;
    price: string;
    quantity: string;
}

const OrdersDetails: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        orderDate: '',
        productId: '',
        category: 'Class 1',
        price: '',
        quantity: '', // Default value
    });

    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        let newValue = value;
        // For the date field, extract only the date portion
        if (id === 'orderDate') {
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
            const response = await axios.post('http://localhost:4000/orders-form', formData);
            if (response.status === 200) {
                setSuccessMessage('Orders details added successfully');
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
            orderDate: '',
            productId: '',
            category: 'Class 1',
            price: '',
            quantity: '', 
        });
    }

    return (
        <div style={{ width: '50%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ textAlign: 'center' }}>Order Details</h2>
            {successMessage && <p style={{ textAlign: 'center', color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: '20px' }}>
            <label htmlFor="orderDate">Date:</label>
            <input type="date" id="empdate" value={formData.orderDate} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
        </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="productId">Product ID:</label>
                    <input type="text" placeholder="Enter the product ID" id="productId" value={formData.productId} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="category">Category:</label>
                    <select id="category" value={formData.category} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }}>
                        <option value="Manager">Class 1</option>
                        <option value="Developer">Class 2</option>
                        <option value="Tester">Class 3</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="Price">Price:</label>
                    <input type="text" placeholder="Enter the Price" id="price" value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quantity">quantity:</label>
                    <input type="text" placeholder="Enter the quantity" id="quantity" value={formData.quantity} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc' }} />
                </div>
                <div>
                    <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default OrdersDetails;
