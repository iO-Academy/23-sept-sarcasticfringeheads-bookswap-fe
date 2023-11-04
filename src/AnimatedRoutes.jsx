import { useLocation, Route, Routes } from "react-router";

import Error from './components/Error/Error'
import SingleBookDetail from './components/Booklisting/SingleBookDetail/SingleBookDetail'
import Home from './components/Home/Home'
import ClaimedBooks from './components/ClaimedBooks/ClaimedBooks'
import AddBook from './components/AddBook/AddBook'



import { AnimatePresence } from "framer-motion";

function AnimatedRoutes() {
    const location = useLocation();
    return (
        <AnimatePresence mode='wait'>
        <Routes location={location} key={location.pathname}>
            <Route path='/' element={<Home />} />
            <Route path='/books/claimed' element={<ClaimedBooks />} />
            <Route path='/books/:id' element={<SingleBookDetail />} />
            <Route path='/books/addabook' element={<AddBook />} />
            <Route path='*' element={<Error />} />
            
        </Routes>
        </AnimatePresence>
    )
}
export default AnimatedRoutes