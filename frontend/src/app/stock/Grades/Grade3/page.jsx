"use client"

import React, { useState } from 'react';
import Layout from '../../../components/layout'
import Grade3List from './grade3List';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grade3Details from './grade3Details';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Grade3() {
    const [addGrade3, setAddGrade3] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <Layout>
        {addGrade3 ? (
          <div>
            <div className='flex justify-start'>
              <ArrowBackIcon
                className='mr-5 cursor-pointer'
                onClick={() => setAddGrade3(false)}
              />
              <h2 className='font-bold' style={{ marginBottom: '8px' }}>
                Add Stock
              </h2>
            </div>
            <Grade3Details />
          </div>
        ) : (
          <div> 
            <h2 style={{ marginTop:'0px', marginBottom: '20px' }}>
              Grade 3
            </h2>
  
            <div style={{ marginTop:"10px", marginBottom: '8px' }}>
            <Button
                variant='outlined'
                onClick={() => setAddGrade3(true)}
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
                placeholder='Search Grade 3'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Grade3List />
          </div>
        )}
      </Layout>
    );
  }