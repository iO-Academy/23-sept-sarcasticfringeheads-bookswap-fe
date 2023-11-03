import { useEffect, useState } from "react"
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

        <div className="welcome">
            <h1>You missed your chance</h1>
            <h3>The follwing books have already been claimed, but don't worry, feel free to have a look, if you would like to return a book please do so by entering your email on the book page</h3>
            <span></span>
        </div> 

        <div className="filter">
            <label>Filter by genre:</label>
            <div className="content-select">
                <select id='addgenre' value={genre} onChange={(e) => setGenre(e.target.value)}>
                    <option value=''>Select</option>
                    {genresListLength > 0 && genresList.map(list_item => 
                    <option className="option" key={list_item.id} value={list_item.id}>{list_item.name}</option>)}
                </select>
            </div>
       </div>
      
        <div className ='books-container'>
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