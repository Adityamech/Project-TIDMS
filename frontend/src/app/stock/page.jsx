"use client"

import React, { useState } from 'react';
import Layout from '../components/layout';
import StockList from './stockList';


export default function Stock() {
  
  return (
    <Layout>
        <div>
          
          <StockList />
        </div>
    </Layout>
  );
}