import { useState, useEffect } from "react";
import "./AddBook.css"

function AddBook(){

    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')

    // Genre handling
    const [genresList, setGenresList] = useState([])
    const [genresListLength, setGenresListLength] = useState(0)

    // Optional
    const [blurb, setBlurb] = useState('')
        const [isBlurb, setIsBlurb] = useState(false)
    const [imageurl, setImageurl] = useState('')
        const [isImageUrl, setIsImageUrl] = useState(false)
    const [year, setYear] = useState('')
        const [isYear, setIsYear] = useState(false)
    
    
    // Fetch to get genres:
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


    function addBookSubmit(event){
        event.preventDefault()

        console.log(`title: ${title}, author: ${author}, genre_id: ${genre}, blurb: ${blurb}, image: ${imageurl}, year: ${year}`)
        fetch ("https://book-swap-api.dev.io-academy.uk/api/books", {
            method: 'POST',
            mode: 'cors',
            headers: {'content-type':'application/json', 'accept':'application/json'
        },
            body: JSON.stringify({
                'title': title,
                'author': author,
                'genre_id': parseInt(genre),
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
                <label htmlFor='addtitle'>Title (required)</label>
                    <input type='text' id='addtitle' value={title} onChange={(e) => setTitle(e.target.value)}/>
                <label htmlFor='addauthor'>Author (required)</label>
                    <input type='text' id='addauthor' value={author} onChange={(e) => setAuthor(e.target.value)}/>
                <label htmlFor='addgenre'>Genre (required)</label>
                    <select id='addgenre' value={genre} onChange={(e) => setGenre(e.target.value)}>
                        
                        <option value={null}></option>
                        {genresListLength > 0 && genresList.map(list_item => 
                            <option key={list_item.id} value={list_item.id}>{list_item.name}</option>)}

                    </select>
                <label htmlFor='addimage'>Image URL:</label>
                    <input type='text' id='addimage' value={imageurl} onChange={(e) => setImageurl(e.target.value)} />
                <label htmlFor='addyear'>Year Published:</label>
                    <input type='text' id='addyear' value={year} onChange={(e) => setYear(e.target.value)}></input>
                <label htmlFor='addblurb'>Blurb:</label>
                    <textarea value={blurb} onChange={(e) => setBlurb(e.target.value)} />   
                <label htmlFor="addsubmit"></label>
                    <input type='submit' id='addsubmit' value='Add Book'/>
            </form>
        </div>
    )
}

export default AddBook