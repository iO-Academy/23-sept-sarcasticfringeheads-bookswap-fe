import { useEffect, useState } from "react"
import "./BookReviewPage.css"
import { FaStar } from "react-icons/fa"
function BookReviewPage({name, review, rating}){
const [roundedReviews2, setRoundedReviews2] = useState([])
    
useEffect(() => {
    let roundedRating = Math.round(rating)
    console.log(roundedRating)
    setRoundedReviews2(Array.apply(null, Array(Math.round(roundedRating))))
    console.log(roundedReviews2)
}, [])

    return (
        <div className="reviewBox">
            <h3>{name}</h3>
            <h4>Score:&nbsp;{rating}/5 Stars 
            
            {roundedReviews2 && roundedReviews2.map(star => {
                <FaStar />
            })}
            <FaStar />
            </h4>
            <p>{review}</p>
        </div>
    )}

export default BookReviewPage