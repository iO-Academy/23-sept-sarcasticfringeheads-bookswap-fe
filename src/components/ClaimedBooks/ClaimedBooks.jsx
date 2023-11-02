import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookListing from "../Booklisting/Booklisting"
import "./ClaimedBooks.css"

function ClaimedBooks() {
    const [books, setBooks] = useState([])
    const [genre, setGenre] = useState ('')

    const [genresList, setGenresList] = useState([])
    const [genresListLength, setGenresListLength] = useState(0)

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
        let url = 'https://book-swap-api.dev.io-academy.uk/api/books?claimed=1'
        if (genre != '') {
            url = 'https://book-swap-api.dev.io-academy.uk/api/books?claimed=1' + '&genre=' + genre
        }

        fetch(url)
            .then(function (res) {
                return res.json()
            })
            .then(function (bookData) {
                setBooks(bookData.data)
            })
    }, [genre])

    return (
        <>
        <div className="filter">
            <label >Genre: </label>
        
            <select id='addgenre' value={genre} onChange={(e) => setGenre(e.target.value)}>
                <option value={''}></option>
                {genresListLength > 0 && genresList.map(list_item => 
                <option key={list_item.id} value={list_item.id}>{list_item.name}</option>)}
            </select>
        </div>
      
        <div className='books-container'>
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
        </div>

        </>




    )
}
export default ClaimedBooks