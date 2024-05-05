'use client'

import React from 'react';
import Layout from '../components/layout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CountUp from 'react-countup';

export default function Dashboard() {
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
                  <CountUp start={0} end={150} delay={1} />
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
                  <CountUp start={0} end={150000} delay={1} />
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
                  <CountUp start={0} end={200000} delay={1} />
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
