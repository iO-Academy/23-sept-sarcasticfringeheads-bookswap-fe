import { useEffect, useState } from "react"
import "./Booklisting.css"
import {Link } from 'react-router-dom'

// booklisting will take props to display JSON data from Home 
function BookListing({title, author, image, genre, id,}){
    const [imageState, setImageState] = useState('../../src/assets/images/classic_red_book_cover_by_semireal_stock_d1u2rbq-375w-2x.jpg');
    useEffect(() => {
        if (image)
        {
            setImageState(image);
        }
    },[image])
    return (
        // CSS may be based on this Link Tag being a div. Investigate if issues occur.
        <Link to={'/books/' + id} className="singleBookWrapper" >
            <h1>{title}</h1>
            <h2>{author}</h2>
            <img src={imageState} alt={title} /> 
            <p>{genre}</p>
        </Link>
    )
}
export default BookListing