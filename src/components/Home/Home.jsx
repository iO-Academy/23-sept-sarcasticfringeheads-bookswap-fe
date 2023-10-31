import "./Home.css"
import { useEffect, useState } from "react"
import BookListing from "../Booklisting/Booklisting"

function Home() {
    const [books, setBooks] = useState ([])
    const [clickedBookId, setclickedBookId] = useState(null)


    useEffect (function() {
        fetch('https://book-swap-api.dev.io-academy.uk/api/books?claimed=0')
            .then(function (res) {
                return res.json()
            })
            .then(function (bookData) {
                setBooks(bookData.data)
            })
    }, [])
   
    return (
        <>
        
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
export default Home