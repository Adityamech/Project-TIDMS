'use client';

import React, { useState, useEffect } from 'react';
import Layout from '../components/layout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CountUp from 'react-countup';
import axios from 'axios';

export default function Dashboard() {
  const [totalEmployees, setTotalEmployees] = useState(0);
  const [totalSalary, setTotalSalary] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);

  useEffect(() => {
    // Fetch total number of employees from the server
    fetchTotalEmployees();
    fetchTotalSalary();
    fetchTotalQuantity();
  }, []);

  const fetchTotalEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:4000/total-employees');
      setTotalEmployees(response.data.totalEmployees);
    } catch (error) {
      console.error('Error fetching total employees:', error);
    }
  };

  const fetchTotalSalary = async () => {
    try {
      const response = await axios.get('http://localhost:4000/total-salary');
      setTotalSalary(response.data.totalSalary);
    } catch (error) {
      console.error('Error fetching total salary:', error);
    }
  };


  const fetchTotalQuantity = async () => {
    try {
      const response = await axios.get('http://localhost:4000/total-quantity');
      setTotalQuantity(response.data.totalQuantity);
    } catch (error) {
      console.error('Error fetching total quantity:', error);
    }
  };

  

  return (
    <>
      <Layout>
      <div style={{ padding: '25px' }}>
        <h1 style={{ color: '#354E41', fontSize: '55px', margin: '0' }}>TRIBHUVAN</h1>
        <h3 style={{ color: '#354E41', fontSize: '30px', margin: '0' }}>Tea Industry, Duliajan</h3>
      </div>

      <div style={{ padding: '20px', marginTop: '30px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px', marginTop: '10px' }}>
          <div style={{ backgroundColor: '#f8f8f8', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
              <div style={{ marginLeft: '5px', marginTop: '5px', color: '#d0d0d0' }}>
                <PersonOutlineOutlinedIcon fontSize='small'/>
              </div>
              <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px', paddingBottom: '15px' }}>
                <div style={{ color: '#354E41', fontWeight: 'bold', marginLeft:'-180px' }}>No. of Employee</div>
                <div style={{ fontSize: '25px', fontWeight: 'bold', marginTop: '5px', color: '#588158', marginLeft:'-180px' }}>
                  <CountUp start={0} end={totalEmployees}  />
                </div>
              </div>
            </div>
          </div>
          <div style={{ backgroundColor: '#f8f8f8', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
              <div style={{ marginLeft: '5px', marginTop: '5px', color: '#d0d0d0' }}>
                <PersonOutlineOutlinedIcon fontSize='small'/>
              </div>
              <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px', paddingBottom: '15px' }}>
                <div style={{ color: '#354E41', fontWeight: 'bold', marginLeft:'-180px' }}>Total Salary</div>
                <div style={{ fontSize: '25px', fontWeight: 'bold', marginTop: '5px', color: '#588158', marginLeft:'-180px' }}>
                  <CountUp start={0} end={totalSalary} />
                </div>
              </div>
            </div>
          </div>  
          :
          <div style={{ backgroundColor: '#f8f8f8', borderRadius: '5px', boxShadow: '0px 2px 4px rgba(0,0,0,0.1)', gridColumn: 'span 2' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px' }}>
              <div style={{ marginLeft: '5px', marginTop: '5px', color: '#d0d0d0' }}>
                <CurrencyRupeeOutlinedIcon fontSize='small'/>
              </div>
              <div style={{ paddingLeft: '20px', paddingRight: '20px', paddingTop: '2px', paddingBottom: '15px' }}>
                <div style={{ color: '#354E41', fontWeight: 'bold', marginLeft:'-480px' }}>Total Sales</div>
                <div style={{ fontSize: '25px', fontWeight: 'bold', marginTop: '5px', color: '#588158',marginLeft:'-480px' }}>
                  <CountUp start={0} end={totalQuantity} /> kg
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <img src="tealeaf.png" alt="Your Image" style={{ width: '45%', height: 'auto', marginLeft:'650px', marginTop:'-500px' }} />
      </Layout>
    </>
  );
}
