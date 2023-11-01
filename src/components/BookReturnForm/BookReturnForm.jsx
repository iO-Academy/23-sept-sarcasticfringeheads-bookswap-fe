import { useState } from "react"

function BookReturnForm ({id}) {
    const [email, setEmail] = useState ('')

    //function to take what is typed in and save into the state
    function returnBook (event) {
        setEmail(event.target.value)
    }

    function submit(event){
        event.preventDefault()
        console.log('submitted returned book!')

        fetch('https://book-swap-api.dev.io-academy.uk/api/books/return' + id, {
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            method: "PUT" ,
            body: JSON.stringify({
                email: email,
            }),
        }) 
        .then(function (res) {  
        })
        .then(function (data) {
           if(res.status === 200){
                console.log('Book successfully found')
                return res.json()
            } else {
                console.log('Book with Id ' + id + 'not found')
            } 
        })
    }
//Do we also need to input function where if successful change claimed=0??
//  To make the book change from claimed to available?

    return (
        <div>
            <h2>Would you like to return this book?</h2>
            <form onSubmit={submit}>
                <label htmlFor="Email" value={email}>Email</label>
                <input type="email" onChange={returnBook}/>
                <input type="submit" />
            </form>
        </div>
    )
}
export default BookReturnForm