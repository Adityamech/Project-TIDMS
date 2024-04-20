"use client"

import React, { useState } from 'react';
import Layout from '../components/layout';
import StockList from './stockList';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StockDetails from './stockDetails';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Employee() {
  const [addStock, setAddStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      {addStock ? (
        <div>
          <div className='flex justify-start'>
            <ArrowBackIcon
              className='mr-5 cursor-pointer'
              onClick={() => setAddStock(false)}
            />
            <h2 className='font-bold' style={{ marginBottom: '8px' }}>
              Add Stock
            </h2>
          </div>
          <StockDetails />
        </div>
      ) : (
        <div>
          <h2 className='font-bold' style={{ marginBottom: '5px' }}>
            Stock
          </h2>

          <div style={{  marginBottom: '8px' }}>
            <input
              style={{ 
                marginRight: "5px",
                border: '1px solid #ccc',
                borderRadius: '5px',
                padding: '10px',
              }}
              type='text'
              placeholder='Search Product'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button
              variant='outlined'
              onClick={() => setAddStock(true)}
              endIcon={<AddCircleIcon />}
              
            >
              Add
            </Button>
          </div>
          <StockList />
        </div>
      )}
    </Layout>
  );
}