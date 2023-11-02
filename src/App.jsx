import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Nav from './components/Nav/Nav'
import Error from './components/Error/Error'
import SingleBookDetail from './components/Booklisting/SingleBookDetail/SingleBookDetail'
import Home from './components/Home/Home'
import ClaimedBooks from './components/ClaimedBooks/ClaimedBooks'
import AddBook from './components/AddBook/AddBook'

function App() {
  return (
   <BrowserRouter>
<<<<<<< HEAD
      <Nav />
        <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/books/claimed' element={<ClaimedBooks />} />
            <Route path='/books/:id' element={<SingleBookDetail />} />
            <Route path='/addabook' element={<AddBook />} />
            <Route path='*' element={<Error />} />
        </Routes>
=======
    <Nav />
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/books/claimed' element={<ClaimedBooks />} />
        <Route path='/books/:id' element={<SingleBookDetail />} />
        <Route path='*' element={<Error />} />
      </Routes>
>>>>>>> main
   </BrowserRouter>
  )
}

export default App
