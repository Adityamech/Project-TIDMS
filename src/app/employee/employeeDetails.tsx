import { useState } from 'react';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import { Button } from '@mui/material';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

const schema = yup.object({
    Name: yup.string().required("Please Enter Name"),
    PhoneNumber: yup.string().required("Please Enter Mobile Number"),
}).required();


export default function EmployeeDetails() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    const [Category, setCategory] = useState('Employee');

    const handleChange = (event: SelectChangeEvent) => {
        setCategory(event.target.value as string);
    };

    const onSubmit = (data:any) => {
        console.log(data);

        axios.post('/api/employee', data)
            .then(response => {
                console.log('Data', response.data);
                
                toast.success('Saved', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            })
            .catch(err => {
                console.log('Error', err);
                // Handle error here
                toast.error('Error saving data', {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "light",
                });
            });
    };

    return (
        <>
            <ToastContainer />

            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                <div style={{  marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id="outlined-basic" label="Joining Date" variant="outlined" />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id="outlined-basic" label="Full Name" {...register("Name")} variant="outlined" />
                        <p className=''>{errors.Name?.message}</p>
                    </div>
                    <div style={{  marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id="outlined-basic" label="Phone Number" {...register("PhoneNumber")} variant="outlined" />
                        <p>{errors.PhoneNumber?.message}</p>
                    </div>
                    <div style={{  marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id="outlined-basic" label="Address" variant="outlined" />
                    </div>
                    <div style={{  marginBottom: '15px' }}>
                        
                        <FormControl fullWidth>
                            <InputLabel>Category</InputLabel>
                            <Select
                                value={Category}
                                label="Category"
                                size='small'
                                onChange={handleChange}
                            >
                                <MenuItem value={"Manager"}>Manager</MenuItem>
                                <MenuItem value={"Worker"}>Worker</MenuItem>
                                <MenuItem value={"Labour"}>Labour</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{  marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id="outlined-basic" label="Salary" variant="outlined" />
                    </div>
                    
                </div>
                <div className=''>
                    <Button type="submit" variant="outlined" style={{ marginBottom: "6px" }} >
                        Save
                    </Button>
                </div>
            </form>
        </>
    )
}
