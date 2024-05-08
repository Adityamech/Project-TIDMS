"use client"

import React, { useState } from 'react';
import Layout from '../components/layout';
import EmployeeList from './employeeList';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import EmployeeDetails from './employeeDetails';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Employee() {
  const [addEmployee, setAddEmployee] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <Layout>
      {addEmployee ? (
        <div>
          <div className='flex justify-start'>
            <ArrowBackIcon
              className='mr-5 cursor-pointer'
              onClick={() => setAddEmployee(false)}
            />
            
          </div>
          <EmployeeDetails />
        </div>
      ) : (
        <div> 
          

          <div style={{ marginTop:"10px", marginBottom: '8px' }}>
          <Button
              variant='outlined'
              onClick={() => setAddEmployee(true)}
              endIcon={<AddCircleIcon />}
              style={{marginRight:"5px"}}
            >
              Add
            </Button>
            
          </div>
          <EmployeeList />
        </div>
      )}
    </Layout>
  );
}