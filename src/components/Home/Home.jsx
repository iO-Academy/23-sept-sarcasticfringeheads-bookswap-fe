import { useEffect, useState } from "react"
import BookListing from "../Booklisting/Booklisting"

function Home() {
    const [books, setBooks] = useState ([])


    useEffect (function() {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books')
            .then(function (res) {
                return res.json()
            })
            .then(function (bookData) {
                setBooks(bookData.data)
            })
    }, [])
   
    return (
        <>
        <p> this is the home page
        </p>
        <BookListing />
        <div className='books-container'>
        {books.map(book => 
        <BookListing title={book.title} author={book.author} image={book.image} genre={book.genre.name} />    
        )}
        </div>

        </>

        
    )
}
export default Home