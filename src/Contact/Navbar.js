import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom/dist';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Navbar() {
    const navigate = useNavigate()

    const Login = () => {
        navigate('/Login')
    }

    const Logout = () => {
        localStorage.removeItem('token')
        navigate('/')
    }

    return (
        <div>
            <Box sx={{ flexGrow: 1 }} >
                <AppBar position="static" style={{ backgroundColor: "black" }}>
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{ mr: 2 }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                            Contact App
                        </Typography>
                        <Button variant='outlined' color="inherit" onClick={Login} >Login</Button>
                        <Button variant='outlined' color="inherit" className='ms-2' onClick={Logout} >Logout</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    )
}

export default Navbar
