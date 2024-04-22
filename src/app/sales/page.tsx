"use client"

import React, { useState } from 'react';
import Layout from '../components/layout';
import SalesList from './salesList';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import SalesDetails from './salesDetails';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Employee() {
  const [addSales, setAddSales] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      {addSales ? (
        <div>
          <div className='flex justify-start'>
            <ArrowBackIcon
              className='mr-5 cursor-pointer'
              onClick={() => setAddSales(false)}
            />
            <h2 className='font-bold' style={{ marginBottom: '8px' }}>
              Add Sale
            </h2>
          </div>
          <SalesDetails />
        </div>
      ) : (
        <div>
          <h2 style={{ marginTop:'0px', marginBottom: '20px' }}>
            Sales
          </h2>

          <div style={{ marginTop:"10px", marginBottom: '8px' }}>
          <Button
              variant='outlined'
              onClick={() => setAddSales(true)}
              endIcon={<AddCircleIcon />}
              style={{marginRight:"5px"}}
            >
              Add
            </Button>
            <input
              style={{ 
                marginRight: "5px",
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
              }}
              type='text'
              placeholder='Search'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <SalesList />
        </div>
      )}
    </Layout>
  );
}