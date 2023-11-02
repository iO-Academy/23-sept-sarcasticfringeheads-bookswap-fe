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
        <select className = 'filter'>
            <option>{bookData}</option>


        </select>
      
        
        
        
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