import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav/Nav'

import Error from './components/Error/Error'
import SingleBookDetail from './components/Booklisting/SingleBookDetail/SingleBookDetail'
import Home from './components/Home/Home'
import ClaimedBooks from './components/ClaimedBooks/ClaimedBooks'
function App() {
  

  return (
   <BrowserRouter>
      <Nav />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/books/claimed' element={<ClaimedBooks />} />
            <Route path='*' element={<Error />} />
            <Route path='/books/:id' element={<SingleBookDetail />} />

        </Routes>
   
   
   
   
   </BrowserRouter>
  )
}

export default App
