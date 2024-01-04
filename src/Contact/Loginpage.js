import React, { useState } from 'react';
import './Loginpage.css';
import { useFormik } from 'formik';
import * as yup from 'yup';
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom/dist';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const validationSchema = yup.object({
  uname: yup.string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .required('UserName is Required'),
  password: yup
    .string('Enter your password')
    .min(6, 'Password should be of minimum 6 characters length')
    .required('Password is required'),
});


function Loginpage() {
  const navigate = useNavigate()

  const [login, setLogin] = useState({
    uname: '',
    password: ''
  })

  const LoginUser = async (values) => {
    try {
      const res = await axios.post('http://13.51.56.32:3001/user/login', values)
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
      }, 3000)
      localStorage.setItem('token', res.data.token)
      console.log(res.data.token);
    }
    catch (error) {
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
    initialValues: login,
    validationSchema: validationSchema,
    onSubmit: async (values, action) => {
      // console.log(values);
      await LoginUser(values)
      action.resetForm()
      setLogin({
        uname: '',
        password: ''
      })
    },
  });


  return (
    <div className='Login'>
      <div className='L_Card'>
        <h4 className='text-center fw-bold'>Login</h4>
        <div className='L_Input'>
          <form onSubmit={formik.handleSubmit}>
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
              sx={{ margin: "20px 0px", width: "330px" }}
            />
            <br />
            <Link className='text-decoration-none text-dark'>Forget Password ?</Link>
            <br />
            <Button color="secondary" variant="contained" type="submit" sx={{ margin: "20px", padding:"10px 40px" }}>
              Login
            </Button>
            <p>Don't have an account ? <Link to='/' style={{ color: "purple", textDecoration: "none", fontWeight: "700" }}>SignUp</Link></p>
          </form>
        </div>
      </div>
      <ToastContainer />
    </div>
  )
}

export default Loginpage
