import { useEffect, useState } from "react"
import BookListing from "../Booklisting/Booklisting"
import { motion, useAnimationControls} from "framer-motion"
import "./ClaimedBooks.css"

function ClaimedBooks() {
    const [books, setBooks] = useState([])
    const [genre, setGenre] = useState ('')
    const [genresList, setGenresList] = useState([])
    const [genresListLength, setGenresListLength] = useState(0)
    const [searchTerm, setSearchTerm] = useState('');

    const controls = useAnimationControls()

    useEffect(() => {
        fetch(" https://23-sarcasticfringehead-book-api.dev.io-academy.uk/api/genres")
            .then((response) => {
                return response.json()
            })
                .then((genres_json) => {
                    setGenresList(genres_json.data)
                    setGenresListLength(genres_json.data.length)  
                })
    }, [])

    useEffect (function() {
        let url = ' https://23-sarcasticfringehead-book-api.dev.io-academy.uk/api/books?claimed=0'
        if (genre != '') {
            url += '&genre=' + genre
        }
        if (searchTerm != '') {
            url += '&search=' + searchTerm
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
    }, [genre, searchTerm])

    return (
        <motion.div initial={{x: '-100%'}} animate={{x: '0%', transition: {duration: 0.3}}} exit={{x: '100%', transition: {duration: 0.6}}}>
        <div id='claimed-welcome' className="welcome">
            <motion.h1 id='claimed-h1' initial={{opacity: 0, y: -40}} animate={{opacity: 1, y: 0}} transition={{duration: 1}}>You missed your chance!</motion.h1>
                <h3 style={{letterSpacing: 1, maxWidth: '70%', textAlign: 'center', marginTop: '20px'}}>The following books have already been claimed, but don't worry, feel free to have a look, if you would like to return a book please do so by entering your email on the book page.</h3>
        </div> 

        <div className="filter">
            <label>Search:</label>
            <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)}></input>
            <label>Filter by genre:</label>
            <div className="content-select">
                <select id='addgenre' value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value=''>Select</option>
                    {genresListLength > 0 && genresList.map(list_item => 
                    <option className="option" key={list_item.id} value={list_item.id}>{list_item.name}</option>)}
                </select>
            </div>
       </div>
      
        <motion.div animate={controls} className ='books-container'>
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
export default ClaimedBooks