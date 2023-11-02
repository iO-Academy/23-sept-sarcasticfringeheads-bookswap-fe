import SingleBookDetail from "../Booklisting/SingleBookDetail/SingleBookDetail"
import "./BookReviewPage.css"

function BookReviewPage({name, review, rating}){
    <SingleBookDetail/>
    
    return(
        <div className="reviewBox">
            <h3>{name}</h3>
            <h4>Score:&nbsp;{rating}/5 Stars&#9733;</h4>
            <p>{review}</p>
        </div>
    )}

export default BookReviewPage