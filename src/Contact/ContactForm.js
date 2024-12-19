import React from 'react'
import SignUp from './SignUp';
import Login from './Login';
import ContactList from './ContactList'

import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Protect from './Protect';


function ContactForm() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />}> </Route>
        <Route path="/Login" element={<Login />}> </Route>
        <Route path="/Contactlist" element={<Protect><ContactList /></Protect>}> </Route>
      </Routes>
    </Router>
  )
}

export default ContactForm
