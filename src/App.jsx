import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav/Nav'
import Home from './components/home/home'
import Error from './components/Error/Error'
function App() {
  

  return (
   <BrowserRouter>
   <Nav />
   <Routes>
    <Route path='/' element={<Home />} />
    <Route path='*' element={<Error />} />
   </Routes>
   
   
   
   
   </BrowserRouter>
  )
}

export default App
