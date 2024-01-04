import React from 'react'
import SignUp from './SignUp';
import LoginPage from './Loginpage'
import Contactlist from './Contactlist'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  useNavigation
} from "react-router-dom";
import Protect from './Protect';


function ContactForm() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignUp />}> </Route>
        <Route path="/Login" element={<LoginPage />}> </Route>
        <Route path="/Contactlist" element={<Protect><Contactlist /></Protect>}> </Route>
      </Routes>
    </Router>
  )
}

export default ContactForm
