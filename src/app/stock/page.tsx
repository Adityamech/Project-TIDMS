"use client"

import {useState} from 'react';
import Layout from '../components/layout';
import StockList from './stockList';
import Button from '@mui/material/Button';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import StockDetails from './stockDetails';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function Stock(){
  const[addStock, setAddStock] = useState(false);


  return (
    <>
    <Layout>
      <>
      {addStock ? (
          <div>
            <div className='flex justify-start'>
            <ArrowBackIcon className='mr-5 cursor-pointer'
            onClick={() => setAddStock(false)}/>
            <h2 className='font-bold' style={{ marginBottom: "8px"}}>Add Stock</h2>
            
          </div>
         <StockDetails />
        </div>
      ) : (
        <div>
          <div className='flex justify-between'>
            <h2 className='font-bold' style={{ marginBottom: "8px"}}>Stock</h2>
              
              <Button variant="outlined" onClick={() => setAddStock(true)} style={{  marginBottom: "6px" }} endIcon={<AddCircleIcon />} >
              Add
              </Button>
          </div>
        < StockList/>
        </div>
      )
      }

      </>
     </Layout>
    </>
  )
}




