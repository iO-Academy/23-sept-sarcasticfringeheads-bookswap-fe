import { useState } from "react"

function ClaimBookForm({id}) {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')


    function claimAttempt(event) {
        // submit claim request for relevant book
        console.log('submitted')
        event.preventDefault()
        console.log(event.target.name.value)
        let submitted_email = event.target.email.value
        let submitted_name = event.target.name.value
        console.log(submitted_email)
        console.log(submitted_name)

        fetch('https://book-swap-api.dev.io-academy.uk/api/books/claim/' + id, {
            method: 'PUT',
            mode: 'cors',
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: submitted_name,
                email: submitted_email,
            }),
        })
        .then((res) => {
            if (res.ok) {
                console.log('Claim request submitted successfully with book' + id);
                // Successfully Claimed -> remove form and display claim success message

            } else {
                console.error('Failed to submit claim request with book.' + id);
                // Error in Claiming -> Red text at the top of the form saying error. 
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            // Some other error. issue apology.
            console.log('something else went wrong with claiming')
        });
        

    }
    return (
        <div>
            <h3>Claim this book:</h3>
                <form className='claim-book' onSubmit={claimAttempt}>
                    <label htmlFor="name" value={name} onChange={setName}>Name:</label>
                    <input type="text" id='name'></input>
                    <label htmlFor="email" value={email} onChange={setEmail}>Email:</label>
                    <input type="email" id='email'></input>
                    <input type='submit' value='Claim'></input>

                </form>
        </div>
    )
}
export default ClaimBookForm