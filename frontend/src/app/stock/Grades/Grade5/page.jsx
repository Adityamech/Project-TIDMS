"use client"

import React, { useState } from 'react';
import Layout from '../../../components/layout'
import Grade5List from './Grade5List';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grade5Details from './Grade5Details';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Grade5() {
    const [addGrade5, setAddGrade5] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <Layout>
        {addGrade5 ? (
          <div>
            <div className='flex justify-start'>
              <ArrowBackIcon
                className='mr-5 cursor-pointer'
                onClick={() => setAddGrade5(false)}
              />
              <h2 className='font-bold' style={{ marginBottom: '8px' }}>
                Add Stock
              </h2>
            </div>
            <Grade5Details />
          </div>
        ) : (
          <div> 
            <h2 style={{ marginTop:'0px', marginBottom: '20px' }}>
              Grade 5
            </h2>
  
            <div style={{ marginTop:"10px", marginBottom: '8px' }}>
            <Button
                variant='outlined'
                onClick={() => setAddGrade5(true)}
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
                placeholder='Search Grade 5'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Grade5List />
          </div>
        )}
      </Layout>
    );
  }