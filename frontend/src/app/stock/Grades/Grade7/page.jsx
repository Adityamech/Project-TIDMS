"use client"

import React, { useState } from 'react';
import Layout from '../../../components/layout'
import Grade7List from './grade7List';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grade7Details from './grade7Details';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Grade7() {
    const [addGrade7, setAddGrade7] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <Layout>
        {addGrade7 ? (
          <div>
            <div className='flex justify-start'>
              <ArrowBackIcon
                className='mr-5 cursor-pointer'
                onClick={() => setAddGrade7(false)}
              />
              <h2 className='font-bold' style={{ marginBottom: '8px' }}>
                Add Stock
              </h2>
            </div>
            <Grade7Details />
          </div>
        ) : (
          <div> 
            <h2 style={{ marginTop:'0px', marginBottom: '20px' }}>
              Grade 7
            </h2>
  
            <div style={{ marginTop:"10px", marginBottom: '8px' }}>
            <Button
                variant='outlined'
                onClick={() => setAddGrade7(true)}
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
                placeholder='Search Grade 7'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Grade7List />
          </div>
        )}
      </Layout>
    );
  }