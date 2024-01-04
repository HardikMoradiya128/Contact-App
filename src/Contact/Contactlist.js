import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateSharpIcon from '@mui/icons-material/CreateSharp';
import InputAdornment from '@mui/material/InputAdornment';
import AccountCircle from '@mui/icons-material/AccountCircle';
import PhoneIcon from '@mui/icons-material/Phone';
import ApartmentIcon from '@mui/icons-material/Apartment';
import FlagOutlinedIcon from '@mui/icons-material/FlagOutlined';
import SearchIcon from '@mui/icons-material/Search';
import Navbar from './Navbar';
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
  contact: yup.string()
    .min(10, 'Too Short!')
    // .max(70, 'Too Long!')
    .required('Contact No is Required'),
  city: yup.string()
    .required('FirstName is Required'),
  country: yup.string()
    .required('LastName is Required'),
});

function Contactlist() {
  const [data, setData] = useState([])
  const [search, setSearch] = useState('')

  const [initialValues, setInitialValues] = useState({
    fname: '',
    lname: "",
    contact: '',
    city: '',
    country: '',
  })

  const [editId, setEditId] = useState(-1)

  const allContacts = async () => {
    try {
      let token = localStorage.getItem('token')
      const res = await axios.get('http://13.51.56.32:3000/phonebook/findbyuser', {
        headers: { usertoken: token }
      })
      // console.log(res);
      setData(res.data.data)
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    allContacts()
  }, [])

  const createContact = async (values) => {
    try {
      let token = localStorage.getItem('token')
      const res = await axios.post('http://13.51.56.32:3001/phonebook/create', values, {
        headers: { usertoken: token }
      })
      console.log(res);
      allContacts()
      toast.success(res.data.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } catch (error) {
      console.log(error);
      toast.error('Try Again ..!', {
        position: "bottom-center",
        autoClose: 1000,
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
    initialValues: initialValues,
    validationSchema: validationSchema,
    enableReinitialize: true,

    onSubmit: (values, action) => {
      console.log(values);
      
      const copyData = [...data]
      if (editId >= 0) {
        editContact(values)
        // copyData.splice(editId, 1, values)
      }
      else {
        createContact(values)
        // copyData.push(values)
      }
      setEditId(-1)
      setData(copyData)
      action.resetForm()
      setInitialValues({
        fname: '',
        lname: "",
        contact: '',
        city: '',
        country: '',
      })
    },
  });

  const deleteItem = async (values) => {
    // let copyText = [...data]
    // copyText.splice(values, 1)
    // setData(copyText)
    // console.log(values._id);
    try {
      let token = localStorage.getItem('token')
      const res = await axios.delete(`http://13.51.56.32:3001/phonebook/delete?id=${values._id}`,{
        headers: { usertoken: token }
      })
      console.log(res)
      allContacts()
      toast.success(res.data.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } catch (error) {
      console.log(error);
      toast.error('Try Again ..!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  const editItem = (values) => {
    let index = data.findIndex((item) => item.fname === values.fname && item.contact === values.contact)
    setInitialValues(data[index])
    setEditId(index)
  }

  const editContact = async (values) => {
    console.log(values._id);
    try {
      let token = localStorage.getItem('token')
      const res = await axios.patch(`http://13.51.56.32:3001/phonebook/update?id=${values._id}`, values ,{
        headers: { usertoken: token }
      })
      console.log(res)  
      allContacts()
      toast.success(res.data.message, {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    } catch (error) {
      console.log(error);
      toast.error('Try Again ..!', {
        position: "bottom-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  return (
    <div>
      <Navbar />
      <ToastContainer />
      <div className='container mt-4'>
        <form onSubmit={formik.handleSubmit}>
          <div className='row'>
            <div className='col-md-6 my-3'>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                id="fname"
                name="fname"
                label="Enter Firstame"
                value={formik.values.fname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.fname && Boolean(formik.errors.fname)}
                helperText={formik.touched.fname && formik.errors.fname}
              />
            </div>
            <div className='col-md-6 my-3'>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                id="lname"
                name="lname"
                label="Enter LastName"
                value={formik.values.lname}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.lname && Boolean(formik.errors.lname)}
                helperText={formik.touched.lname && formik.errors.lname}
              />
            </div>
            <div className='col-md-6 my-3'>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <PhoneIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                id="contact"
                name="contact"
                label="Enter Conatct No."
                value={formik.values.contact}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.contact && Boolean(formik.errors.contact)}
                helperText={formik.touched.contact && formik.errors.contact}
              />
            </div>
            <div className='col-md-6 my-3'>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <ApartmentIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                id="city"
                name="city"
                label="Enter City"
                value={formik.values.city}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.city && Boolean(formik.errors.city)}
                helperText={formik.touched.city && formik.errors.city}
              />
            </div>
            <div className='col-md-6 my-3'>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <FlagOutlinedIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                id="country"
                name="country"
                label="Enter Country"
                value={formik.values.country}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.country && Boolean(formik.errors.country)}
                helperText={formik.touched.country && formik.errors.country}
              />
            </div>

            <div className='col-md-2 my-4'>
              {
                editId >= 0 ? <Button color="primary" fullWidth variant="contained" type="submit">Update</Button>
                  : <Button color="primary" variant="contained" fullWidth type="submit">Submit</Button>
              }
            </div>

            <div className='col-md-4 my-3'>
              <TextField
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                variant="outlined"
                fullWidth
                id="search"
                name="search"
                label="Search Contact"
                value={formik.values.search}
                onChange={(event) => setSearch(event.target.value)}
              />
            </div>
          </div>
        </form>

        <table className='table table-striped table-bordered border-dark table-success table-hover text-center mt-5'>
          <thead>
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Contact No.</th>
              <th>City</th>
              <th>Country</th>
              <th>Edit</th>
              <th>Delete</th>
            </tr>
          </thead>

          {
            data.filter((item) => {
              return item.fname.toLowerCase().includes(search) || item.contact.toString().includes(search)
            }).map((list, index) => {
              return (
                <tbody>
                  <tr>
                    <td>{index + 1}</td>
                    <td>{list.fname} {list.lname}</td>
                    <td>{list.contact}</td>
                    <td>{list.city}</td>
                    <td>{list.country}</td>
                    <td><Button onClick={() => { editItem(list) }}><CreateSharpIcon /></Button></td>
                    <td><Button color='error' onClick={() => { deleteItem(list) }}><DeleteIcon /></Button></td>
                  </tr>
                </tbody>
              )
            })
          }
        </table>
      </div>
    </div>
  )
}

export default Contactlist

