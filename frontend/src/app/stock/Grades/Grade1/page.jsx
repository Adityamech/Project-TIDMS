"use client"

import React, { useState } from 'react';
import Layout from '../../../components/layout'
import Grade1List from './grade1List';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Grade1Details from './grade1Details';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Grade1() {
    const [addGrade1, setAddGrade1] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
  
    return (
      <Layout>
        {addGrade1 ? (
          <div>
            <div className='flex justify-start'>
              <ArrowBackIcon
                className='mr-5 cursor-pointer'
                onClick={() => setAddGrade1(false)}
              />
              <h2 className='font-bold' style={{ marginBottom: '8px' }}>
                Add Stock
              </h2>
            </div>
            <Grade1Details />
          </div>
        ) : (
          <div> 
            <h2 style={{ marginTop:'0px', marginBottom: '20px' }}>
              Grade 1
            </h2>
  
            <div style={{ marginTop:"10px", marginBottom: '8px' }}>
            <Button
                variant='outlined'
                onClick={() => setAddGrade1(true)}
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
                placeholder='Search Grade1'
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Grade1List />
          </div>
        )}
      </Layout>
    );
  }