import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify';
import { Button, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import './Login.css'
import ApiService from '../Common/ApiService'
import { LoginDataCon } from '../Context/LoginContext';
import CancelIcon from '@mui/icons-material/Cancel';
import { Formik } from 'formik';
import * as Yup from 'yup'
function Login() {
    const { loginTog, setLoginTog
    } = useContext(LoginDataCon)
    const [email, setMail] = useState("")
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const loginVerify = async (value) => {
        // e.preventDefault();
        try {
            const res = await ApiService.post('/login', value)
            if (res.status == 200) {
                toast.success("login success")
                sessionStorage.setItem('token', res.data.token)
                navigate('/home')
            }
        } catch (error) {
            if (error.response.status === 400) {
                toast.error(error.response.data.message)
                sessionStorage.clear()
                navigate('/loginlanding')
            }
            else {
                toast.error("Error Occoured! Please try after some time")
                sessionStorage.clear()
                navigate('/loginlanding')
            }
        }

    }
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };
    const scheme = Yup.object().shape({
        // username: Yup.string().required('please enter your name').min(3, '* User Name should be atlest 3 characters'),
        email: Yup.string().required("please enter your mail").matches(/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/, 'enter valid mail format'),
        // contact: Yup.string().required().matches(/^\d{10}$/, 'please fill atleast 10 number'),
        password: Yup.string().required('please enter your password')
    })
    return (
        <>
            <div className='loginPage'>
                {loginTog ? <CancelIcon className='cancelIcon' style={{ color: '#F4424E' }} onClick={() => setLoginTog(pre => !pre)
                } /> : <></>}
                <Typography variant='h5' component="p"
                    sx={{ color: "#4481eb" }}>
                    Login Account
                </Typography>
                <Formik
                    initialValues={{
                        email: '',
                        password: ''
                    }}
                    onSubmit={(value) => {
                        console.log(value);
                        loginVerify(value)
                    }}
                    validationSchema={scheme}

                >
                    {({ handleSubmit, handleChange, handleBlur, errors, touched, values }) => (
                        <form className='loginForm' onSubmit={handleSubmit}>
                            <div className="form-floating login-box  mb-3" >
                                <TextField required id="outlined-basic" label="Email" variant="outlined" sx={{ width: '20em' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur} error={errors.email && touched.email}
                                    name='email'
                                    helperText={errors.email && touched.email ? errors.email : ""}
                                />
                            </div>
                            <div className="form-floating  mb-3">
                                <TextField required id="outlined-basic" label="Password" variant="outlined"
                                name='password'
                                    sx={{ width: '20em' }}
                                    onChange={handleChange}
                                    onBlur={handleBlur} error={errors.password && touched.password}
                                    helperText={errors.password && touched.password ? errors.password : ""}
                                    type={showPassword ? 'text' : 'password'} InputProps={{
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
                            </div>
                            <div>
                                <p>Use this for demo⬇️</p>
                                <p>E-mail:-selvamvimaldz1@gmail.com</p>
                                <p>Password:-vimal</p>
                            </div>
                            <div className='for-crt-link mb-3'>
                                <Link style={{ textDecoration: 'none', color: '#4481eb' }} to='/forgetpassword'>Forget password?</Link>
                                {/* <Link style={{ textDecoration: 'none', color: '#4481eb' }} to='/signup'>New to Here?</Link> */}
                            </div>
                            <div className="d-grid">
                                <Button variant='contained'
                                    type='submit' sx={{ backgroundColor: "#F4424E", width: '20em' }}
                                >
                                    Login in
                                </Button>
                            </div>
                        </form>)}
                </Formik>

            </div>
            {/* </div> */}
        </>
    )
}

export default Login