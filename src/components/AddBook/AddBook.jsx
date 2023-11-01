import "./AddBook.css"

function AddBook(){

    fetch ("https://book-swap-api.dev.io-academy.uk/api/books", {
        method: 'POST',
        mode: 'cors',
        headers: {'content-type':'application.json'
    },
        body: JSON.stringify({
            'title':"",
            'author':"",
            'genre_id': integer,
            'blurb':"",
            'image': "url",
            'year':""
        })
         
        .then (function(res) {
            return(res.json)
        })
        .then (function(whatever){
            return()
        })

)}

export default AddBook