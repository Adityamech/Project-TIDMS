"use client"

import React, { useState } from 'react';
import Layout from '../components/layout';
import StockList from './stockList';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StockDetails from './stockDetails';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Stock() {
  const [addStock, setAddStock] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      <div style={{ backgroundColor: '#f5f5f5', padding: '20px', borderRadius: '5px' }}>
      {addStock ? (
        <div>
          <div className='flex justify-start'>
            <ArrowBackIcon
              className='mr-5 cursor-pointer'
              onClick={() => setAddStock(false)}
            />
            <h2 style={{ marginBottom: '8px' }}>
              Add Stock
            </h2>
          </div>
          <StockDetails />
        </div>
      ) : (
        <div>
          <h2 style={{ marginTop:'0px', marginBottom: '20px' }}>
            Stock
          </h2>

          <div style={{ marginTop:"10px", marginBottom: '8px' }}>
          <Button
              variant='outlined'
              onClick={() => setAddStock(true)}
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
              placeholder='Search Product'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <StockList />
        </div>
      )}
      </div>
    </Layout>
  );
}