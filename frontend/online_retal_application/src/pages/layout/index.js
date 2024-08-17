import React, { useState } from 'react'
import Header from '../Header'
import RegisterPage from '../register/register';
import LoginPage from '../login/login';

function Layout() {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  return (
   <>
   <Header/>
   <RegisterPage isRegisterOpen={isRegisterOpen} setIsRegisterOpen={setIsRegisterOpen} />
   <LoginPage isDrawerOpen={isDrawerOpen} setIsDrawerOpen={setIsDrawerOpen} /> 
   </>
  )
}

export default Layout