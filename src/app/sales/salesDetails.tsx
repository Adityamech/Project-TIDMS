import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface FormData {
  Date: number;
  Product: string;
}

const schema = yup.object({
  Date: yup.number().required('Please Enter the Date'),
  Product: yup.string().required('Select the Product'),
}).required();

export default function StockDetails() {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>({
    resolver: yupResolver(schema),
  });

  const [product, setProduct] = useState<string>('');

  const handleChange = (event: SelectChangeEvent) => {
    setProduct(event.target.value as string);
  };

  const onSubmit = (data: FormData) => {
    console.log(data);

    axios.post('/api/sales', data)
      .then(response => {
        console.log('Data', response.data);
        toast.success('Saved', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
        reset(); 
      })
      .catch(err => {
        console.log('Error', err);
        toast.error('Error saving data', {
          position: 'top-right',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: 'light',
        });
      });
  };

  return (
    <>
      <ToastContainer />

      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <div style={{ marginBottom: '15px' }}>
            <TextField fullWidth size='small' id="date" label="Date" {...register('Date')} variant="outlined" />
            <p className=''>{errors.Date?.message}</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <FormControl fullWidth>
              <InputLabel id="product-label">Product Category</InputLabel>
              <Select
                labelId="product-label"
                value={product}
                label='Product Category'
                size='small'
                onChange={handleChange}
              >
                <MenuItem value={"High Quality Tea"}>High Quality Tea</MenuItem>
                <MenuItem value={"Fresh Tea"}>Fresh Tea</MenuItem>
                <MenuItem value={"Normal Tea"}>Normal Tea</MenuItem>
                <MenuItem value={"Green Tea"}>Green Tea</MenuItem>
              </Select>
            </FormControl>
            <p>{errors.Product?.message}</p>
          </div>
          <div style={{ marginBottom: '15px' }}>
            <TextField fullWidth size='small' id="price" label="Price (kg/gm)" variant="outlined" />
          </div>
          <div style={{ marginBottom: '15px' }}>
            <TextField fullWidth size='small' id="quantity" label="Quantity" variant="outlined" />
          </div>
        </div>
        <div>
          <Button type="submit" variant="outlined" style={{ marginTop: '4px' }} >
            Save
          </Button>
        </div>
      </form>
    </>
  )
}
