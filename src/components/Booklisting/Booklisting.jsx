import "./Booklisting.css"
import { useNavigate } from 'react-router-dom'

// booklisting will take props to display JSON data from Home 
function BookListing({title, author, image, genre, id,}){
    const navigate = useNavigate();

    function bookClick() {
        navigate('/books/' + id)
    }

    return(
        <div className="singleBookWrapper" onClick={bookClick}>
            <h1>{title}</h1>
            <h2>{author}</h2>
            <img src={image} alt={title}/>
            <p>{genre}</p>
        </div>
    )
}
export default BookListing