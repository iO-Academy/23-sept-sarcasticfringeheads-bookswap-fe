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
    const [imageurl, setImageurl] = useState('')  
    const [year, setYear] = useState('')

    // Error handling
    
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
        
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
        let bookData = {
            'title': title,
            'author': author,
            'genre_id': parseInt(genre)
        }

        if (blurb != '') {
            bookData['blurb'] = blurb
        }
        if (imageurl != '') {
            bookData['image'] = imageurl
        }
        if (year != '') {
            bookData['year'] = year
        }
        
        console.log(`title: ${title}, author: ${author}, genre_id: ${genre}, blurb: ${blurb}, image: ${imageurl}, year: ${year}`)
        fetch ("https://book-swap-api.dev.io-academy.uk/api/books", {
            method: 'POST',
            mode: 'cors',
            headers: {'content-type':'application/json', 'accept':'application/json'
        },
            body: JSON.stringify(bookData)
        }) 
        .then(function (res) {
            if (res.status === 201) {
                    setTitle('')
                    setAuthor('')
                    setGenre('')
                    setBlurb('')   
                    setImageurl('')  
                    setYear('')
            } 
            else if (res.status === 500 || res.status === 422) {
                    res.json().then(function (response_json) {
                    console.log(response_json.message)
                    setIsError(true)
                    setErrorMessage(response_json.message)
                    
                });
                
            } 
            else {
                res.json().then(function (response_json) {
                    console.log(response_json.message)
                    setIsError(true)
                    setErrorMessage(response_json.message)
                });
            }
        })
    }
    
    return (
        <div>
            <div className="welcome">
                <h1>Add a Book to our Book Swap</h1>
                <h3>Enter the book details for your favourite book and we can get this added to our Swap.</h3>
                <span></span>
            </div> 
            
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
                {isError && <span className='errormessage'>{errorMessage}</span>}
                    <input type='submit' id='addsubmit' value='Add Book'/>
            </form>
        </div>
    )
}

export default AddBook