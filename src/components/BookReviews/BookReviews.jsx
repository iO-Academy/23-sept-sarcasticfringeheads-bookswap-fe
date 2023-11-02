import { useState } from "react"
import './BookReviews.css'

function BookReviews({id, reviews, setReviews}){
        const[name, setName] = useState('')
        const[rating, setRating] = useState('')
        const[review, setReview] = useState('')
        const[isError, setIsError] = useState('')
        const[errorMessage, setErrorMessage] = useState('')

    function submitReview (event){
        event.preventDefault()
        fetch('https://book-swap-api.dev.io-academy.uk/api/reviews', {
            method: 'POST',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json", "accept": "application/json", 
            },
            body: JSON.stringify({
                'name': name,
                'rating':rating,
                'review': review,
                'book_id': id,
            }),
        })
        .then((response) => {
            if (response.ok) {
                setIsError(false)
                let new_reviews = reviews
                new_reviews.push({
                    'name': name,
                    'rating': parseInt(rating),
                    'review': review,
                    'book_id': id,
                    'id' : Math.floor(Math.random() * 1000),
                })
                setReviews(new_reviews)
                console.log(reviews)
                // window.location.reload()
            } 
            else {
                // Get the error message from JSON and put it in errormessage state variable.
                response.json().then(function (response_json) {
                    console.log(response_json.message)
                    setIsError(true)
                    setErrorMessage(response_json.message)
                });
            }
        })
    }

    function changeName (event) {
        setName(event.target.value)
    }
    
    function changeRating(event) {
        setRating(event.target.value)
    }

    function ChangeReview (event) {
        setReview(event.target.value)
    }

    return (
        <>
            <h2 className="title">Come and Review the Book?</h2>
            <div className="reviewbook">
                <h2>Book Reviews:</h2>
                {isError && <span className='reviewerrormessage'>{errorMessage}</span>}
                <form onSubmit={submitReview}>
                    <div className='review-form'>
                        <label className="review">Name:</label>
                        <input type="text" id='name-review' placeholder="Name" value={name} onChange={changeName}></input>
                            <br />
                            <br />
                        <label className="review">Rating:</label>
                            <select name='score' value={rating} id="score" onChange={changeRating}>
                                <option value='0'>0</option>
                                <option value='1'>1</option>
                                <option value='2'>2</option>
                                <option value='3'>3</option>
                                <option value='4'>4</option>
                                <option value='5'>5</option>
                            </select>
                            <br />
                            <br />
                        <label className="review">Review:</label>
                        <textarea id='review' placeholder='Review' value={review} onChange={ChangeReview}></textarea> 
                            <br />
                            <br />
                            <input className="claimSubmit" type='submit' value='Submit'></input>
                    </div>    
                </form>
            </div>
        </>
    )
}

export default BookReviews