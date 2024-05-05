"use client"

import React, { useState } from 'react';
import Layout from '../components/layout';
import OrdersDetails from './ordersDetails';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Orders() {
  
  return (
    <Layout>
        <div>
          
          <OrdersDetails />
        </div>
    </Layout>
  );
}