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
          
          
          
          <SalesList />
        </div>
      
    </Layout>
  );
}
