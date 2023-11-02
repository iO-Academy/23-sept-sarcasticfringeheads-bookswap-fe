import "./Booklisting.css"
import {Link } from 'react-router-dom'

// booklisting will take props to display JSON data from Home 
function BookListing({title, author, image, genre, id,}){
    
    return (
        // CSS may be based on this Link Tag being a div. Investigate if issues occur.
        <Link to={'/books/' + id} className="singleBookWrapper" >
            <h1>{title}</h1>
            <h2>{author}</h2>
            <img src={image} alt={title}/>
            <p>{genre}</p>
        </Link>
    )
}
export default BookListing