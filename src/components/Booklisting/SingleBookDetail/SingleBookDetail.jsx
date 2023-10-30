import "./SingleBookDetail.css"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"


function SingleBookDetail () {
    const [title, setTitle] = useState('')
    const [blurb, setBlurb] = useState('')
    const [image, setImage] = useState ('')
    const [pageCount, setPageCount] = useState('')
    const [year, setYear] = useState ('')
    const [author, setAuthor] = useState('')
    const [genre, setGenre] = useState('')
    const {id} = useParams()

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
        })
    }, [])
    
    return (
        <div className ="display_container">
            <div className="display_container image">
              <img src={image} alt={title} />
            </div>
            <div className="display_container content">
              <h1>{title}</h1>
              <h2>{author}</h2>
              <p>{year}</p>
              <p>{pageCount}</p>
              <p>{genre}</p>
              <p>{blurb}</p>
            </div>
        </div>
    )
}
export default SingleBookDetail