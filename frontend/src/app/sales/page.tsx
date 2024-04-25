"use client"

import React, { useState } from 'react';
import Layout from '../components/layout';
import SalesList from '../sales/salesList'; 
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OrdersDetails from '../orders/ordersDetails';

export default function Sales() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
        <div>
          <h2 style={{ marginTop:'0px', marginBottom: '20px' }}>
            Sales
          </h2>
          <div style={{ marginTop:"10px", marginBottom: '8px' }}>
            <input
              style={{ 
                marginRight: "5px",
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
              }}
              type='text'
              placeholder='Search Orders'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <SalesList />
        </div>
      
    </Layout>
  );
}
