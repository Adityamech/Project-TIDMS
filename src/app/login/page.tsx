"use client"
import React, { useState } from "react";
import { Button, Grid, Paper, TextField, Typography,IconButton } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import Image from "next/image";

const Signup = () => {
    const [name, setName] = useState("");
    const [mobile, setMobile] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const paperStyle = { padding: "30px 30px", width: 300, margin: "100px auto", borderRadius: "10px" };

    const handleNameChange = (e:any) => {
        setName(e.target.value);
    };

    const handleMobileChange = (e:any) => {
        setMobile(e.target.value);
    };

    const handlePasswordChange = (e:any) => {
        setPassword(e.target.value);
    };
    const handleTogglePasswordVisibility = () => {
        setShowPassword((prevShowPassword) => !prevShowPassword);
    };
    const handleSubmit = () => {
        if (!/[!@#$%^&*(),.?"{}|<>]/.test(password) || !/\d/.test(password)) {
            setError("Password should contain at least one special character and one number .");
        } else {
            setError("");
        }
    };
    const isSubmitDisabled = !name || !mobile || !password;
    return (
        <Grid>
            <Paper elevation={20} style={paperStyle}>
                <Grid>
                    <Image
                        src="/Group.svg"
                        width={200}
                        height={50}
                        alt="first image"
                        style={{ marginLeft: "35px", marginBottom: "5px", marginTop: "-20px" }}
                    />
                    <Typography variant="body1" style={{ marginTop:"-5%", marginLeft: "40%" ,fontWeight:"600"}}>Sign Up</Typography>
                    <Typography variant="caption" style={{ marginLeft: "25%" }}>Create your account here</Typography>
                </Grid>
                <TextField
                    sx={{ height: "35px", marginTop:"15px"}}
                    label="Name"
                    focused
                    placeholder="Enter your name here"
                    name="name"
                    value={name}
                    onChange={handleNameChange}
                    required
                    size="small"
                    type="text"
                    fullWidth
                    margin="normal"
                />
                <TextField
                    sx={{ height: "35px", marginTop:"15px"}}
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
                    sx={{ height: "35px", marginTop:"15px"}}
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
                {error && <Typography variant="caption" color="error" style={{ marginLeft: "25%" }}>{error}</Typography>}
                <Button 
                variant="contained" 
                sx={{width:"40%",backgroundColor:"green", marginTop:"20px",borderRadius:"20px",marginLeft:"30%"}} 
                onClick={handleSubmit}
                disabled={isSubmitDisabled}
                > signup</Button>

            </Paper>
        </Grid>
    );
};
export default Signup;