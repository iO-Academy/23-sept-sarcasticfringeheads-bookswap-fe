import { useState } from "react"
import "./BookReturnForm.css"

function BookReturnForm ({id, bookClaim, name}) {
    const [email, setEmail] = useState ('')
    const [isError, setIsError] = useState(false)
    const [errorMessage, setErrorMessage] = useState([])

    function submitReturn(event){
        event.preventDefault()
    
        fetch(' https://23-sarcasticfringehead-book-api.dev.io-academy.uk/api/books/return/' + id, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json", "accept": "application/json"
            },
            body: JSON.stringify({
                email: email,
            }),
        }) 
        .then((response) => {
            if (response.ok) {
                setIsError(false)
                // Bookclaim is a setCapitalName passed down as a prop. 
                // i.e if claim is successful change the state of capitalName to the name that was submitted
                bookClaim(null)

            } 
            else {
                // Get the error message from JSON and put it in the form.
                response.json().then(function (response_json) {
                    setIsError(true)
                    setErrorMessage(response_json.message)
                });
            }
        })
    }
//Do we also need to input function where if successful change claimed=0??
//  To make the book change from claimed to available?

    return (
        <div className="return-book-form">
            <h2>Would you like to return this book?</h2>
            {isError && <span className='errormessage'>{errorMessage}</span>}
            <form onSubmit={submitReturn}>
                <label htmlFor="emailReturn">Please enter {name}'s email:</label>
                <input type="email" id='emailReturn' placeholder='Email@Email.com' value={email} onChange={(e) => setEmail(e.target.value)} />
                <input id='submitReturn' value='Return Book' type="submit" />
            </form>
        </div>
    )
}
export default BookReturnForm