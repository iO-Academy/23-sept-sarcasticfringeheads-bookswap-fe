import { useEffect, useState } from "react"
import BookListing from "../Booklisting/Booklisting"

function ClaimedBooks() {
    const [books, setBooks] = useState ([])

    useEffect (function() {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books?claimed=1')
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
                    key={book.id}/>
            )}
        </div>
    )
}
export default ClaimedBooks