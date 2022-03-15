import './App.css';
import { Route, Routes, PrivateRoute } from 'react-router-dom';
import { useState } from 'react';
import Register from './pages/Register'
import Login from './components/Login'

import Home from '../src/pages/Home'
import Profile from './pages/Profile';
import Nft from './components/Nft';


function App() {
  


  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="register" element={<Register />}/>
          <Route path=":username" element={<Profile />}/>
        </Routes>
      </div>
  );
}

export default App;
