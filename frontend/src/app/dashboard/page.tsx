'use client'
import React from 'react';
import Layout from '../components/layout';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import SpaOutlinedIcon from '@mui/icons-material/SpaOutlined';
import CurrencyRupeeOutlinedIcon from '@mui/icons-material/CurrencyRupeeOutlined';
import CountUp from 'react-countup';

export default function (){
  return (
    <>
    <Layout>
    <h2 style={{ color:'#354E41', marginTop:'-5px', marginBottom: '25px' }}>Admin Dashboard</h2>
      
      <div> 
      <h3 style={{ marginLeft:'5px', marginTop:'-10px', marginBottom: '5px', color:'#354E41'}}>Employee</h3>
        <div style = {{display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)',gap: '20px',}}>
          <div style={{gridColumn: 'span 1',}}>
            <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'#f8f8f8', borderRadius:'10px', boxShadow:'0px 2px 4px rgba(0,0,0,0.1)',}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft:'30px', marginTop:'20px', color:'#d0d0d0'}}>
                  <PersonOutlineOutlinedIcon fontSize='medium'/>
                </div>
              </div>  
              <div style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'2px', paddingBottom:'20px'}}>
                <div style={{color:'#354E41', fontWeight:'bold'}}>No. of Employee</div>
                <div style={{ fontSize:'35px', fontWeight:'bold', marginTop:'8px', color:'#588158'}}>
                  <CountUp start={0} end={150} delay={1} />
                </div>
              </div>    
            </div>
          </div>
          <div style={{gridColumn: 'span 1',}}>
            <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'#f8f8f8', borderRadius:'10px', boxShadow:'0px 2px 4px rgba(0,0,0,0.1)',}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft:'30px', marginTop:'20px', color:'#d0d0d0'}}>
                  <PersonOutlineOutlinedIcon fontSize='medium'/>
                </div>
              </div>  
              <div style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'2px', paddingBottom:'20px'}}>
                <div style={{color:'#354E41', fontWeight:'bold'}}>Present Today</div>
                <div style={{ fontSize:'35px', fontWeight:'bold', marginTop:'8px', color:'#588158'}}>
                  <CountUp start={0} end={125} delay={1} />
                </div>
              </div>    
            </div>
          </div>
          <div style={{gridColumn: 'span 1',}}>
            <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'#f8f8f8', borderRadius:'10px', boxShadow:'0px 2px 4px rgba(0,0,0,0.1)',}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft:'30px', marginTop:'20px', color:'#d0d0d0'}}>
                  <PersonOutlineOutlinedIcon fontSize='medium'/>
                </div>
              </div>  
              <div style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'2px', paddingBottom:'20px'}}>
                <div style={{color:'#354E41', fontWeight:'bold'}}>Total Salary / Month</div>
                <div style={{ fontSize:'35px', fontWeight:'bold', marginTop:'8px', color:'#588158'}}>
                  <CountUp start={0} end={150000} delay={1} />
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div> 

      <div> 
      <h3 style={{ marginLeft:'5px', marginTop:'20px', marginBottom: '5px', color:'#354E41'}}>Stock</h3>
        <div style = {{display: 'grid',gridTemplateColumns: 'repeat(2, 1fr)',gap: '20px',}}>
          <div style={{gridColumn: 'span 1',}}>
            <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'#f8f8f8', borderRadius:'10px', boxShadow:'0px 2px 4px rgba(0,0,0,0.1)',}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft:'30px', marginTop:'20px', color:'#d0d0d0'}}>
                  <SpaOutlinedIcon fontSize='medium'/>
                </div>
              </div>  
              <div style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'2px', paddingBottom:'20px'}}>
                <div style={{color:'#354E41', fontWeight:'bold'}}>Raw Materials</div>
                <div style={{ fontSize:'35px', fontWeight:'bold', marginTop:'8px', color:'#588158'}}>
                  <CountUp start={0} end={500} delay={1} />
                   Kg
                </div>
              </div>    
            </div>
          </div>
          <div style={{gridColumn: 'span 1',}}>
            <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'#f8f8f8', borderRadius:'10px', boxShadow:'0px 2px 4px rgba(0,0,0,0.1)',}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft:'30px', marginTop:'20px', color:'#d0d0d0'}}>
                  <SpaOutlinedIcon fontSize='medium'/>
                </div>
              </div>  
              <div style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'2px', paddingBottom:'20px'}}>
                <div style={{color:'#354E41', fontWeight:'bold'}}>Packages</div>
                <div style={{ fontSize:'35px', fontWeight:'bold', marginTop:'8px', color:'#588158'}}>
                  <CountUp start={0} end={250} delay={1} />
                   Pack
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div> 

      <div> 
      <h3 style={{ marginLeft:'5px', marginTop:'20px', marginBottom: '5px', color:'#354E41'}}>Sales</h3>
        <div style = {{display: 'grid',gridTemplateColumns: 'repeat(3, 1fr)',gap: '20px',}}>
          <div style={{gridColumn: 'span 1',}}>
            <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'#f8f8f8', borderRadius:'10px', boxShadow:'0px 2px 4px rgba(0,0,0,0.1)',}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft:'30px', marginTop:'20px', color:'#d0d0d0'}}>
                  <SpaOutlinedIcon fontSize='medium'/>
                </div>
              </div>  
              <div style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'2px', paddingBottom:'20px'}}>
                <div style={{color:'#354E41', fontWeight:'bold'}}>Raw Materials</div>
                <div style={{ fontSize:'35px', fontWeight:'bold', marginTop:'8px', color:'#588158'}}>
                  <CountUp start={0} end={1200} delay={1} />
                  Kg
                </div>
              </div>    
            </div>
          </div>
          <div style={{gridColumn: 'span 1',}}>
            <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'#f8f8f8', borderRadius:'10px', boxShadow:'0px 2px 4px rgba(0,0,0,0.1)',}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft:'30px', marginTop:'20px', color:'#d0d0d0'}}>
                  <SpaOutlinedIcon fontSize='medium'/>
                </div>
              </div>  
              <div style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'2px', paddingBottom:'20px'}}>
                <div style={{color:'#354E41', fontWeight:'bold'}}>Packages</div>
                <div style={{ fontSize:'35px', fontWeight:'bold', marginTop:'8px', color:'#588158'}}>
                  <CountUp start={0} end={750} delay={1} />
                  Pack
                </div>
              </div>    
            </div>
          </div>
          <div style={{gridColumn: 'span 1',}}>
            <div style={{marginLeft:'auto', marginRight:'auto', backgroundColor:'#f8f8f8', borderRadius:'10px', boxShadow:'0px 2px 4px rgba(0,0,0,0.1)',}}>
              <div style={{display:'flex', justifyContent:'space-between'}}>
                <div style={{ marginLeft:'30px', marginTop:'20px', color:'#d0d0d0'}}>
                  <CurrencyRupeeOutlinedIcon fontSize='medium'/>
                </div>
              </div>  
              <div style={{paddingLeft:'30px', paddingRight:'30px', paddingTop:'2px', paddingBottom:'20px'}}>
                <div style={{color:'#354E41', fontWeight:'bold'}}>Total Sales / Month</div>
                <div style={{ fontSize:'35px', fontWeight:'bold', marginTop:'8px', color:'#588158'}}>
                  <CountUp start={0} end={200000} delay={1} />
                </div>
              </div>    
            </div>
          </div>
        </div>
      </div> 
    </Layout>
    </>
  );
}

