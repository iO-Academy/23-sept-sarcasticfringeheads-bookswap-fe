import { useState } from "react"
import "./BookReturnForm.css"

function BookReturnForm ({id, bookclaim}) {
    const [email, setEmail] = useState ('')

    function submit(event){
        console.log('Email state variable: ', email, '     event.... value:', event.target.email.value)
        event.preventDefault()
        console.log('submitted returned book (attempt)!')

        fetch('https://book-swap-api.dev.io-academy.uk/api/books/return/' + id, {
            method: "PUT",
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: event.target.email.value,
            }),
        }) 
        .then((res) => {
            if (res.ok) {
                console.log('Return request submitted successfully.');
                bookclaim(null)
                // Successfully Claimed
            } else {
                console.error('Failed to submit Return request.');
                // Error in Claiming
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            // Some other error. issue apology.
            console.log('something else went wrong with Returning')
        });
        

    }
//Do we also need to input function where if successful change claimed=0??
//  To make the book change from claimed to available?

    return (
        <div className="return-book-form">
            <h2>Would you like to return this book?</h2>
            <form onSubmit={submit}>
                <label htmlFor="Email" value={email}>Email</label>
                <input type="email" id='email' onChange={setEmail}/>
                <input  id="submit" type="submit" />
            </form>
        </div>
    )
}
export default BookReturnForm