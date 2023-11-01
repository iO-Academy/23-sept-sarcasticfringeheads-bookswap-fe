import { useState } from "react";
import "./AddBook.css"

function AddBook(){

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [blurb, setBlurb] = useState('')
    const [imageurl, setImageurl] = useState('')
    const [year, setYear] = useState('')

    function addBookSubmit(event){
        event.preventDefault()
        fetch ("https://book-swap-api.dev.io-academy.uk/api/books", {
            method: 'POST',
            mode: 'cors',
            headers: {'content-type':'application/json', 'accept':'application/json'
        },
            body: JSON.stringify({
                'title': title,
                'author': author,
                'genre_id': 1,
                'blurb': blurb,
                'image': imageurl,
                'year': year,
            })
        })
            
            .then(function (res) {
                if (res.status === 201) {
                    // Book added successfully
                    console.log('Book added successfully.');
                } else if (res.status === 500 || res.status === 422) {
                    // Handle errors (server error or validation errors) appropriately
                    console.error('Error adding the book.');
                } else {
                    // Handle other status codes as needed
                    console.error('Unexpected error.');
                }
            })
        
        }
    
    return (
        
        <div>
            <h3>Add A Book to the Book Swap!</h3>

            <form onSubmit={addBookSubmit} className="add-book-form">
                <label htmlFor='addtitle'>Title:</label>
                    <input type='text' id='addtitle' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor='addauthor'>Author:</label>
                    <input type='text' id='addauthor' value={author} onChange={(e) => setAuthor(e.target.value)}/>
                <label htmlFor='addgenre'>Genre:</label>
                    <select id='addgenre' value={genre} onChange={(e) => setGenre(e.target.value)}>
                        <option value=''>Select</option>
                        <option value='Spy'>Spy</option>
                        <option value='Fantasy'>Fantasy</option>
                        <option value='Non-Fiction'>Non-Fiction</option>
                    </select>
                <label htmlFor='addblurb'>Blurb:</label>
                    <input type='text' id='addblurb' value={blurb} onChange={(e) => setBlurb(e.target.value)} />
                <label htmlFor='addimage' value={imageurl} onChange={(e) => setImageurl(e.target.value)}>Image URL:</label>
                    <input type='text' id='addimage' />
                <label htmlFor='addyear'>Year Published:</label>
                    <input type='text' id='addyear' value={year} onChange={(e) => setYear(e.target.value)}></input>   
                <input type='submit' value='Add Book'/>
            </form>
        </div>
        // <label htmlFor="name" value={name} onChange={setName}>Name:  </label>
        // <input type="text" id='name' placeholder="name"></input>
    )

}

export default AddBook