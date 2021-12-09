import React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const LoginFom = () => {

    const [userData, setUserData] = useState(null)
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const onSubmit = data => {

        setUserData({ ...data })
        console.log(userData)
        fetch('http://localhost:5656/registration', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => console.log(data))

        data.email = ''
        data.password = ''
        reset(data)

    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >

                <Typography component="h1" variant="h5">
                    Olcademy
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                {...register("email", { required: true })}
                                fullWidth
                                id="email"
                                label="Email Address"
                                color={errors.email?.type === 'required' ? 'error' : 'primary'}
                                name="email"
                                autoComplete="email"
                            />
                            {errors.email?.type === 'required' && <p style={{ color: 'red', textAlign: 'start', fontSize: '12px', margin: '0', marginTop: '12px' }}>*Email is required</p>}
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                {...register("password", {
                                    validate: (value) => value.length > 1,
                                    pattern: /(?=.*[@$!%*#?&^_-]).{8,}/
                                }, { pattern: /(?=.*[@$!%*#?&^_-]).{8,}/ })}
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                color={errors.password?.type === 'required' || 'pattern' ? 'error' : 'primary'}
                                autoComplete="new-password"
                            />
                            {errors.password?.type === 'validate' && <p style={{ color: 'red', textAlign: 'start', fontSize: '12px', margin: '0', marginTop: '12px' }}>*Password is required</p>}
                            {errors.password?.type === 'pattern' &&
                                <ul style={{ paddingLeft: '5%', textAlign: 'start', color: 'red', fontSize: '12px', margin: '0', marginTop: '12px' }}>
                                    <li>Minimum 8 digits</li>
                                    <li>Atlest 1 non-alphanumeric symbol (e.g. '@#$%&')</li>
                                </ul>}
                        </Grid>
                        <Grid item>
                            <Link to={'/create'} >
                                {"I have an account? Sign IN"}
                            </Link>
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                </Box>
            </Box>
        </Container>
    );
};

export default LoginFom;