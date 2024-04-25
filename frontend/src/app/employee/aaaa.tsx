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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

const schema = yup.object({
    Date:yup.date().nullable("Please Enter the date"),
    Name: yup.string().required("Please Enter Name"),
    PhoneNumber: yup.number().required("Please Enter Mobile Number"),
    EmpId: yup.number().required("Please Enter Employee Id"),
});


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

        axios.post('http://localhost:4000/employee-form', data)
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
                    <div style={{marginBottom:"15px"}}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker']} {...register("Date")}>
                            <DatePicker label="Joining Date" />
                            </DemoContainer>
                            <p style={{color:"#EF5350"}}>{errors.Date?.message}</p>
                        </LocalizationProvider>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id='empId' label="Employee ID" {...register("EmpId")} variant="outlined" />
                        <p style={{color:"#EF5350"}}>{errors.EmpId?.message}</p>
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id="fullName" label="Full Name" {...register("Name")} variant="outlined" />
                        <p style={{color:"#EF5350"}}>{errors.Name?.message}</p>
                    </div>
                    <div style={{  marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id="phoneNumber" label="Phone Number" {...register("PhoneNumber")} variant="outlined" />
                        <p style={{color:"#EF5350"}}>{errors.PhoneNumber?.message}</p>
                    </div>
                    <div style={{  marginBottom: '15px' }}>
                        <TextField fullWidth size='small' id="address" label="Address" variant="outlined" />
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
