"use client"

import React, { useState } from 'react';
import Layout from '../../../components/layout'
import Grade6List from './grade6List';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grade6Details from './grade6Details';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Grade6() {
    const [addGrade6, setAddGrade6] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <Layout>
        {addGrade6 ? (
          <div>
            <div className='flex justify-start'>
              <ArrowBackIcon
                className='mr-5 cursor-pointer'
                onClick={() => setAddGrade6(false)}
              />
              <h2 className='font-bold' style={{ marginBottom: '8px' }}>
                Add Stock
              </h2>
            </div>
            <Grade6Details />
          </div>
        ) : (
          <div> 
            <h2 style={{ marginTop:'0px', marginBottom: '20px' }}>
              Grade 6
            </h2>
  
            <div style={{ marginTop:"10px", marginBottom: '8px' }}>
            <Button
                variant='outlined'
                onClick={() => setAddGrade6(true)}
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
                placeholder='Search Grade 6'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Grade6List />
          </div>
        )}
      </Layout>
    );
  }