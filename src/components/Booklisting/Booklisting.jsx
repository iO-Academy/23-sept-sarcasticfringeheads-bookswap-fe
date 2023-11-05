import "./Booklisting.css"
import {Link } from 'react-router-dom'

// booklisting will take props to display JSON data from Home 
function BookListing({title, author, image, genre, id,}){
    let placeholder_image = '../../src/assets/images/classic_red_book_cover_by_semireal_stock_d1u2rbq-375w-2x.jpg' 
    return (
        // CSS may be based on this Link Tag being a div. Investigate if issues occur.
        <Link to={'/books/' + id} className="singleBookWrapper" >
            <h1>{title}</h1>
            <h2>{author}</h2>
            {image ? ( <img src={image} alt={title} /> ) : (<img src={placeholder_image} alt={title} />) }
            <p>{genre}</p>
        </Link>
    )
}
export default BookListing