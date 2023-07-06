import React, { useState } from "react";
import { useHistory } from "react-router-dom";

function Bookings(){
    const history = useHistory()

    // declaring form variables
    const [username, setUsername] = useState("")
    const [check_in, setCheckin] = useState("")
    const [check_out, setCheckout] = useState("")

    function handleSubmit(e){
        e.preventDefault()

        // object that hold data
        const newBooking = {
            username:username,
            check_in:check_in,
            check_out:check_out,
        }
        fetch("/bookings", {
            method:"POST",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(newBooking)
        })
        .then(r => r.json())
        .then(data => console.log(data))
        setInputClear()

        history.push('/')
    }
    function setInputClear(){
        setUsername("")
        setCheckin("")
        setCheckout("")
    }

    return(
        <div>
            <form className="bookform" onSubmit={handleSubmit}>
                <h2 style={{textAlign:"center"}}>Bookings Page</h2>
                <p style={{textAlign:"center"}}> Fill out the form to book</p>

                <label for="name">Username</label>
                <input type="text" id="name" value={username} placeholder="name" onChange={e => setUsername(e.target.value)}/>

                <label for="check_in">Check-in</label>
                <input type="date" id="date" value={check_in} placeholder="Enter check-in date" onChange={e => setCheckin(e.target.value)}/>

                <label for="check_out">Check-Out</label>
                <input type="date" id="out" value={check_out} placeholder="Enter check-out date" onChange={e => setCheckout(e.target.value)}/>

                <button style={{backgroundColor:"green", cursor:"pointer",padding: "10px",border: "none"}} className="submit-message" type="submit">Submit</button>

            </form>
        </div>
    )

}
export default Bookings