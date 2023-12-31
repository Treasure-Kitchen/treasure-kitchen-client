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
import NavigationBar from './features/components/public/common/NavigationBar';
import Checkout from './features/components/private/order/Checkout';
import MenuList from './features/components/public/menu/MenuList';
import AddAddress from './features/components/private/address/AddAddress';
import UpdateAddress from './features/components/private/address/UpdateAddress';
import AddOrder from './features/components/private/order/AddOrder';
import ChangePawword from './features/components/private/user-profile/ChangePassword';
import MyOrders from './features/components/private/order/MyOrders';
import Dishes from './features/components/private/dish/Dishes';
import Tracks from './features/components/private/order/Tracks';
import AddReservation from './features/components/private/reservations/AddReservation';
import Reservations from './features/components/private/reservations/Reservations';
import Payment from './features/components/private/order/Payment';
import Faq from './features/components/public/common/Faq';
import Unauthorized from './features/components/public/common/Unauthorized';
import PageNotFound from './features/components/public/common/PageNotFound';
import RequireAuth from './features/components/private/RequireAuth';
import { roles } from './settings/settings';
import Footer from './features/components/public/common/Footer';

function App() {
  return (
    <>
      <NavigationBar />
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='faq' element={<Faq />} />
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='unauthorized' element={<Unauthorized />} />
          <Route path='*' element={<PageNotFound />} />
          <Route path='menus/:id' element={<MenuList />} />
          <Route path='dishes' element={<Dishes />} />

          { /* Routes that require you to just log in */}
          <Route element={<RequireAuth allowedRoles={[roles.Admin, roles.Regular, roles.User, roles.SuperAdmin]} /> }>
            
          </Route>
          { /* Routes that require you to log in as an application user*/}
          <Route element={<RequireAuth allowedRoles={[roles.User]} /> }>
            <Route path='checkout' element={<Checkout />} />
            <Route path='my-orders' element={<MyOrders />} />
            <Route path='my-orders/:id/tracks' element={<Tracks />} />
            <Route path='orders/add' element={<AddOrder />} />
            <Route path='orders/:id/payment' element={<Payment />} />
            <Route path='reservations/add' element={<AddReservation />} />
            <Route path='my-reservations' element={<Reservations />} />
            <Route path='user-profile/change-password' element={<ChangePawword />} />
            <Route path='reset-user-password' element={<ChangeUserForgottenPassword />} />
            <Route path='user-profile' element={<UserProfile />} />
            <Route path='user-profile/update-name' element={<UpdateName />} />
            <Route path='address/add' element={<AddAddress />} />
            <Route path='address/:id/edit' element={<UpdateAddress />} />
            <Route path='user-password-reset' element={<ResetUserPassword />} />
            <Route path='verify-user-email' element={<VerifyUserEmail />} />
          </Route>
          { /* Routes that require you to log in as either Admin or SuperAdmin*/}
          <Route element={<RequireAuth allowedRoles={[roles.Admin, roles.SuperAdmin]} /> }>
            
          </Route>
          { /* Routes that require you to log in as an employee*/}
          <Route element={<RequireAuth allowedRoles={[roles.Admin, roles.Regular, roles.SuperAdmin]} /> }>
            <Route path='password-reset' element={<ResetPassword />} />
            <Route path='verify-email' element={<VerifyEmployeeEmail />} />
            <Route path='reset-password' element={<ChangeForgottenPassword />} />
          </Route>
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
