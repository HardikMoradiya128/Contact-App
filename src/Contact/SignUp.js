import React, { useState } from 'react';
import './SignUp.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import CallIcon from '@mui/icons-material/Call';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { Link } from 'react-router-dom/dist';
import { useNavigate } from 'react-router-dom/dist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = yup.object({
    fname: yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('FirstName is Required'),
    lname: yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('LastName is Required'),
    uname: yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('UserName is Required'),
    contact: yup.string()
        .min(10, 'Too Short!')
        .max(10, 'Too Long!')
        .required('Contact No is Required'),
    password: yup
        .string('Enter your password')
        .min(6, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
    email: yup
        .string('Enter your email')
        .email('Enter a valid email')
        .required('Email is required'),
});

function SignUp() {
    const navigate = useNavigate()

    const [SignUp, setSignUp] = useState({
        fname: '',
        lname: '',
        uname: '',
        password: '',
        contact: '',
        email: ''
    })

    const createNewUser = async (values) => {
        try {
            const res = await axios.post('http://13.51.56.32:3001/user/signup', values)
            console.log(res);
            toast.success(res.data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
              setTimeout(() => {
                  navigate("/Contactlist")
              },1200)
            localStorage.setItem('token', res.data.token)
            console.log(res.data.token);
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.message, {
                position: "bottom-center",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
        }
    }

    const formik = useFormik({
        initialValues: SignUp,
        validationSchema: validationSchema,
        onSubmit: async (values, action) => {
            // console.log(values);
            await createNewUser(values)
            action.resetForm()
            setSignUp({
                fname: '',
                lname: '',
                uname: '',
                password: '',
                contact: '',
                email: ''
            })
        },
    });

    return (
        <div className='SignUp'>
            <div className='S_Card'>
                <h4>Sign Up</h4>
                <div className='S_Input'>
                    <form onSubmit={formik.handleSubmit}>
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            id="fname"
                            name="fname"
                            label="FirstName"
                            value={formik.values.fname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.fname && Boolean(formik.errors.fname)}
                            helperText={formik.touched.fname && formik.errors.fname}
                            sx={{ marginTop: "20px", width: "330px" }}
                        />
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            id="lname"
                            name="lname"
                            label="LastName"
                            value={formik.values.lname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.lname && Boolean(formik.errors.lname)}
                            helperText={formik.touched.lname && formik.errors.fname}
                            sx={{ marginTop: "20px", width: "330px" }}
                        />
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <AccountCircle />
                                    </InputAdornment>
                                ),
                            }}
                            id="uname"
                            name="uname"
                            label="UserName"
                            value={formik.values.uname}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.uname && Boolean(formik.errors.uname)}
                            helperText={formik.touched.uname && formik.errors.uname}
                            sx={{ marginTop: "20px", width: "330px" }}
                        />
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <CallIcon />
                                    </InputAdornment>
                                ),
                            }}
                            id="contact"
                            name="contact"
                            label="Contact No"
                            value={formik.values.contact}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.contact && Boolean(formik.errors.contact)}
                            helperText={formik.touched.contact && formik.errors.contact}
                            sx={{ marginTop: "20px", width: "330px" }}
                        />
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <LockIcon />
                                    </InputAdornment>
                                ),
                            }}
                            id="password"
                            name="password"
                            label="Password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            sx={{ marginTop: "20px", width: "330px" }}
                        />
                        <TextField
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <MailOutlineIcon />
                                    </InputAdornment>
                                ),
                            }}
                            id="email"
                            name="email"
                            label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            sx={{ marginTop: "20px", width: "330px" }}
                        />
                        <br />
                        <Button color="secondary" variant="contained" type="submit" sx={{ margin: "20px", padding:"10px 40px" }}>
                            Sign Up
                        </Button>
                        <p>Already have an account ? <Link to='/Login' style={{ color: "purple", textDecoration: "none", fontWeight: "700" }}>Login</Link></p>
                    </form>
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}

export default SignUp
