import "./Booklisting.css"
// booklisting will take props to display JSON data from Home 
function BookListing({title, author, image, genre}){

    return(
        <div className="singleBookWrapper">
        <h1>{title}</h1>
        <h2>{author}</h2>
        <img src={image} alt={title}/>
        <p>{genre}</p>
        </div>
    )
}
export default BookListing