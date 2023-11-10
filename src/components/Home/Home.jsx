import "./Home.css"
import { useEffect, useState } from "react"
import BookListing from "../Booklisting/Booklisting"
import { motion, useAnimationControls} from "framer-motion"


function Home() {
    const [books, setBooks] = useState([])
    const [genre, setGenre] = useState ('')
    const [genresList, setGenresList] = useState([])
    const [genresListLength, setGenresListLength] = useState(0)
    const controls = useAnimationControls()

    useEffect(() => {
        fetch("https://book-swap-api.dev.io-academy.uk/api/genres")
            .then((response) => {
                return response.json()
            })
                .then((genres_json) => {
                    setGenresList(genres_json.data)
                    setGenresListLength(genres_json.data.length)  
                })
    }, [])

    useEffect (function() {
        let url = 'https://book-swap-api.dev.io-academy.uk/api/books?claimed=0'
        if (genre != '') {
            url = 'https://book-swap-api.dev.io-academy.uk/api/books?claimed=0' + '&genre=' + genre
        }
        fetch(url)
            .then(function (res) {
                return res.json()
            })
            .then(function (bookData) {
                setBooks(bookData.data)
                //animate booklists
                controls.start({opacity: [0, 1], transition: {duration: .5}})
                

            })
    }, [genre])
   
   

    return (
        
        <motion.div initial={{x: '-100%'}} animate={{x: '0%', transition: {duration: 0.3}}} exit={{x: '100%', transition: {duration: 0.6}}}>
            <div className="welcome">
            <motion.h1 initial={{opacity: 0, y: -40}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>Welcome to Book Swap</motion.h1>
                    <h3>Checkout these available books. Choose a book to view further details and enter your details to claim it</h3>
                    <span></span>
                </div> 
                
        
                <div className="filter">
                    <label > Filter by genre:</label>
                    <select id='addgenre' value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value=''>Select</option>
                        {genresListLength > 0 && genresList.map(list_item => 
                        <option key={list_item.id} value={list_item.id}>{list_item.name}</option>)}
                    </select>
                </div>
                    <motion.div className='books-container' animate={controls}>
                        {books.map(book => 
                        
                        <BookListing 
                            title={book.title} 
                            author={book.author} 
                            image={book.image} 
                            genre={book.genre.name} 
                            id={book.id} 
                            key={book.id}
                            /> 
                        )}
                    </motion.div>
        </motion.div>
        
        
    )
}

export default Home