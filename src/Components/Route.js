import React from 'react';
import { Route, Routes } from 'react-router-dom'; 
import Home from './Home';
import Shop from './Shop';
import Collection from './Collection';
import Contact from './Contact';

function AppRoutes() {  
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="Shop" element={<Shop/>}/>
      <Route path='Collection' element={<Collection/>}/>
      <Route path='Contact' element={<Contact/>}/>

    </Routes>
  );
}

export default AppRoutes;  
