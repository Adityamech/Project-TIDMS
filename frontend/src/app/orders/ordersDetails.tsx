import axios from 'axios';
import React, { useState } from 'react';

const OrdersDetails: React.FC = () => {
    const [formData, setFormData] = useState({
        orderDate: '',
        productId: '',
        category: 'Class 1',
        price: '',
        quantity: '',
    });

    const [successMessage, setSuccessMessage] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { id, value } = e.target;
        let newValue = value;
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
                }, 3000);
            }
        } catch (err) {
            console.error(err);
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
        <div>
            <h2>Order Details</h2>
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="orderDate" style={{ fontSize: '18px' }}>Date:</label><br />
                    <input type="date" id="orderDate" value={formData.orderDate} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="productId" style={{ fontSize: '18px' }}>Product ID:</label><br />
                    <input type="text" placeholder="Enter the product ID" id="productId" value={formData.productId} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="category" style={{ fontSize: '18px' }}>Category:</label><br />
                    <select id="category" value={formData.category} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }}>
                        <option value="Class 1">Class 1</option>
                        <option value="Class 2">Class 2</option>
                        <option value="Class 3">Class 3</option>
                    </select>
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="price" style={{ fontSize: '18px' }}>Price:</label><br />
                    <input type="text" placeholder="Enter the Price" id="price" value={formData.price} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="quantity" style={{ fontSize: '18px' }}>Quantity:</label><br />
                    <input type="text" placeholder="Enter the quantity" id="quantity" value={formData.quantity} onChange={handleChange} style={{ fontSize: '16px', width: '100%', padding: '10px', borderRadius: '5px', border: '1px solid #ccc', backgroundColor: '#f5f5f5' }} />
                </div>
                <button type="submit" style={{ width: '100%', padding: '10px', borderRadius: '5px', border: 'none', backgroundColor: '#007bff', color: '#fff', cursor: 'pointer', fontSize: '18px' }}>Submit</button>
            </form>
        </div>
    );
}

export default OrdersDetails;
