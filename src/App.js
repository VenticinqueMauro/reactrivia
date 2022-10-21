import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import { Home } from './Components/Home';
import { Ranking } from './Components/Ranking';


export default function App() {


  return (
    <>
      <div className='container flex items-center justify-center h-screen stify animate__animated animate__zoomIn'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/ranking' element={<Ranking />} />
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}
