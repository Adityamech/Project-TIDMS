import axios from 'axios';
import React, { useState } from 'react';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

interface FormData {
    product: string;
    price: number;
    quantity: number;
}

const StockDetails: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        product: '',
        price : '',
        quantity : '',
    });

    const [successMessage, setSuccessMessage] = useState<string>('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        let newValue = value;
        // For the date field, extract only the date portion
        if (id === 'stockDate') {
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
            const response = await axios.post('http://localhost:4000/stock-form', formData);
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



    return (
        <div style={{ width: '50%', margin: '0 auto', padding: '20px', border: '1px solid #ccc', borderRadius: '5px', backgroundColor: '#f9f9f9' }}>
            <h2 style={{ textAlign: 'center' }}>Stock Details</h2>
            {successMessage && <p style={{ textAlign: 'center', color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>

            <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="product">product:</label>
                    <input type="string" placeholder="Enter the product" id="product" value={formData.product} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5'  }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="price">Price</label>
                    <input type="number" placeholder="Enter the price" id="price" value={formData.price} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5'  }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quantity">Quantity:</label>
                    <input type="number" placeholder="Enter the Quantity" id="quantity" value={formData.quantity} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5'  }} />
                </div>
                <div>
                    <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer' }}>Submit</button>
                </div>
            </form>
        </div>
    );
}

export default StockDetails;
