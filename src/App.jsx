import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav/Nav'
import AnimatedRoutes from './AnimatedRoutes'

function App() {
  return (
   <BrowserRouter>
      <Nav />
        <AnimatedRoutes />
   </BrowserRouter>
  )
}

export default App
