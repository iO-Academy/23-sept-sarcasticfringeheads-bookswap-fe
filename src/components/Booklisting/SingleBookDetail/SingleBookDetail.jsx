import "./SingleBookDetail.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ClaimBookForm from "../../ClaimBookForm/ClaimBookForm"
import BookReturnForm from "../../BookReturnForm/BookReturnForm"
import BookReviewPage from "../../BookReviewPage/BookReviewPage"
import BookReviewForm from "../../BookReviewForm/BookReviewForm"

import { motion } from "framer-motion"
import { FaStar } from 'react-icons/fa'
function SingleBookDetail () {
    const [title, setTitle] = useState('')
    const [blurb, setBlurb] = useState('')
    const [image, setImage] = useState ('')
    const [pageCount, setPageCount] = useState('')
    const [year, setYear] = useState ('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const [isClaimed, setIsClaimed] = useState(null) // currently redundant but important to not change in case capitilisation is done through css later 
    const {id} = useParams()
    const [capitalName, setCapitalName] = useState(null)
    

    const [reviews, setReviews] = useState([])
    const [reviewAverage, setReviewAverage] = useState(0)
    const [roundedReviews, setRoundedReviews] = useState([])
    //Store all reviews in a state reivews setReviews
    //separate component to 



    useEffect (function(){
        fetch('https://book-swap-api.dev.io-academy.uk/api/books/' +id)
        .then(function(res){
            return res.json()
        })
        .then(function(bookData){
            setTitle(bookData.data.title)
            setAuthor(bookData.data.author)
            setBlurb(bookData.data.blurb)
            setPageCount(bookData.data.page_count)
            setYear(bookData.data.year)
            setImage(bookData.data.image)
            setPageCount(bookData.data.page_count)
            setGenre(bookData.data.genre.name)
            let myReviews = bookData.data.reviews
            setReviews(myReviews)
            let claimed = (bookData.data.claimed_by_name) //if claimed_by_name returns a string (not null
            if (claimed) { 
                setCapitalName (claimed.charAt(0).toUpperCase() + claimed.slice(1)) // set capitalName to capitalised version of claimed
            }

            setIsClaimed(claimed) // currently redundant but important to not change in case capitilisation is done through css later 

            let total = 0;
            let review_count = 0;
            myReviews.forEach(function (review) {
                total += parseInt(review.rating)
                review_count ++
                
            })
            let review_average = total / review_count
            //get the rounded number of review average * 1000 (ie if 2.55910 -> 2559), then divide result by 1000 -> 2.559
            setReviewAverage(Math.round((review_average * 1000)) / 1000)
            setRoundedReviews(Math.round(review_average))
            if (reviewAverage > 0) {
                setRoundedReviews(Array.apply(null, Array(Math.round(review_average))))
            }


        })
        
    }, [])

    useEffect(() => {
        window.scroll({
            top: 0,
            left: 0,
            behaviour: 'smooth',
        })
    }, [])

    
    
        

    

    return (
        <motion.div initial={{y: '-100%'}} animate={{y: '0%', transition: {duration: 0.3}}} exit={{y: ('-100%'), transition: {duration: 0.6}}}>
            <div className="display_container">
                <div className="display_container image">
                    <img src={image} alt={title} />
                </div>
                <div className= "display_container content">
                    <h1>{title}</h1>
                    {!isNaN(reviewAverage) && (
                        <h3> {reviewAverage}/5 Score 

                    <span id='x-stars'>
                    {roundedReviews && roundedReviews.map(num => <FaStar size={20} key={Math.floor(Math.random() * 1000)} />
                        )}
                    </span>

                    </h3> )}
                    <p><strong>Author:</strong> {author}</p>
                    <p><strong>Published:</strong> {year}</p>
                    <p><strong>Pages:</strong> {pageCount}</p>
                    <p><strong>Genre:</strong> {genre}</p>
                    {blurb && blurb != '' && (<span>
                    <p><strong>Blurb:</strong></p>
                    <p className="blurb">{blurb}</p></span>)}
                    <div className="claimedBookForm">        
                    {!capitalName && <ClaimBookForm bookClaim={setCapitalName} id={id}/> }
                    {capitalName && <p><strong>Claimed by:&nbsp;</strong> {capitalName}</p>}
                    {capitalName && <BookReturnForm bookClaim={setCapitalName} id={id}/>}
                    </div>   
                </div>

            </div>
            <div className="book-review-container">
            <div>
                <BookReviewForm reviews={reviews} setReviews={setReviews} id={id}/>
            </div>
                <section id='review-column'>
                    {reviews && reviews.length > 0 ?
                    ( <section id='review-column'>
                    <h1 className="review-title">Reviews</h1>
                        {reviews.map(review =>
                            <BookReviewPage
                                key={review.id}
                                id={review.id}
                                name={review.name}
                                rating={review.rating}
                                review={review.review}
                            />
                        )}
                        </section>
                    ) : (
                        <h1 className="review-title">No Reviews To Show Yet!</h1>
                    )}
                    
                </section>
            </div>
        </motion.div>
    )
}

export default SingleBookDetail