import { useState } from "react"
import "./ClaimBookForm.css"

function ClaimBookForm({id}) {
    
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')

    function claimAttempt(event) {
    
        let submitted_email = event.target.email.value
        let submitted_name = event.target.name.value
    
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
                console.log('success')

            } else {
                console.error('Failed to submit claim request with book.' + id);
                console.log('fail')
                // Error in Claiming -> **TODO** Red text at the top of the form saying error submitting. 
            }
        })
        .catch((error) => {
            console.error('Error:', error);
            // Some other error. **TODO** Red text at the top of form saying error submitting.
        });
    }

    return (
        <div> 
          <div className="claimFormContainer">
                <form className='claim-book' onSubmit={claimAttempt}>
                    <h3>Claim this book:</h3>
                    <label htmlFor="name" value={name} onChange={setName}>Name:</label>
                    <input type="text" id='name' placeholder="name"></input>
                    <br />
                    <label htmlFor="email"  value={email} onChange={setEmail}>Email:</label>
                    <input type="email" id='email' placeholder="email@email.com"></input>
                    <br />
                    <input className="claimSumbit" type='submit' value='Claim'></input>
                </form>
          </div>
        </div>
    )
}

export default ClaimBookForm