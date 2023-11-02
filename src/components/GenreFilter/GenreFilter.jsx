import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import BookListing from "../Booklisting/Booklisting"

function GenreFilter() {
    const [books, setBooks] = useState ([])
    const [clickedBookId, setclickedBookId] = useState(null)

    useEffect (function() {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books?genres=1')
            .then(function (res) {
                return res.json()
            })
            .then(function (bookData) {
                setBooks(bookData.data)
            })
    }, [])

    return (
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
    )
}
export default GenreFilter