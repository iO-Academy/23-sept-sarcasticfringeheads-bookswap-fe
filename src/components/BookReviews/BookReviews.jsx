import { useState } from "react"
import './BookReviews.css'

function BookReviews({id}){
        const[name, setName] = useState('')
        const[rating, setRating] = useState('')
        const[review, setReview] = useState('')
        

    function submitReview (event){
        event.preventDefault()
        return
    }

    function changeName (event){
        setName(event.target.value)
    }
    
    function changeRating(event){
        setRating (event.target.value)
    }

    function ChangeReview (event){
        setReview(event.target.value)
    }

    return(
            <>
            <h2 className="title">Come and Review the Book?</h2>
                <div className="reviewbook">
            <h2>Book Reviews:</h2>

    <form onSubmit={submitReview}>
        <div className='review-form'>
                
            <label className="review">Name:</label>
            <input type="text" id='name-review' placeholder="Name" onChange={changeName}></input>
            {name}
                <br />
                <br />
            <label className="review">Rating:</label>
                <select name='score' id="score" onChange={changeRating}>
                    <option value='0'>0</option>
                    <option value='1'>1</option>
                    <option value='2'>2</option>
                    <option value='3'>3</option>
                    <option value='4'>4</option>
                    <option value='5'>5</option>
                </select>
                <span>{rating}</span>
                <br />
                <br />
            <label className="review">Review:</label>
            <textarea id='review' placeholder='Review' maxLength='225' onChange={ChangeReview}></textarea> 
            <span>{review}</span>
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