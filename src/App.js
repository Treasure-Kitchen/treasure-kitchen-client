import React from 'react';
import './App.css';
import Layout from './Layout';
import { Route, Routes } from 'react-router-dom';
import Home from './features/components/public/common/Home';
import Login from './features/components/public/common/Login';
import About from './features/components/public/common/About';
import Contact from './features/components/public/common/Contact';
import Profile from './features/components/private/Profile';

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<Home />} />
          <Route path='login' element={<Login />} />
          <Route path='about' element={<About />} />
          <Route path='contact' element={<Contact />} />
          <Route path='profile' element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
