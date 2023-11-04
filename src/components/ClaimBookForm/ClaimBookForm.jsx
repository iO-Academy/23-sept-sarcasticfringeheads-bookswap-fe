import { useState } from "react"
import "./ClaimBookForm.css"

function ClaimBookForm({id, bookClaim}) {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [errorMessage, setErrorMessage] = useState('')
    const [isError, setIsError] = useState(false)
    
    function claimAttempt(event) {
        
        event.preventDefault();
    
        fetch('https://book-swap-api.dev.io-academy.uk/api/books/claim/' + id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json", 'accept': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                email: email,
            }),
        })
        .then((response) => {
            if (response.ok) {
                setIsError(false)
                // Bookclaim is a setCapitalName passed down as a prop. 
                // i.e if claim is successful change the state of capitalName to the name that was submitted
                bookClaim(name)

            } 
            else {
                // Get the error message from JSON and put it in the form.
                response.json().then(function (response_json) {
                    console.log(response_json.message)
                    setIsError(true)
                    setErrorMessage(response_json.message)
                });
            }
        })
    }

    return (
        <form className='claim-book' onSubmit={claimAttempt}>
            <div className="claim-book-details">
                <h3>Claim this book:</h3>
                {/* if isError has been set to true: display the errorMessage Variable */}
                {isError && <span className='errormessage'>{errorMessage}</span>}
                
                <span>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id='name' placeholder="name" value={name} onChange={(e) => setName(e.target.value)}></input>
                </span>
                <span>
                    <label htmlFor="emailClaim">Email: </label>
                    <input type="email" id='emailClaim' placeholder="email@email.com" value={email} onChange={(e) => setEmail(e.target.value)}></input>
                </span>
                <input className="claimSubmit" type='submit' value='Claim'></input>
            </div>
        </form>
    )
}

export default ClaimBookForm