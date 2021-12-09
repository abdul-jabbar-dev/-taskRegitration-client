import React from 'react';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import './App.css';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { useForm } from "react-hook-form";
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from 'react-router-dom';

const RegisterFom = () => {
    const [isGender, setIsGender] = useState(false)
    const [isDate, setIsDate] = useState(false)
    const [userData, setUserData] = useState(null)
    const [gender, setGender] = useState('');

    const handleChange = (event) => {
        setGender(event.target.value);
    };
    const [value, setValue] = useState(null);
    const { register, handleSubmit, reset, formState: { errors } } = useForm();




    const onSubmit = data => {
        value === '' ? setIsDate(true) : setIsDate(false)
        gender === null ? setIsGender(true) : setIsGender(false)
        setUserData({ ...data, deathOfBirth: value, gender: gender, registerDate: new Date() })
        console.log(userData)
        fetch('https://pure-dawn-14954.herokuapp.com/registration', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
            .then(res => res.json())
            .then(data => console.log(data))

        data.FullName = ''
        data.email = ''
        data.password = ''
        setValue(null)
        setGender('')
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
                                {...register("FullName", { required: true })}
                                autoComplete="given-name"
                                name="FullName"
                                required
                                color={errors.FullName?.type === 'required' ? 'error' : 'primary'}
                                fullWidth
                                id="FullName"
                                label="FullName"
                                autoFocus
                            />
                            {errors.FullName?.type === 'required' && <p style={{ color: 'red', textAlign: 'start', fontSize: '12px', margin: '0', marginTop: '12px' }}>*Name is required</p>}

                        </Grid>
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
                        <Grid item xs={12} sm={6} >
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Death of Birth"
                                    value={value}
                                    autoOk
                                    onChange={(newValue) => {
                                        setValue(newValue);
                                    }}
                                    renderInput={(params) => <TextField
                                        fullWidth
                                        required
                                        name="dob"
                                        color={isDate ? 'error' : 'primary'}
                                        id="dob"
                                        {...params} />}
                                />
                            </LocalizationProvider>
                            {isDate && <p style={{ color: 'red', textAlign: 'start', fontSize: '12px', margin: '0', marginTop: '12px' }}>*Date is required</p>}

                        </Grid>

                        <Grid item xs={12} sm={6} >
                            <FormControl fullWidth>
                                <InputLabel id="gender-select-label">Gender*</InputLabel>
                                <Select

                                    labelId="gender-select-label"
                                    id="gender-select"
                                    value={gender}
                                    label="Gender"
                                    required
                                    color={isGender ? 'error' : 'primary'}
                                    onChange={handleChange}
                                >
                                    <MenuItem value={'Male'}>Male</MenuItem>
                                    <MenuItem value={'Female'}>Female</MenuItem>
                                </Select>
                            </FormControl>
                            {isGender && <p style={{ color: 'red', textAlign: 'start', fontSize: '12px', margin: '0', marginTop: '12px' }}>*Gender is required</p>}

                        </Grid>
                        <Grid item>
                            <Link to={'/login'} variant="body2">
                                {"Don't have an account? Sign Up"}
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

export default RegisterFom;