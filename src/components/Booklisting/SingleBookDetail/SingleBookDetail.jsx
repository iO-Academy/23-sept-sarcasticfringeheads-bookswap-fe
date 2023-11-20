import "./SingleBookDetail.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ClaimBookForm from "../../ClaimBookForm/ClaimBookForm"
import BookReturnForm from "../../BookReturnForm/BookReturnForm"
import BookReviewPage from "../../BookReviewPage/BookReviewPage"
import BookReviewForm from "../../BookReviewForm/BookReviewForm"

import { motion } from "framer-motion"
import { FaStar } from 'react-icons/fa'
import placeholder_image from '../../../assets/images/classic_red_book_cover_by_semireal_stock_d1u2rbq-375w-2x.jpg'

function SingleBookDetail () {
    const [title, setTitle] = useState('')
    const [blurb, setBlurb] = useState('')
    const [image, setImage] = useState (placeholder_image)
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
            setReviewAverage(Math.round((review_average * 10)) / 10)
            setRoundedReviews(Math.round(review_average))
            if (review_average > 0) {
                setRoundedReviews(Array.apply(null, Array(Math.round(review_average))))
            }
        })
    }, [])

    setTimeout(() => {
        window.scroll({
            top: 0,
            left: 0,
            behaviour: 'smooth',
        })
    }, 10)
        
    return (
        <motion.div id='single-book-detail-wrapper' initial={{y: '-100%'}} animate={{y: '0%', transition: {duration: 0.3}}} exit={{y: ('-100%'), transition: {duration: 0.6}}}>
            <div className="display_container">
                <div className="display_container image">
                    {image ? ( <img src={image} alt={title} /> ) : (<img src={placeholder_image} alt={title} />) }
                    
                </div>
                <div className= "display_container content">
                    <h1 id='detail-title'>{title}</h1>

                    <span id='book-info-wrapper'>
                        {!isNaN(reviewAverage) && (
                            <h3> <strong>Average Rating: {reviewAverage}<span id='mini-text'>/5</span></strong> 

                        <span id='x-stars'>
                            {roundedReviews.length > 0 && roundedReviews.map(num => <FaStar size={20} key={Math.floor(Math.random() * 1000)} />
                                )}
                        </span>

                        </h3> )}
                        {/* end of average rating: x/5 *** */}

                        <p><strong>Author:</strong> {author}</p>
                       {year && <p><strong>Published:</strong> {year}</p> }
                       {pageCount && <p><strong>Pages:</strong> {pageCount}</p> }
                        <p><strong>Genre:</strong> {genre}</p>
                        {blurb && blurb != '' && (<span>
                        
                        <p className="blurb"><strong>Blurb: </strong>{blurb}</p></span>)}
                    </span>
                    <div className="claimedBookForm">        
                    {!capitalName && <ClaimBookForm bookClaim={setCapitalName} id={id}/> }
                    {capitalName && <p><strong>Claimed by:&nbsp;</strong> {capitalName}</p>}
                    {capitalName && <BookReturnForm name={capitalName} bookClaim={setCapitalName} id={id}/>}
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