import "./SingleBookDetail.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import ClaimBookForm from "../../ClaimBookForm/ClaimBookForm"
import BookReturnForm from "../../BookReturnForm/BookReturnForm"
import BookReviewPage from "../../BookReviewPage/BookReviewPage"
import BookReviews from "../../BookReviews/BookReviews"

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
            setReviewAverage(Math.round(review_average))
        })
    }, [reviews])
    
    return (
        <div>
            <div className="display_container">
                <div className="display_container image">
                    <img src={image} alt={title} />
                </div>
                <div className= "display_container content">
                    <h1>{title}</h1>
                    <h3>{reviewAverage}/5 Score &#9733;</h3>
                    <p><strong>Author:</strong> {author}</p>
                    <p><strong>Published:</strong> {year}</p>
                    <p><strong>Pages:</strong> {pageCount}</p>
                    <p><strong>Genre:</strong> {genre}</p>
                    <p><strong>Blurb:</strong></p>
                    <p className="blurb">{blurb}</p>
                    <div className="claimedBookForm">        
                        {!capitalName && <ClaimBookForm bookClaim={setCapitalName} id={id}/> }
                        {capitalName && <p><strong>Claimed by:&nbsp;</strong> {capitalName}</p>}
                        {capitalName && <BookReturnForm bookClaim={setCapitalName} id={id}/>}
                    </div>   
                </div>
            </div>
            <div className="book-review-container">
            <div>
                <BookReviews reviews={reviews} setReviews={setReviews} id={id}/>
            </div>
                <section>
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
            </div>
        </div>
    )
}

export default SingleBookDetail