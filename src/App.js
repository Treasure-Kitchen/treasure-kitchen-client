import React from 'react';
import './App.css';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './features/components/public/common/Home';
import Login from './features/components/public/common/Login';
import About from './features/components/public/common/About';
import Contact from './features/components/public/common/Contact';
import Register from './features/components/public/common/Register';
import ResetPassword from './features/components/public/common/ResetPassword';
import VerifyUserEmail from './features/components/public/verification/VerifyUserEmail';
import ChangeUserForgottenPassword from './features/components/public/verification/ChangeUserForgottenPassword';
import ChangeForgottenPassword from './features/components/public/verification/ChangeForgottenPassword';
import VerifyEmployeeEmail from './features/components/public/verification/VerifyEmployeeEmail';
import ResetUserPassword from './features/components/public/common/ResetUserPassword';
import UserProfile from './features/components/private/user-profile/UserProfile';
import UpdateName from './features/components/private/user-profile/UpdateName';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='password-reset' element={<ResetPassword />} />
          <Route path='user-password-reset' element={<ResetUserPassword />} />
          <Route path='verify-email' element={<VerifyEmployeeEmail />} />
          <Route path='verify-user-email' element={<VerifyUserEmail />} />
          <Route path='reset-password' element={<ChangeForgottenPassword />} />
          <Route path='reset-user-password' element={<ChangeUserForgottenPassword />} />
          <Route path='user-profile' element={<UserProfile />} />
          <Route path='user-profile/update-name' element={<UpdateName />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
