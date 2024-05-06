"use client"
import React, { useState } from "react";
import { Button, Grid, TextField, Box } from "@mui/material";
import axios from 'axios';
import Image from "next/image";

const Login = () => {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [loginError, setLoginError] = useState("");

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/login', {
                mobile: mobile,
                password: password
            });
            console.log("Login response:", response.data);
            if (response.data.redirectUrl) {
                window.location.href = response.data.redirectUrl;
            } 
            else {
            
            }
        } catch (error) {
            console.error('Error logging in:', error);
            setLoginError("Invalid mobile number or password. Please try again.");
        }
    };

    // const BasicTextFields = () => {}
    
    const isSubmitDisabled = !mobile || !password;

    return (
        <Box sx={{ backgroundColor: "#ffffff", minHeight: "100vh" }}>
            <Grid container justifyContent="center" alignItems="center" spacing={2} sx={{ minHeight: "100vh" }}>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ padding: 2, backgroundColor: "#ffffff", maxWidth: 400, margin: "auto"}}>
                        <Grid container justifyContent="center" alignItems="center">
                            <Grid item>
                                <Image
                                    src="/Group.svg"
                                    width={250}
                                    height={50}
                                    alt="logo"
                                    style={{ marginBottom: 10, marginTop:5}}
                                />
                            </Grid>
                        </Grid>

                        <Box
                            component="form"
                            sx={{
                                '& > :not(style)': { m: 1, width: '40ch' },
                            }}
                            noValidate
                            autoComplete="off"
                            >
                            <TextField 
                            id="outlined-basic" 
                            label="Mobile Number" 
                            variant="outlined" 
                            value={mobile}
                            onChange={handleMobileChange}
                            required/>
                            <TextField 
                            id="outlined-basic" 
                            label="Password" 
                            variant="outlined" 
                            value={password}
                            onChange={handlePasswordChange}
                            required />
                        </Box>
                        {/* <TextField
                            label="Mobile"
                            focused
                            placeholder="Enter your mobile number"
                            name="mobile"
                            value={mobile}
                            onChange={handleMobileChange}
                            required
                            size="small"
                            type="text"
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            focused
                            placeholder="Enter your password here"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            required
                            size="small"
                            type="password" 
                            fullWidth
                            margin="normal"
                        /> */}
                        {loginError && <p style={{ color: "red", textAlign: "center" }}>{loginError}</p>}
                        <Button
                            variant="contained"
                            sx={{
                                width: "50%",
                                bgcolor: "green",
                                mt: 3,
                                mb: 2,
                                borderRadius: 5,
                                fontSize: "0.8rem",
                                textAlign: "center",
                                mx: "auto",
                                display: "block",
                                '@media (max-width: 600px)': {
                                width: "50%" 
                                }
                            }}
                            onClick={handleSubmit}
                            disabled={isSubmitDisabled}
                        >
                            Login
                        </Button>
                    </Box>
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box sx={{ position: "relative", paddingTop: "100%" }}>
                        <Image
                            src="/Tea1.jpg"
                            layout="fill"
                            objectFit="cover"
                            alt="main image"
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    );
};

export default Login;