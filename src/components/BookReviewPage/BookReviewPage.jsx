import { useEffect, useState } from "react"
import "./BookReviewPage.css"
import { FaStar } from "react-icons/fa"
function BookReviewPage({name, review, rating}){
const [whyAmINeeded, setWhyAmINeeded] = useState([])

    
useEffect(() => {
    setWhyAmINeeded(Array.apply(null, Array(Math.round(rating))))
}, [])

    return (
        <div className="reviewBox">
            <h3>{name}</h3>
            <h4>Rating:
            <span id='review-stars'>
            {whyAmINeeded.length > 0 && whyAmINeeded.map(item => (<FaStar key={Math.floor(Math.random() * 10000)} />))}
            </span>
            </h4>
            <p>{review}</p>
        </div>
    )}

export default BookReviewPage