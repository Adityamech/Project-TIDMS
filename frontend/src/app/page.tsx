'use client'
import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography, IconButton, InputAdornment } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";
import axios from 'axios';
import { url } from "inspector";

const Login = () => {
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleMobileChange = (e) => {
        setMobile(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:4000/login-details', {
                mobile: mobile,
                password: password
            });
            // Handle response as needed
            console.log("Login response:", response.data);
        } catch (error) {
            // Handle error
            console.error('Error logging in:', error);
        }
    };

    const isSubmitDisabled = !mobile || !password;

    return (
      <Grid
      container
      justifyContent="flex-end"
      alignItems="center"
      
      sx={{ 
          height: "97.5vh",
          width : "100%",
          backgroundColor: "#CFDEB1",
          backgroundImage: "/Group.svg", // Assuming loginimg.jpg is the name of your image
          backgroundSize: "100%100%",
          backgroundPosition: "center",
      }}
  >
            <Grid item>
            <Paper elevation={3} style={{ padding: 20, maxWidth: 340, marginRight: 50, backgroundColor: "CFDEB1" }}>
                    <Grid>
                        <Image
                            src="/Group.svg"
                            width={175}
                            height={50}
                            alt="first image"
                            style={{ marginLeft: "60px", marginBottom: "5px", marginTop: "10px" }}
                        />
                        
                    </Grid>

                    <TextField
                        sx={{ height: "35px", marginTop: "15px" }}
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
                        sx={{ height: "35px", marginTop: "15px" }}
                        label="Password"
                        focused
                        placeholder="Enter your password here"
                        name="password"
                        value={password}
                        onChange={handlePasswordChange}
                        required
                        size="small"
                        type={showPassword ? "text" : "password"} // Toggle password visibility
                        fullWidth
                        margin="normal"
                        InputProps={{
                            endAdornment: (
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleTogglePasswordVisibility}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            ),
                        }}
                    />

                    <Button
                        variant="contained"
                        sx={{ width: "40%", backgroundColor: "green", marginTop: "30px", marginBottom: "20px", borderRadius: "20px", marginLeft: "30%" }}
                        onClick={handleSubmit}
                        disabled={isSubmitDisabled}
                    > Login</Button>
                </Paper>
            </Grid>
        </Grid>
    );
};

export default Login;