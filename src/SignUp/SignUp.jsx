import { Button, Checkbox, FormControlLabel, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import './Signup.css'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from 'react-toastify'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
// import pencilImg from '../../assets/Login/pencilImg.svg'
import { LoginDataCon } from '../Context/LoginContext';
import ApiService from '../Common/ApiService';
import CancelIcon from '@mui/icons-material/Cancel';

function Signup() {
    const { loginTog, setLoginTog, signUp, setSignUp
    } = useContext(LoginDataCon)
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const toggleLogin = () => {
        navigate('/login');
    }
    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const submitData = async (value) => {
        try {
            const res = await ApiService.post('/createuser', value);
            if (res.status === 201) {
                toast.success('successfully account created')
                setSignUp(pre => !pre)
                setLoginTog(pre => !pre)
            }
        } catch (error) {
            if (error.response.data.status === 400) {
                toast.error('User already exist')
            } else {
                toast.error(error.response.data.message);
            }
        }
    }
    const scheme = Yup.object().shape({
        username: Yup.string().required('please enter your name').min(3, '* User Name should be atlest 3 characters'),
        email: Yup.string().required("please enter your mail").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'enter valid mail format'),
        contact: Yup.string().required().matches(/^\d{10}$/, 'please fill atleast 10 number'),
        password: Yup.string().required('please enter your password')
    })
    return (
        <>
            <div className='signupPage'>
                {/* <div className='designSignupPart'>
                    <img src={signupImg} className='pencilImg' />
                </div> */}
                {signUp ? <CancelIcon className='cancelIcon' style={{ color: '#F4424E' }} onClick={() => setSignUp(pre => !pre)
                } /> : <></>}
                <div className='signupForm'>
                    <Typography variant='h5' component="p"
                        sx={{ color: "#4481eb" }}>
                        Create Account
                    </Typography>
                    <Formik
                        initialValues={{
                            username: '',
                            email: '',
                            contact: '',
                            password: '',
                            admin: false
                        }}
                        onSubmit={(value) => {
                            submitData(value)
                        }}
                        validationSchema={scheme}
                    >
                        {({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                            <  form onSubmit={handleSubmit} className='form-input' >
                                <TextField sx={{ m: 1, width: '30ch' }}
                                    required id="outlined-basic" label="Name" variant="outlined"
                                    value={values.username} name='username' onChange={handleChange}
                                    onBlur={handleBlur} error={errors.username && touched.username}
                                    helperText={errors.username && touched.username ? errors.username : ""}
                                />

                                <TextField sx={{ m: 1, width: '30ch' }}
                                    required id="outlined-basic" label="Email" variant="outlined"
                                    value={values.email} name='email' onChange={handleChange}
                                    onBlur={handleBlur} error={errors.email && touched.email}
                                    helperText={errors.email && touched.email ? errors.email : ""} />

                                <TextField sx={{ m: 1, width: '30ch' }}
                                    required id="outlined-basic" label="contactNo" variant="outlined"
                                    value={values.contact} name='contact' onChange={handleChange}
                                    onBlur={handleBlur} error={errors.contact && touched.contact}
                                    helperText={errors.contact && touched.contact ? errors.contact : ""} />

                                <TextField sx={{ m: 0, width: '30ch' }}
                                    required id="outlined-basic" label="password" variant="outlined"
                                    value={values.password} name='password' onChange={handleChange}
                                    onBlur={handleBlur} error={errors.password && touched.password}
                                    helperText={errors.password && touched.password ? errors.password : ""}
                                    type={showPassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    onMouseDown={handleMouseDownPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                    }}
                                />
                                <div className='adminCheckBox'>
                                <FormControlLabel control={<Checkbox value={true} name='admin' onChange={handleChange} />} label="create admin" />
                                </div>
                                <Button sx={{ m: 1, width: '34ch', backgroundColor: "#F4424E" }}

                                    variant='contained' type='submit'  >
                                    Sign Up
                                </Button>
                            </ form>
                        )}
                    </Formik>
                </div>

            </div>
        </>
    )
}

export default Signup