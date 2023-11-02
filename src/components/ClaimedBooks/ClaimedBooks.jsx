import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookListing from "../Booklisting/Booklisting"
import "./ClaimedBooks.css"

function ClaimedBooks() {
    const [books, setBooks] = useState ([])
    const [clickedBookId, setclickedBookId] = useState(null)
    const [genre, setGenre] = useState (null)


    useEffect (function() {
        let url = 'https://book-swap-api.dev.io-academy.uk/api/books?claimed=1'
        if (genre != null) {
            url = url + '&genre=' + genre
            setGenre(url)
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
                <select name='genre' id="genre" onChange={ClaimedBooks}>
                    <option value='0'>All</option>
                    <option value='0'>Historical</option>
                    <option value='1'>Non-Fiction</option>
                    <option value='2'>Romance</option>
                    <option value='3'>Thriller</option>
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
            setClickedBookId={setclickedBookId}/>    
            )}
        </div>

        </>




    )
}
export default ClaimedBooks