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
            <h2 className='font-bold' style={{ marginBottom: '8px' }}>
              Add Employee
            </h2>
          </div>
          <EmployeeDetails />
        </div>
      ) : (
        <div>
          <h2 className='font-bold' style={{ marginBottom: '8px' }}>
            Employee
          </h2>

          <div className='flex justify-between'>
            <input
              type='text'
              placeholder='Search Employee'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ marginBottom: '5px', marginTop: '-20px', border: '1px solid #ccc', borderRadius: '4px' }}
            />

            <Button
              className='flex justify-between'
              variant='outlined'
              onClick={() => setAddEmployee(true)}
              style={{ marginBottom: '6px' }}
              endIcon={<AddCircleIcon />}
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
